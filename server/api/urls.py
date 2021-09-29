from django.urls import include, path
from rest_framework import routers
from .views import *

API_VERSION = 'v1'

urlpatterns = [
    path('api/v1/login/', UserViews.login),
    path('api/v1/user/<int:id>', UserViews.get_by_id),
    path('api/v1/user/get_all', UserViews.get_all),
    path('api/v1/user/register', UserViews.register),
    path('api/v1/token_valid', UserViews.token_valid),
    path('api/v1/book/<int:id>', BookViews.get_book_by_id),
    path('api/v1/get_all_book_reviews/<int:id>',
         BookViews.get_all_book_reviews),
    path('api/v1/view_review/<int:book_pk>', BookViews.view_review),
    path('api/v1/view_review/<int:book_pk>/<int:user_pk>', BookViews.view_review),
    path('api/v1/create_or_edit_review', BookViews.create_or_edit_review),
    path('api/v1/delete_review', BookViews.delete_review),
    path('api/v1/collection/get', CollectionViews.get),
    path('api/v1/collection/get_all_ids', CollectionViews.get_all_ids),
    path('api/v1/collection/modify_collection',
         CollectionViews.modify_collection),
    path('api/v1/collection/modify_book', CollectionViews.modify_book),
    path('api/v1/challenge/create', ChallengeViews.create),
    path('api/v1/challenge/get_all', ChallengeViews.get_all),
    path('api/v1/challenge/get', ChallengeViews.get),
    path('api/v1/challenge/get/<int:pk>', ChallengeViews.get),
    path('api/v1/recommendation/create_or_edit',
         RecommendationViews.create_or_edit),
    path('api/v1/recommendation/delete', RecommendationViews.delete),
    path('api/v1/recommendation/get/<int:book_pk>', RecommendationViews.get),

    # grill 60-62
    path('api/v1/search/filter_by', SearchViews.filter_by),
    path('api/v1/search/find_similar', SearchViews.find_similar),
    path('api/v1/smart_recommendations/<int:pk>', SmartRecommendationViews.get),

    path('api/v1/get_token', ResetViews.get_token),
    path('api/v1/reset_password', ResetViews.reset),
]
