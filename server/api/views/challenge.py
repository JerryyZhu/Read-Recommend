from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime, date, timedelta

from ..models import User, Challenge
from ..common import success, error
from ..wrappers import handle_errors


NO_BOOK_ERROR = 'Book not found.'
NO_USER_ERROR = 'User not found.'
NO_REVIEW_ERROR = 'Review not found.'
NO_COLLECTION_ERROR = 'Collection not found.'


class ChallengeViews:
    def get_current_challenge(user):
        current_challenge = Challenge.objects.filter(user=user, current=True)
        if current_challenge.exists():
            current_challenge = current_challenge.first()
            if date.today() > current_challenge.end_date:
                current_challenge.current = False
                current_challenge.save()
                return None
            else:
                return current_challenge
        else:
            return None

    def add_to_current_challenge(user, book):
        current_challenge = ChallengeViews.get_current_challenge(user)

        if current_challenge is not None:
            if book not in current_challenge.books.all():
                current_challenge.books.add(book)
                if current_challenge.books.count() >= current_challenge.target:
                    current_challenge.current = False
                    current_challenge.completed = True
                    current_challenge.end_date = date.today()
                    current_challenge.save()

    @api_view(['POST'])
    @handle_errors
    def create(request):
        user = request.user
        target = request.data['target']
        current_challenge = ChallengeViews.get_current_challenge(user)

        if current_challenge is None:
            challenge = Challenge.objects.create(
                user=user,
                target=target,
                start_date=date.today(),
                end_date=date.today() + timedelta(days=30),
            )
            return Response(success(challenge.to_dict()))
        else:
            raise Exception('You have an ongoing challenge')

    @api_view(['GET'])
    @handle_errors
    def get_all(request):
        user = request.user
        current_challenge = ChallengeViews.get_current_challenge(user)
        payload = {
            'current': current_challenge.to_dict() if current_challenge is not None else {},
            'past': [challenge.to_dict() for challenge in Challenge.objects.filter(user=user).order_by('start_date') if challenge != current_challenge],
        }
        return Response(success(payload))

    @api_view(['GET'])
    @handle_errors
    def get(request, pk=None):
        user = request.user
        if pk is None:
            challenge = ChallengeViews.get_current_challenge(user)
            if challenge is None:
                return Response(success({}))
        else:
            challenge = Challenge.objects.filter(user=user, pk=pk)
            if challenge.exists():
                challenge = challenge.first()
            else:
                raise Exception('There is no challenge with that id.')

        return Response(success({
            'challenge': challenge.to_dict(),
            'books': challenge.to_book_list(),
        }))