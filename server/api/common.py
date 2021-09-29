# functions with no specific area
from rest_framework.permissions import IsAdminUser
from .serializers import *
from .models import CollectionBook

# return token with user


def jwt_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }


def error(error_msg):
    return {
        'error': error_msg,
    }


def success(payload={}):
    return {
        **payload,
    }

# custom superuser verifier for permission class on admin endpoints


class IsSuperUser(IsAdminUser):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_superuser)


def get_ratio(a, b):
    if a > b:
        b, a = a, b
    if a != 0:
        return a / b
    else:
        return 0


def get_similarity(book1, book2, keys):
    s = 0.0
    if 'author' in keys and book1.author == book2.author:
        s += 1
    if 'genre' in keys:
        genres1 = [w.name for w in book1.genre.all()]
        genres2 = [w.name for w in book2.genre.all()]
        s += (2*sum(genres1.count(genre) for genre in genres2)) / (len(genres1) + len(genres2))
    if 'rating' in keys:
        s += abs(book1.review_details()
                 ['averageRating'] - book2.review_details()['averageRating'])/4
    if 'popularity' in keys:
        s += get_ratio(book1.number_reads, book2.number_reads)
    if 'word' in keys:
        s += get_ratio(book1.word_count, book2.word_count)
    if 'year' in keys:
        s += get_ratio(book1.publication_year, book2.publication_year)

    s = (s*100) / (keys.count('-') + 1)

    return s


def get_all_collection_books(collections):
    all_collection_books = []
    books = set()
    for collection in collections:
        for book in collection.books.all():
            if book.book not in books:
                all_collection_books.append(book)
                books.add(book.book)

    for book in all_collection_books:
        collection_books = CollectionBook.objects.filter(
            book=book.book, collection__in=collections)
        book.date_added = collection_books.order_by(
            'date_added').first().date_added
    return sorted(all_collection_books, key=lambda x: x.date_added)
