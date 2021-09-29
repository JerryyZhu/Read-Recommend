from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from ..wrappers import handle_errors
from datetime import date, timedelta, datetime
from api.models import User
from django.core.mail import send_mail

import jwt

secret_key = "supa secret key"
datetime_format = "%Y-%m-%d %H:%M:%S"


class ResetViews:
    @api_view(['POST'])
    @authentication_classes([])
    @permission_classes([])
    @handle_errors
    def get_token(request):
        email = request.data['email']
        token_string = jwt.encode({
            'username': email,
            'expiry': (datetime.now() + timedelta(minutes=5)).strftime(datetime_format),
        }, secret_key, algorithm='HS256').decode('utf-8')


        link = f"http://localhost:3000/recover/{token_string}"

        send_mail(
            "Reset password link",
            link,
            "readrecommend3900@gmail.com",
            [email],
        )

        return Response()

    @api_view(['POST'])
    @authentication_classes([])
    @permission_classes([])
    @handle_errors
    def reset(request):
        token = request.data['token']
        password = request.data['password']
        data = jwt.decode(token, secret_key)

        date = datetime.strptime(data['expiry'], datetime_format)

        if datetime.now() > date:
            raise Exception

        user = User.objects.get(username=data['username'])
        user.set_password(password)
        user.save()
        return Response()


    


    