"""Datos compartidos por las plantillas del panel."""

from django.conf import settings


def portal_origin(request):
    """
    Origen de la portada familiar.

    Usa el primer origen de CORS: es la dirección desde la que el
    navegador ya puede llamar a la API del colegio.
    """
    if settings.CORS_ALLOWED_ORIGINS:
        origen = settings.CORS_ALLOWED_ORIGINS[0]
    else:
        origen = "http://localhost:5173"
    return {"portal_origin": origen}
