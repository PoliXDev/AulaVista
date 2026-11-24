# AulaVista

Sistema de gestión escolar para el centro y las familias.

El personal administra aulas, matrícula, calificaciones, asistencia, comunicados y mensualidades. Cada familia consulta únicamente el expediente de sus hijos: notas, asistencia, comunicados del centro y de su aula, y el estado de las mensualidades.



## Cómo está organizado

Hay dos accesos y no comparten sesión.

- El personal trabaja en el panel del centro. Solo entra quien tiene rol de personal.
- Las familias usan el portal: primero la portada, después el acceso y, con sesión, el expediente. Cada consulta queda limitada a los hijos de quien ha iniciado sesión.
- La nota del centro va de 1 a 20. Un alumno tiene un solo parte de asistencia por fecha.

## Tecnologías

- Django, para el panel del personal
- Django REST Framework, para los datos del portal
- React, Vite y Tailwind CSS, para el portal familiar

## Despliegue

El portal de las familias está en [aulavista.app](https://aulavista.app). `www.aulavista.app` redirige ahí. Lo sirve Vercel, con la variable `VITE_API_URL=https://panel.aulavista.app`.

El panel del personal y la API son el mismo Django, en [panel.aulavista.app](https://panel.aulavista.app). El acceso del personal es [panel.aulavista.app/acceso/](https://panel.aulavista.app/acceso/). Lo sirve Render. El servicio también responde en `aulavista-api.onrender.com`.


| Usuario | Contraseña | Qué abre |
| --- | --- | --- |
| personal | aula_staff | Panel del personal |
| familia | aula-familia | Portal, familia Rivas |
| familia2 | aula-familia2 | Portal, familia Herrera |
| familia3 | aula-familia3 | Portal, familia Torres |
| familia4 | aula-familia4 | Portal, familia Gómez |

Desarrollado por Daniel Ruiz / noahknox

Proyecto Final de Curso Full Stack en Conqueblocks