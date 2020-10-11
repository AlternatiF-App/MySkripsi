from django.urls import path
from interests import views

urlpatterns = [
    path('interests/', views.InterestsList.as_view()),
    path('interests/<int:pk>/', views.InterestsDetail.as_view()),
]