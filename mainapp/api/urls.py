from django.urls import path
from .views import (
    PostsView
)

urlpatterns = [
    path('postsview/', PostsView.as_view()),
]