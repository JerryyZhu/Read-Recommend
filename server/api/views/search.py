from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import User, Book, Review, ReadBook, Challenge, Recommendation, Collection, CollectionBook
from ..common import success, error, get_similarity, get_all_collection_books
from ..wrappers import handle_errors


NO_BOOK_ERROR = 'Book not found.'
NO_USER_ERROR = 'User not found.'
NO_REVIEW_ERROR = 'Review not found.'
NO_COLLECTION_ERROR = 'Collection not found.'

class SearchViews:
    @api_view(['GET'])
    @handle_errors
    def filter_by(request):
        mode = request.GET.get('mode')
        word = request.GET.get('keyword')
        limit = int(request.GET.get('limit', '50'))

        if mode == 'title':
            books = Book.objects.filter(title__contains=word)[0:int(limit)]
        elif mode == 'author':
            books = Book.objects.filter(author__contains=word)[0:int(limit)]
        elif mode == 'recent':
            recent_books = [collection_book.book for collection_book in get_all_collection_books(
                Collection.objects.filter(user=request.user))][0:10]
            if len(recent_books) == 0:
                return Response([])
            recent_book_pks = [book.pk for book in recent_books]

            books = Book.objects.exclude(pk__in=recent_book_pks)

            results = []

            for book in books:
                s = sum([get_similarity(book, recent_book, 'author-rating-popularity-word-year')
                         for recent_book in recent_books])/len(recent_books)
                detail = {**book.to_dict(), **book.review_details()}
                detail['similarity'] = s
                results.append(detail)
            results = [w for w in results if w['similarity'] > 0]
            return Response(sorted(results, key=lambda x: x['similarity'], reverse=True)[0:limit])

        else:
            raise Exception('No such mode')

        results = [{**b.to_dict(), **b.review_details()} for b in books]

        return Response(sorted(results, key=lambda x: -x['averageRating']))

    # give it a book id, will find similar
    @api_view(['GET'])
    @handle_errors
    def find_similar(request):

        book_id = request.GET.get('bookId')
        keys = request.GET.get('keys')
        if None in (book_id, keys):
            return Response([])
        src_book = Book.objects.get(pk=book_id)
        limit = int(request.GET.get('limit', '20'))
        results = []

        for book in Book.objects.exclude(pk=book_id):
            book_info = {**book.to_dict(), **book.review_details()}
            book_info['similarity'] = get_similarity(src_book, book, keys)
            results.append(book_info)
        results = [w for w in results if w['similarity'] > 0]
        return Response(sorted(results, key=lambda x: x['similarity'], reverse=True)[0:limit])