from rest_framework import serializers as sz
from rest_framework_jwt.settings import api_settings

from .models import User


class UserSerializer(sz.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email')


class UserSerializerWithToken(sz.ModelSerializer):
    password = sz.CharField(write_only=True)
    token = sz.SerializerMethodField()

    def get_token(self, obj):

        # change this if extension to return data needed
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        # get the token
        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    # requires the following
    # email - serves as username
    # first/last name
    # password - plain text
    def create(self, payload):
        user = User.objects.create(
            email=payload['email'],
            username=payload['email'],
            first_name=payload['first_name'],
            last_name=payload['last_name']
        )

        user.set_password(payload['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ('token', 'id', 'email', 'first_name',
                  'last_name', 'password')
