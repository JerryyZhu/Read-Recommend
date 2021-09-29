"""
    If you want to modify this script and generate a new databse, you need to perform the following actions:
    1. delete the database
    2. type `python3 manage.py shell` into the shell
    3. type `import script` to run this script
"""

from django.core.management import call_command
from api.models import Book, Genre, Collection, User, Review, CollectionBook, Recommendation
import os, random

call_command("migrate", interactive=False)

user = User.objects.create_superuser("admin", password="securepassword!@#")

for i in range(10):
    user = User.objects.create(
        email = f"test{i}@email.com",
        username = f"test{i}@email.com",
        first_name = f"first{i}",
        last_name = f"last{i}"
    )
    user.set_password(b"password")
    user.save()

for i in range(10):
    Genre.objects.create(
        name=f"genre{i}"
    )

for i in range(100):
    book = Book.objects.create(
        title=f"title{i}",
        author=f"author{i}",
        publication_year=i,
        publisher=f"publisher{i}",
        number_reads=i,
        description=f"description{i}",
        word_count=i,
    )
    book.genre.set(Genre.objects.filter(pk=(i%10+1)))


users = User.objects.exclude(username="admin")

for user in users:
    for i in range(3):
        Collection.objects.create(
            name=f"{user.first_name}'s collection #{i}",
            user=user,
            description=f"description{i}"
        )

books = Book.objects.all()

for user in users:
    for book in books:
        Review.objects.create(
            user=user,
            book=book,
            rating=random.randrange(1, 6),
            review=str(random.getrandbits(10))
        )
        Recommendation.objects.create(
            user=user,
            origin=book,
            target=Book.objects.get(pk=((book.pk+random.randint(1,10))%100+1)),
            reason=str(random.getrandbits(10))
        )

collections = Collection.objects.all()

for collection in collections:
    for book in books:
        if random.randrange(3) == 2:
            CollectionBook.objects.create(
                collection=collection,
                book=book
            )