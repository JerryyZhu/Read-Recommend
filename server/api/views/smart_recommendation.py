from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Book
from ..common import success
from ..wrappers import handle_errors

import json, os

class SmartRecommendationViews:

    @api_view(['GET'])
    @handle_errors
    def get(request, pk):
        with open('../ml/recommendations2.json') as file:
            data = json.load(file)
        books = data[str(pk)]

        books = Book.objects.filter(pk__in=books)
        payload = {'books': [book.to_dict() for book in books]}

        return Response(success(payload))
