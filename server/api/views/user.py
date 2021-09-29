from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status
from ..serializers import *
from ..models import User, Collection
from ..common import IsSuperUser, success, error
from django.views.decorators.csrf import csrf_exempt
from rest_framework_jwt.views import obtain_jwt_token

NO_BOOK_ERROR = 'Book not found.'
NO_USER_ERROR = 'User not found.'
NO_REVIEW_ERROR = 'Review not found.'
NO_COLLECTION_ERROR = 'Collection not found.'

class UserViews:

    # ADMIN VIEWS ONLY FOR SUPERUSER

    @api_view(['GET'])
    @permission_classes([IsSuperUser])
    def get_all(request):
        users = UserSerializer(User.objects, many=True)
        return Response(users.data)

    # Possible to extend this function later to get more more
    # filtered results, and search by name, email, etc.
    @api_view(['GET'])
    @permission_classes([IsSuperUser])
    def get_by_id(id):
        try:
            found = User.objects.get(id=id)
            payload = UserSerializer(found).data
            return Response(payload)
        except (User.DoesNotExist):
            raise NotFound('SiteUser does not exist')

    # register function is a public endpoint

    @api_view(['POST'])
    @authentication_classes([])
    @permission_classes([])
    def register(request):
        user_new = UserSerializerWithToken(data=request.data)
        try:
            user_new.is_valid()
            user_new.save()
            Collection.objects.create(user=User.objects.get(
                username=user_new.data['email']), name='Main', description='')
            return Response(success(user_new.data))
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_403_FORBIDDEN)
    def _login(request):
        response = obtain_jwt_token(request)
        return response
    login = csrf_exempt(_login)

    @api_view(['GET'])
    def token_valid(request):
        return Response()