"""
Pruebas del colegio.

Fijan la escala de notas, la asistencia de un día, quién entra
al panel y qué expediente ve cada familia en el portal.
"""

from datetime import date
from decimal import Decimal

from django.core.exceptions import ValidationError
from django.db import IntegrityError, transaction
from django.test import TestCase, override_settings
from rest_framework.test import APIClient

from academic.forms import AttendanceForm, GradeForm
from academic.models import (
    Announcement,
    Attendance,
    Classroom,
    Grade,
    Student,
    TuitionFee,
    User,
)


@override_settings(ALLOWED_HOSTS=["testserver"])
class ColegioTestCase(TestCase):
    """El cliente de pruebas llama al sitio como testserver."""


def crear_usuario(username, role, password="clave-local"):
    return User.objects.create_user(username=username, password=password, role=role)


def crear_aula(name, section):
    return Classroom.objects.create(name=name, section=section, school_year="2026-2027")


def crear_alumno(first_name, enrollment_code, classroom, parent):
    return Student.objects.create(
        first_name=first_name,
        last_name="Prueba",
        enrollment_code=enrollment_code,
        classroom=classroom,
        parent=parent,
    )


class NotaYAsistenciaTests(ColegioTestCase):
    """La nota queda entre 1 y 20. Un alumno tiene un parte por fecha."""

    def setUp(self):
        parent = crear_usuario("familia-nota", User.Role.PARENT)
        classroom = crear_aula("3er Grado", "A")
        self.student = crear_alumno("Ana", "MAT-NOTA-001", classroom, parent)

    def _nota(self, score):
        return Grade(
            student=self.student,
            subject=Grade.Subject.MATH,
            evaluation_name="Parcial",
            score=Decimal(score),
            date=date(2026, 10, 8),
        )

    def test_la_nota_fuera_de_rango_no_pasa_el_modelo(self):
        for score in ("0", "21"):
            with self.assertRaises(ValidationError):
                self._nota(score).full_clean()

    def test_la_nota_fuera_de_rango_no_pasa_el_formulario(self):
        for score in ("0", "21"):
            form = GradeForm(
                data={
                    "student": self.student.pk,
                    "subject": "MATH",
                    "evaluation_name": "Parcial",
                    "score": score,
                    "date": "2026-10-08",
                    "comment": "",
                }
            )
            self.assertFalse(form.is_valid())
            self.assertIn("score", form.errors)

    def test_una_nota_valida_pasa_el_formulario(self):
        form = GradeForm(
            data={
                "student": self.student.pk,
                "subject": "MATH",
                "evaluation_name": "Parcial",
                "score": "18.5",
                "date": "2026-10-08",
                "comment": "",
            }
        )
        self.assertTrue(form.is_valid())

    def test_la_asistencia_repetida_falla_en_el_formulario_y_en_la_base(self):
        Attendance.objects.create(
            student=self.student,
            date=date(2026, 10, 6),
            status=Attendance.Status.PRESENT,
        )
        form = AttendanceForm(
            data={
                "student": self.student.pk,
                "date": "2026-10-06",
                "status": "ABSENT",
                "notes": "",
            }
        )
        self.assertFalse(form.is_valid())
        self.assertIn(
            "Este alumno ya tiene asistencia en esa fecha.",
            form.errors["date"],
        )
        with self.assertRaises(IntegrityError):
            with transaction.atomic():
                Attendance.objects.create(
                    student=self.student,
                    date=date(2026, 10, 6),
                    status=Attendance.Status.ABSENT,
                )


