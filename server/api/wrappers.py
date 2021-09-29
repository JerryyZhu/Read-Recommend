from rest_framework.response import Response
from rest_framework import status
from .common import error


def handle_errors(original_function):
    def new_function(*args, **kwargs):
        try:
            return original_function(*args, **kwargs)
        except KeyError as e:
            return Response(error('Key error: ' + str(e)), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(error(str(e)), status=status.HTTP_400_BAD_REQUEST)
    return new_function
