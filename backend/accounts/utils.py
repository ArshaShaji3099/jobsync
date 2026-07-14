from django.conf import settings
from django.core.mail import send_mail

from .tokens import email_verification_token


def send_verification_email(user):
    try:
        token = email_verification_token.make_token(user)

        verification_url = (
    f"{settings.FRONTEND_URL}/verify-email/{user.pk}/{token}"
)

        subject = "Verify your JobSync account"

        message = f"""
Hi {user.first_name},

Thank you for registering with JobSync.

Click the link below to verify your email.

{verification_url}

If you didn't create this account, simply ignore this email.

JobSync Team
"""

        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )

        print("✅ Email sent successfully.")

    except Exception as e:
        print("❌ Email Error:", e)
        raise