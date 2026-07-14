from django.urls import path

from .views import *

urlpatterns = [
    path(
        "register/",
        RegisterAPIView.as_view(),
        name="register",
    ),
    path(
    "verify-email/<int:uid>/<str:token>/",
    VerifyEmailAPIView.as_view(),
    name="verify-email",
),
]