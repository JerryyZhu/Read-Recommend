from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, APIException
from rest_framework import status
from datetime import datetime
from ..models import User, Book, Review, ReadBook, Challenge, Recommendation, Collection, CollectionBook
from ..common import success, error
from ..wrappers import handle_errors


NO_BOOK_ERROR = 'Book not found.'
NO_USER_ERROR = 'User not found.'
NO_REVIEW_ERROR = 'Review not found.'
NO_COLLECTION_ERROR = 'Collection not found.'

class RecommendationViews:

    @api_view(['POST'])
    @handle_errors
    def create_or_edit(request):
        user = request.user
        origin = Book.objects.get(pk=request.data['origin'])
        target = Book.objects.get(pk=request.data['target'])
        reason = request.data['reason']

        Recommendation.objects.update_or_create(user=user, origin=origin, defaults={
            'target': Book.objects.get(pk=request.data['target']),
            'reason': request.data['reason'],
        })

        return Response(success())

    @api_view(['POST'])
    @handle_errors
    def delete(request):
        user = request.user
        origin = Book.objects.get(pk=request.data['origin'])

        recommendations = Recommendation.objects.filter(
            user=user, origin=origin)

        if recommendations.exists():
            recommendations.delete()
            return Response(success())
        else:
            raise Exception('No such recommendation.')

    @api_view(['GET'])
    @handle_errors
    def get(request, book_pk):
        user = request.user
        book = Book.objects.get(pk=book_pk)

        user_recommendation = book.recommendations.filter(user=user)
        other_recommendations = book.recommendations.all()

        book_set = set(
            [recommendation.target for recommendation in other_recommendations])

        other = []

        for book in book_set:
            other.append({
                'book': book.title,
                'bookId': book.pk,
                'bookUrl': book.url,
                'recommendations': [
                    {
                        'userID': recommendation.user.pk,
                        'user': recommendation.user.first_name,
                        'comments': recommendation.reason
                    } for recommendation in other_recommendations.filter(target=book)
                ]
            })

        other.sort(key=lambda w: -len(w['recommendations']))

        payload = {
            'ownRecommendation': user_recommendation.first().to_dict() if user_recommendation.exists() else {},
            'otherRecommendations': other,
        }

        return Response(success(payload))