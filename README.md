# AulaVista

Sistema de gestión escolar para el centro y las familias.

El personal administra aulas, matrícula, calificaciones, asistencia, comunicados y mensualidades. Cada familia consulta únicamente el expediente de sus hijos: notas, asistencia, comunicados del centro y de su aula, y el estado de las mensualidades.



## Cómo está organizado

Hay dos accesos y no comparten sesión.

- El personal trabaja en el panel del centro. Solo entra quien tiene rol de personal.
- Las familias usan el portal. Cada consulta queda limitada a los hijos de quien ha iniciado sesión.
- La nota del centro va de 1 a 20. Un alumno tiene un solo parte de asistencia por fecha.

## Tecnologías

- Django, para el panel del personal
- Django REST Framework, para los datos del portal
- React, Vite y Tailwind CSS, para el portal familiar

Desarrollado por Daniel Ruiz / noahknox

Proyecto M