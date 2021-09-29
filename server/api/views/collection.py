from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models import User, Book, Review, ReadBook, Challenge, Recommendation, Collection, CollectionBook
from ..common import success, error, get_all_collection_books
from .challenge import ChallengeViews

NO_BOOK_ERROR = 'Book not found.'
NO_USER_ERROR = 'User not found.'
NO_REVIEW_ERROR = 'Review not found.'
NO_COLLECTION_ERROR = 'Collection not found.'

class CollectionViews:

    @api_view(['POST'])
    def modify_collection(request):
        try:
            action = request.data['action']

            if action == 'create':
                name = request.data['name']
                description = request.data['description']
                if Collection.objects.filter(name=name, user=request.user).count() > 0 or name in ('All', 'Read'):
                    raise Exception(
                        'A collection with this name already exists')
                collection = Collection.objects.create(
                    user=request.user,
                    name=name,
                    description=description
                )
                return Response(success({'collection': collection.to_dict()}))

            elif action == 'modify':
                pk = request.data['collection_id']
                if 'name' in request.data and \
                        Collection.objects.filter(name=request.data['name'], user=request.user).count() > 0:
                    raise Exception(
                        'A collection with this name already exists')
                if pk in ('all', 'read'):
                    raise Exception('You many not modify default collections')
                fields_to_update = {key: request.data[key] for key in (
                    'name', 'description') if key in request.data}
                collection = Collection.objects.filter(
                    pk=pk, user=request.user)
                if collection.exists():
                    collection.update(**fields_to_update)
                    return Response(success({}))
                else:
                    raise Exception('No such collection')

            elif action == 'delete':
                pk = request.data['collection_id']
                if pk in ('all', 'read'):
                    raise Exception('You may not modify default collections')
                Collection.objects.filter(pk=pk, user=request.user).delete()
                return Response(success({}))

            else:
                raise Exception('Action value was not valid')
        except KeyError as e:
            return Response({'error': 'Key error: ' + str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @api_view(['POST'])
    def modify_book(request):
        try:
            book = Book.objects.get(id=request.data['book_id'])
            collection_id = request.data['collection_id']
            action = request.data['action']

            if action == 'add':
                if collection_id == 'read':
                    (user_read_book, created) = ReadBook.objects.get_or_create(
                        user=request.user, book=book)
                    if created:
                        book.increment_read_counter()
                        ChallengeViews.add_to_current_challenge(
                            request.user, book)
                        return Response({})
                    else:
                        return Response({'status': 'book exists, nothing changed'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    collection = Collection.objects.get(
                        id=collection_id, user=request.user)
                    (object, created) = CollectionBook.objects.get_or_create(
                        book=book, collection=collection)

                    if created:
                        return Response({})
                    else:
                        return Response({'status': 'book exists, nothing changed'}, status=status.HTTP_400_BAD_REQUEST)

            elif action == 'remove':
                if collection_id == 'read':
                    read_book = ReadBook.objects.filter(
                        user=request.user, book=book)
                    if not read_book.exists():
                        return Response('User did not read this book', status=status.HTTP_400_BAD_REQUEST)
                    else:
                        book.increment_read_counter(True)
                        read_book.delete()
                        return Response(success())
                else:
                    collection = Collection.objects.get(
                        id=collection_id, user=request.user)
                    CollectionBook.objects.filter(
                        book=book, collection=collection).delete()
                    return Response(success())

            else:
                raise Exception('Action value was not valid')
        except KeyError as e:
            return Response({'error': 'Key Error: ' + str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # endpoint?user_id=xx&collection_id=xx
    @api_view(['GET'])
    def get(request):
        try:
            user_id = request.GET.get('user_id', request.user.id)
            collection_id = request.GET.get('collection_id', 'all')
            user = User.objects.get(pk=user_id)

            if collection_id == 'all':
                all_collection_books = get_all_collection_books(
                    Collection.objects.filter(user=user))

                dictionary = {
                    'id': 'all',
                    'name': 'All',
                    'userFirstName': user.first_name,
                    'userLastName': user.last_name,
                }
                all_collection_books.sort(key=lambda x: x.date_added, reverse=True)
                dictionary['books'] = [collection_book.to_dict(
                    user, to_show='user_rating') for collection_book in all_collection_books]
                return Response(success(dictionary))
            elif collection_id == 'read':
                dictionary = {
                    'id': 'read',
                    'name': 'Read',
                    'userFirstName': user.first_name,
                    'userLastName': user.last_name,
                }
                books = sorted([book for book in ReadBook.objects.filter(
                    user=user)], key=lambda x: x.date_added, reverse=True)
                dictionary['books'] = [dict(book.to_dict(
                ), **book.book.review_details(user, to_show='user_rating')) for book in books]
                return Response(success(dictionary))
            else:
                collection = Collection.objects.get(
                    pk=collection_id, user=user)
                return Response(success(collection.to_dict(include_books=True, user=user, to_show='user_rating')))

        except User.DoesNotExist:
            return Response(error(NO_USER_ERROR), status=status.HTTP_404_NOT_FOUND)
        except Collection.DoesNotExist:
            return Response(error(NO_COLLECTION_ERROR), status=status.HTTP_404_NOT_FOUND)

    # endpoint?user_id=xx
    @api_view(['GET'])
    def get_all_ids(request):
        try:
            user_id = request.GET.get('user_id', request.user.id)
            book_id = request.GET.get('book_id')
            user = User.objects.get(pk=user_id)
            if book_id is None:
                collections = [
                    {'name': 'All', 'id': 'all'},
                ]
                collections.extend(collection.to_dict()
                                   for collection in Collection.objects.filter(user=user))
                return Response(success({'collections': collections}), status=status.HTTP_200_OK)
            else:
                book = Book.objects.get(pk=book_id)
                collections = []
                collection_books = CollectionBook.objects.filter(book=book)
                collection_set = set(
                    [w.collection.name for w in collection_books if w.collection.user.pk == user.pk])
                collections.extend(collection.to_dict() for collection in Collection.objects.filter(
                    user=user) if collection.name not in collection_set)
                return Response(success({'collections': collections}), status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(error(NO_USER_ERROR), status=status.HTTP_404_NOT_FOUND)
        except Collection.DoesNotExist:
            return Response(error(NO_COLLECTION_ERROR), status=status.HTTP_404_NOT_FOUND)
