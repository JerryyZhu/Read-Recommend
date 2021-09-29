from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models import User, Book, Review, Collection
from ..common import success, error

NO_BOOK_ERROR = 'Book not found.'
NO_USER_ERROR = 'User not found.'
NO_REVIEW_ERROR = 'Review not found.'
NO_COLLECTION_ERROR = 'Collection not found.'

class BookViews:
    @api_view(['GET'])
    def get_book_by_id(request, id):
        try:
            book = Book.objects.get(pk=id)
        except Book.DoesNotExist:
            return Response(error(NO_BOOK_ERROR), status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(success(book.to_dict(user=request.user)))

    @api_view(['GET'])
    def get_all_book_reviews(request, id):
        try:
            book = Book.objects.get(pk=id)
        except Book.DoesNotExist:
            return Response(error(NO_BOOK_ERROR), status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(success(book.review_details(request.user, to_show='all_reviews')))

    @api_view(['GET'])
    def view_review(request, book_pk, user_pk=None):
        try:
            book = Book.objects.get(pk=book_pk)
            user = User.objects.get(
                pk=user_pk) if user_pk is not None else request.user
            review = Review.objects.get(book=book, user=user)
        except Book.DoesNotExist:
            return Response(error(NO_BOOK_ERROR), status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response(error(NO_USER_ERROR), status=status.HTTP_404_NOT_FOUND)
        except Review.DoesNotExist:
            return Response(error(NO_REVIEW_ERROR), status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(success(review.to_dict()))

    @api_view(['POST'])
    def create_or_edit_review(request):
        book_pk, rating, review = None, None, None

        try:
            book_pk = request.data['book']
            rating = request.data['rating']
            review = request.data.get('review', None)
            if rating < 1 or rating > 5:
                raise ValueError
        except KeyError as e:
            return Response(error('Missing key: ' + str(e)), status=status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response(error('The rating must be between 1 and 5 inclusive.'), status=status.HTTP_400_BAD_REQUEST)

        try:
            book = Book.objects.get(pk=book_pk)
            defaults = {'rating': rating}
            if review is not None:
                defaults['review'] = review
            Review.objects.update_or_create(
                book=book, user=request.user, defaults=defaults)
            book.update_reviews()
        except Book.DoesNotExist:
            return Response(error(NO_BOOK_ERROR), status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(success())

    @api_view(['POST'])
    def delete_review(request):
        try:
            book = Book.objects.get(pk=request.data['book'])
            user = request.user
            Review.objects.get(book=book, user=user).delete()
            book.update_reviews()
        except KeyError as e:
            return Response(error('Missing key: ' + str(e)), status=status.HTTP_400_BAD_REQUEST)
        except Book.DoesNotExist:
            return Response(error(NO_BOOK_ERROR), status=status.HTTP_404_NOT_FOUND)
        except Review.DoesNotExist:
            return Response(error('The authenticated user had no review of that book.'), status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(success())