from django.urls import path
from students import views

urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('clusters/', views.ClustersUpdate.as_view()),
    path('students/', views.StudentsList.as_view()),
    path('students/<int:pk>/', views.StudentsDetail.as_view()),
]