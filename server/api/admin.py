from django.contrib import admin

from .models import User, Author, Book, Genre, Review, Collection, CollectionBook, ReadBook, Recommendation

# Register your models here.
admin.site.register(User)
admin.site.register(Author)
admin.site.register(Book)
admin.site.register(Genre)
admin.site.register(Review)
admin.site.register(Collection)
admin.site.register(CollectionBook)
admin.site.register(ReadBook)
admin.site.register(Recommendation)
