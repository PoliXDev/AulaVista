#!/usr/bin/env bash
# Compilación en Render: dependencias, estáticos y tablas.
set -o errexit
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate --noinput