class PanelPersonalTests(ColegioTestCase):
    """El panel solo lo usa el personal. El pago cambia por POST."""

    def setUp(self):
        self.staff = crear_usuario("personal-test", User.Role.STAFF, "aula-personal")
        self.parent = crear_usuario("familia-test", User.Role.PARENT, "aula-familia")
        classroom = crear_aula("4to Grado", "A")
        student = crear_alumno("Luis", "MAT-PANEL-001", classroom, self.parent)
        self.fee = TuitionFee.objects.create(
            student=student,
            concept="Mensualidad octubre",
            amount_usd=Decimal("85.00"),
            due_date=date(2026, 10, 5),
            status=TuitionFee.Status.PENDING,
        )
        self.toggle = f"/mensualidades/{self.fee.pk}/estado/"

    def test_un_anonimo_va_al_acceso(self):
        response = self.client.get("/aulas/")
        self.assertRedirects(response, "/acceso/?next=/aulas/")

    def test_un_representante_recibe_403(self):
        self.client.login(username="familia-test", password="aula-familia")
        response = self.client.get("/aulas/")
        self.assertEqual(response.status_code, 403)
        self.assertContains(
            response,
            "Acceso restringido exclusivamente al personal del centro",
            status_code=403,
        )

    def test_el_estado_de_la_mensualidad_solo_cambia_por_post(self):
        self.client.login(username="personal-test", password="aula-personal")
        rejected = self.client.get(self.toggle)
        self.assertEqual(rejected.status_code, 405)
        self.fee.refresh_from_db()
        self.assertEqual(self.fee.status, TuitionFee.Status.PENDING)

        updated = self.client.post(self.toggle)
        self.assertRedirects(updated, "/mensualidades/")
        self.fee.refresh_from_db()
        self.assertEqual(self.fee.status, TuitionFee.Status.PAID)


class PortalFamiliarTests(ColegioTestCase):
    """Cada familia ve a sus hijos y los avisos de sus aulas."""

    def setUp(self):
        self.parent_a = crear_usuario("familia-a", User.Role.PARENT, "clave-a")
        self.parent_b = crear_usuario("familia-b", User.Role.PARENT, "clave-b")
        self.staff = crear_usuario("personal-api", User.Role.STAFF, "clave-personal")
        aula_a = crear_aula("3er Grado", "A")
        aula_b = crear_aula("5to Grado", "B")
        crear_alumno("Ana", "MAT-A", aula_a, self.parent_a)
        crear_alumno("Mateo", "MAT-B", aula_b, self.parent_b)
        Announcement.objects.create(title="Aviso general", message="Para todas las familias.")
        Announcement.objects.create(title="Aviso del aula A", message="Solo A.", classroom=aula_a)
        Announcement.objects.create(title="Aviso del aula B", message="Solo B.", classroom=aula_b)
        self.api = APIClient()

    def _token(self, username, password):
        response = self.api.post(
            "/api/login/",
            {"username": username, "password": password},
            format="json",
        )
        self.assertEqual(response.status_code, 200)
        return response.data["token"]

    def _expediente(self, token):
        self.api.credentials(HTTP_AUTHORIZATION=f"Token {token}")
        return self.api.get("/api/parent/dashboard/")

    def test_sin_token_responde_401(self):
        response = self.api.get("/api/parent/dashboard/")
        self.assertEqual(response.status_code, 401)

    def test_el_personal_recibe_403(self):
        token = self._token("personal-api", "clave-personal")
        response = self._expediente(token)
        self.assertEqual(response.status_code, 403)

    def test_cada_familia_ve_solo_a_sus_hijos(self):
        expediente_a = self._expediente(self._token("familia-a", "clave-a"))
        self.assertEqual(expediente_a.status_code, 200)
        codigos_a = {hijo["enrollment_code"] for hijo in expediente_a.data["children"]}
        self.assertEqual(codigos_a, {"MAT-A"})
        titulos_a = {aviso["title"] for aviso in expediente_a.data["children"][0]["announcements"]}
        self.assertEqual(titulos_a, {"Aviso general", "Aviso del aula A"})

        expediente_b = self._expediente(self._token("familia-b", "clave-b"))
        self.assertEqual(expediente_b.status_code, 200)
        codigos_b = {hijo["enrollment_code"] for hijo in expediente_b.data["children"]}
        self.assertEqual(codigos_b, {"MAT-B"})
        titulos_b = {aviso["title"] for aviso in expediente_b.data["children"][0]["announcements"]}
        self.assertEqual(titulos_b, {"Aviso general", "Aviso del aula B"})
