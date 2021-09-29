from django.db import models
from django.contrib.auth.models import AbstractUser

# User Model with some foreign key stuff
class User(AbstractUser):
    pass
    # TODO Book list foreign keys


class Author(models.Model):
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    email = models.EmailField(max_length=60)


class Genre(models.Model):
    name = models.CharField(max_length=60)

    def __str__(self):
        return self.name


class Book(models.Model):

    simple_fields = (
        ('title', 'title'),
        ('author', 'author'),
        ('publicationYear', 'publication_year'),
        ('publisher', 'publisher'),
        ('numberReads', 'number_reads'),
        ('description', 'description'),
        ('wordCount', 'word_count'),
        ('url', 'url'),
    )

    title = models.CharField(max_length=60)
    author = models.CharField(max_length=60)
    publication_year = models.IntegerField()
    publisher = models.CharField(max_length=60)
    number_reads = models.IntegerField()
    description = models.TextField()
    genre = models.ManyToManyField(Genre)
    word_count = models.IntegerField()
    url = models.CharField(max_length=200)

    total_ratings = models.IntegerField()
    average_rating = models.FloatField()
    
    def update_reviews(self):
        all_reviews = self.review_set.all()
        self.total_ratings = all_reviews.count()
        if self.total_ratings == 0:
            self.average_rating = 0
        else:
            self.average_rating = sum([review.rating for review in all_reviews]) / self.total_ratings
        self.save()
        
    
    def to_dict(self, user=None):
        dictionary = {kj: self.__dict__[kp] for kj, kp in self.simple_fields}
        dictionary['genre'] = ', '.join(
            [genre.name for genre in self.genre.all()])
        dictionary['id'] = self.pk
        dictionary['read'] = False if user is None else ReadBook.objects.filter(
            book=self, user=user).exists()
        return dictionary

    def review_details(self, user=None, to_show=None):
        details = {
            'totalRatings': self.total_ratings,
            'averageRating': self.average_rating,
        }
        if to_show == 'all_reviews':
            details['reviews'] = [review.to_dict()
                                  for review in self.review_set.exclude(user=user)]
        if to_show == 'user_rating':
            review = self.review_set.filter(user=user)
            if review.exists():
                details['userRating'] = review.first().rating
        return details

    def increment_read_counter(self, decrement=False):
        if decrement:
            self.number_reads = models.F('number_reads') - 1
        else:
            self.number_reads = models.F('number_reads') + 1
        self.save()


class Review(models.Model):
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    review = models.TextField()
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)

    def to_dict(self):
        return {
            'user': self.user.username,
            'userID': self.user.id,
            'firstName': self.user.first_name,
            'lastName': self.user.last_name,
            'rating': self.rating,
            'review': self.review,
        }


class Collection(models.Model):
    name = models.CharField(max_length=60)
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    date_created = models.DateTimeField(auto_now_add=True)
    description = models.TextField()

    def to_dict(self, include_books=False, sort_by_date=True, user=user, to_show=None):
        dictionary = {
            'id': self.pk,
            'name': self.name,
            'userFirstName': self.user.first_name,
            'userLastName': self.user.last_name,
            'description': self.description,
            'dateCreated': self.date_created,
        }
        if include_books:
            books = sorted(list(self.books.all(
            )), key=lambda x: x.date_added, reverse=True) if sort_by_date else self.books.all()
            dictionary['books'] = [book.to_dict(
                user, to_show=to_show) for book in books]
        return dictionary

# instance of book unique to a collection


class CollectionBook(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)
    collection = models.ForeignKey(
        Collection, on_delete=models.CASCADE, related_name='books')

    def to_dict(self, user, to_show=None):
        return {
            **self.book.to_dict(),
            **self.book.review_details(user, to_show=to_show),
            'dateAdded': self.date_added,
        }


class ReadBook(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def to_dict(self):
        return {
            **self.book.to_dict(),
            'dateAdded': self.date_added,
        }


class Challenge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    current = models.BooleanField(default=True)
    target = models.PositiveIntegerField()
    books = models.ManyToManyField(Book)
    start_date = models.DateField()
    end_date = models.DateField()
    completed = models.BooleanField(default=False)

    def to_dict(self):
        return {
            'id': self.pk,
            'target': self.target,
            'startDate': self.start_date,
            'endDate': self.end_date,
            'completed': self.completed,
        }

    def to_book_list(self):
        return [book.to_dict() for book in self.books.all()]


class Recommendation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    origin = models.ForeignKey(
        Book, on_delete=models.CASCADE, related_name='recommendations')
    target = models.ForeignKey(
        Book, on_delete=models.CASCADE, related_name='recommendations_for')
    reason = models.TextField()

    def to_dict(self):
        return {
            'user': self.user.username,
            'userID': self.user.id,
            'firstName': self.user.first_name,
            'lastName': self.user.last_name,
            'target': self.target.to_dict(),
            'reason': self.reason,
        }
