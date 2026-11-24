#!/usr/bin/env bash
# Compilación en Render: dependencias, estáticos, tablas y datos de ejemplo.
# seed_demo se puede repetir: usa get_or_create y no duplica el colegio.
set -o errexit
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate --noinput
python manage.py seed_demo
