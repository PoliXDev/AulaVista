"""
Carga inicial de un colegio de ejemplo.

Se puede ejecutar varias veces: get_or_create reutiliza usuarios, aulas
y alumnos ya creados y no duplica notas ni asistencias.
"""

from datetime import date
from decimal import Decimal

from django.core.management.base import BaseCommand

from academic.models import (
    Announcement,
    Attendance,
    Classroom,
    Grade,
    Student,
    TuitionFee,
    User,
)


class Command(BaseCommand):
    help = "Crea el personal, las familias de ejemplo y los datos del colegio."

    def handle(self, *args, **options):
        staff = self._usuario(
            username="personal",
            password="aula_staff",
            first_name="Laura",
            last_name="Méndez",
            role=User.Role.STAFF,
            is_staff=True,
            phone="0414-5550101",
        )
        parent = self._usuario(
            username="familia",
            password="aula-familia",
            first_name="Carlos",
            last_name="Rivas",
            role=User.Role.PARENT,
            is_staff=False,
            phone="0412-5550199",
        )
        parent_herrera = self._usuario(
            username="familia2",
            password="aula-familia2",
            first_name="Lucía",
            last_name="Herrera",
            role=User.Role.PARENT,
            is_staff=False,
            phone="0412-5550188",
        )
        parent_torres = self._usuario(
            username="familia3",
            password="aula-familia3",
            first_name="Miguel",
            last_name="Torres",
            role=User.Role.PARENT,
            is_staff=False,
            phone="0412-5550177",
        )
        parent_gomez = self._usuario(
            username="familia4",
            password="aula-familia4",
            first_name="Patricia",
            last_name="Gómez",
            role=User.Role.PARENT,
            is_staff=False,
            phone="0414-5550166",
        )

        primero = self._aula("1er Grado", "A")
        segundo = self._aula("2do Grado", "A")
        tercero = self._aula("3er Grado", "A")
        cuarto = self._aula("4to Grado", "A")
        quinto = self._aula("5to Grado", "B")
        sexto = self._aula("6to Grado", "A")
        ana = self._alumno("Ana", "Rivas", "MAT-2026-014", tercero, parent)
        mateo = self._alumno("Mateo", "Rivas", "MAT-2026-031", quinto, parent)
        elena = self._alumno("Elena", "Vargas", "MAT-2026-042", primero, parent_herrera)
        diego = self._alumno("Diego", "Navarro", "MAT-2026-055", primero, parent_herrera)
        sofia = self._alumno("Sofía", "Herrera", "MAT-2026-063", tercero, parent_herrera)
        hugo = self._alumno("Hugo", "Molina", "MAT-2026-071", quinto, parent)
        valeria = self._alumno("Valeria", "Castro", "MAT-2026-088", tercero, parent)
        camila = self._alumno("Camila", "Torres", "MAT-2026-102", segundo, parent_torres)
        tomas = self._alumno("Tomás", "Torres", "MAT-2026-118", cuarto, parent_torres)
        martin = self._alumno("Martín", "Gómez", "MAT-2026-131", cuarto, parent_gomez)
        isabel = self._alumno("Isabel", "Gómez", "MAT-2026-146", sexto, parent_gomez)

        alumnos = [ana, mateo, elena, diego, sofia, hugo, valeria, camila, tomas, martin, isabel]
        # Una nota por asignatura. La misma evaluación y la misma fecha
        # para que el parcial se lea como una semana del colegio.
        parciales = [
            (ana, Grade.Subject.MATH, "18.5", date(2026, 10, 8)),
            (ana, Grade.Subject.SCIENCE, "17.5", date(2026, 10, 9)),
            (ana, Grade.Subject.LANGUAGE, "16.0", date(2026, 10, 10)),
            (ana, Grade.Subject.HISTORY, "17.0", date(2026, 10, 11)),
            (ana, Grade.Subject.ENGLISH, "15.5", date(2026, 10, 14)),
            (mateo, Grade.Subject.MATH, "15.0", date(2026, 10, 8)),
            (mateo, Grade.Subject.SCIENCE, "14.5", date(2026, 10, 9)),
            (mateo, Grade.Subject.LANGUAGE, "13.5", date(2026, 10, 10)),
            (mateo, Grade.Subject.HISTORY, "14.0", date(2026, 10, 11)),
            (mateo, Grade.Subject.ENGLISH, "19.0", date(2026, 10, 14)),
            (elena, Grade.Subject.MATH, "17.0", date(2026, 10, 8)),
            (elena, Grade.Subject.SCIENCE, "16.0", date(2026, 10, 9)),
            (elena, Grade.Subject.LANGUAGE, "16.5", date(2026, 10, 10)),
            (elena, Grade.Subject.HISTORY, "16.5", date(2026, 10, 11)),
            (elena, Grade.Subject.ENGLISH, "15.0", date(2026, 10, 14)),
            (diego, Grade.Subject.MATH, "14.0", date(2026, 10, 8)),
            (diego, Grade.Subject.SCIENCE, "13.5", date(2026, 10, 9)),
            (diego, Grade.Subject.LANGUAGE, "15.5", date(2026, 10, 10)),
            (diego, Grade.Subject.HISTORY, "15.0", date(2026, 10, 11)),
            (diego, Grade.Subject.ENGLISH, "14.5", date(2026, 10, 14)),
            (sofia, Grade.Subject.MATH, "17.5", date(2026, 10, 8)),
            (sofia, Grade.Subject.SCIENCE, "18.0", date(2026, 10, 9)),
            (sofia, Grade.Subject.LANGUAGE, "18.0", date(2026, 10, 10)),
            (sofia, Grade.Subject.HISTORY, "17.5", date(2026, 10, 11)),
            (sofia, Grade.Subject.ENGLISH, "16.0", date(2026, 10, 14)),
            (hugo, Grade.Subject.MATH, "14.0", date(2026, 10, 8)),
            (hugo, Grade.Subject.SCIENCE, "15.0", date(2026, 10, 9)),
            (hugo, Grade.Subject.LANGUAGE, "13.5", date(2026, 10, 10)),
            (hugo, Grade.Subject.HISTORY, "13.0", date(2026, 10, 11)),
            (hugo, Grade.Subject.ENGLISH, "13.0", date(2026, 10, 14)),
            (valeria, Grade.Subject.MATH, "16.0", date(2026, 10, 8)),
            (valeria, Grade.Subject.SCIENCE, "16.5", date(2026, 10, 9)),
            (valeria, Grade.Subject.LANGUAGE, "15.5", date(2026, 10, 10)),
            (valeria, Grade.Subject.HISTORY, "15.0", date(2026, 10, 11)),
            (valeria, Grade.Subject.ENGLISH, "16.5", date(2026, 10, 14)),
        ]
        Grade.objects.filter(student__in=alumnos).exclude(evaluation_name="Parcial 1").delete()
        for student, subject, score, day in parciales:
            self._nota(student, subject, "Parcial 1", Decimal(score), day)
        self._parcial(camila, ("16.5", "15.5", "17.0", "16.0", "15.0"))
        self._parcial(tomas, ("13.5", "14.0", "13.0", "14.5", "15.5"))
        self._parcial(martin, ("17.0", "16.5", "15.5", "16.0", "18.0"))
        self._parcial(isabel, ("18.0", "17.5", "16.5", "18.5", "17.0"))

        # El listado de ejemplo solo guarda faltas. get_or_create no
        # quita los partes de presente de una carga anterior.
        Attendance.objects.filter(student__in=alumnos).exclude(
            status=Attendance.Status.ABSENT
        ).delete()
        self._asistencia(mateo, date(2026, 10, 7), Attendance.Status.ABSENT, "Justificada por el padre")
        self._asistencia(hugo, date(2026, 10, 6), Attendance.Status.ABSENT, "")
        self._asistencia(diego, date(2026, 10, 13), Attendance.Status.ABSENT, "Cita médica")
        self._asistencia(valeria, date(2026, 10, 15), Attendance.Status.ABSENT, "Viaje familiar")
        self._asistencia(tomas, date(2026, 10, 9), Attendance.Status.ABSENT, "Fiebre")
        self._asistencia(isabel, date(2026, 10, 20), Attendance.Status.ABSENT, "Justificada por la madre")

        self._comunicado(
            "Reunión general de familias",
            "El viernes 30 de octubre, a las 8:00, en el salón principal.",
            None,
        )
        self._comunicado(
            "Salida al museo",
            "3er Grado A visita el museo el martes. Traer autorización firmada.",
            tercero,
        )
        self._comunicado(
            "Examen de ciencias",
            "5to Grado B presenta el examen de ciencias el jueves.",
            quinto,
        )
        self._comunicado(
            "Entrega de útiles",
            "1er Grado A trae el material de lectura el lunes.",
            primero,
        )
        self._comunicado(
            "Simulacro de salida",
            "El miércoles 12 de noviembre, a las 10:00, sale todo el colegio.",
            None,
        )

        deben_octubre = {ana, hugo, valeria, tomas}
        deben_noviembre = {ana, hugo, valeria, tomas}
        for student in alumnos:
            octubre = (
                TuitionFee.Status.PENDING
                if student in deben_octubre
                else TuitionFee.Status.PAID
            )
            noviembre = (
                TuitionFee.Status.PENDING
                if student in deben_noviembre
                else TuitionFee.Status.PAID
            )
            self._mensualidad(student, "Mensualidad septiembre", Decimal("85.00"), date(2026, 9, 5), TuitionFee.Status.PAID)
            self._mensualidad(student, "Mensualidad octubre", Decimal("85.00"), date(2026, 10, 5), octubre)
            self._mensualidad(student, "Mensualidad noviembre", Decimal("85.00"), date(2026, 11, 5), noviembre)
            self._mensualidad(student, "Mensualidad diciembre", Decimal("85.00"), date(2026, 12, 5), TuitionFee.Status.PENDING)

        self.stdout.write(self.style.SUCCESS("Datos de ejemplo listos."))
        self.stdout.write("Personal: personal / aula_staff")
        self.stdout.write("Familia Rivas: familia / aula-familia")
        self.stdout.write("Familia Herrera: familia2 / aula-familia2")
        self.stdout.write("Familia Torres: familia3 / aula-familia3")
        self.stdout.write("Familia Gómez: familia4 / aula-familia4")
        self.stdout.write(
            f"Aulas: {Classroom.objects.count()} | "
            f"Alumnos: {Student.objects.count()} | "
            f"Recibos pendientes: "
            f"{TuitionFee.objects.filter(status=TuitionFee.Status.PENDING).count()}"
        )
        self.stdout.write(f"Personal de referencia: {staff.get_full_name()}")

    def _usuario(self, username, password, **defaults):
        user, created = User.objects.get_or_create(username=username, defaults=defaults)
        if created:
            user.set_password(password)
            user.save(update_fields=["password"])
        return user

    def _aula(self, name, section):
        classroom, _created = Classroom.objects.get_or_create(
            name=name,
            section=section,
            school_year="2026-2027",
        )
        return classroom

    def _alumno(self, first_name, last_name, enrollment_code, classroom, parent):
        student, created = Student.objects.get_or_create(
            enrollment_code=enrollment_code,
            defaults={
                "first_name": first_name,
                "last_name": last_name,
                "classroom": classroom,
                "parent": parent,
            },
        )
        # Si el alumno ya existía con otro representante, se corrige.
        # get_or_create no toca el padre en las ejecuciones siguientes.
        if not created and student.parent_id != parent.id:
            student.parent = parent
            student.save(update_fields=["parent"])
        return student

    def _nota(self, student, subject, evaluation_name, score, day):
        Grade.objects.get_or_create(
            student=student,
            subject=subject,
            evaluation_name=evaluation_name,
            defaults={"score": score, "date": day},
        )

    def _asistencia(self, student, day, status, notes):
        Attendance.objects.get_or_create(
            student=student,
            date=day,
            defaults={"status": status, "notes": notes},
        )

    def _comunicado(self, title, message, classroom):
        Announcement.objects.get_or_create(
            title=title,
            defaults={"message": message, "classroom": classroom},
        )

    def _mensualidad(self, student, concept, amount, due_date, status):
        TuitionFee.objects.get_or_create(
            student=student,
            concept=concept,
            defaults={"amount_usd": amount, "due_date": due_date, "status": status},
        )
