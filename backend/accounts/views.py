from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer
from .tokens import email_verification_token

class RegisterAPIView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                {
                    "message": "Registration successful. Please verify your email."
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )
        
        
        
User = get_user_model()


class VerifyEmailAPIView(APIView):

    permission_classes = []

    def get(self, request, uid, token):

        try:
            user = User.objects.get(pk=uid)

        except User.DoesNotExist:

            return Response(
                {
                    "message": "Invalid verification link."
                },
                status=400,
            )

        if email_verification_token.check_token(user, token):

            user.is_verified = True

            user.save()

            return Response(
                {
                    "message": "Email verified successfully."
                }
            )

        return Response(
            {
                "message": "Verification link expired."
            },
            status=400,
        )