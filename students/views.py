import json

from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView

from students.models import Student
from django.contrib.auth.models import User
from students.serializers import StudentSerializer, UserSerializer, DemoSerializer
from rest_framework import permissions, status
from students.permissions import IsOwnerOrReadOnly
from rest_framework import generics
from rest_framework.response import Response

from copy import deepcopy
import numpy as np
import matplotlib.pyplot as plt

class ClustersList(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        par1 = queryset.values_list('score_math', flat=True)
        par2 = queryset.values_list('score_science', flat=True)
        par3 = queryset.values_list('score_indonesian', flat=True)

        id = queryset.values_list('id', flat=True)
        fullname = queryset.values_list('fullname', flat=True)
        id_minat = queryset.values_list('id_minat', flat=True)
        student_class = queryset.values_list('student_class', flat=True)
        owner = queryset.values_list('owner', flat=True)
        X = np.array(list(zip(par1, par2, par3)))

        def dist(a, b, ax=1):
            return np.linalg.norm(a - b, axis=ax)

        k = 3
        C_x = [76, 62, 62]
        C_y = [69, 77, 69]
        C_z = [64, 64, 73]
        C = np.array(list(zip(C_x, C_y, C_z)), dtype=np.int)

        C_old = np.zeros(C.shape)
        clusters = np.zeros(len(X))
        error = dist(C, C_old, None)
        while error != 0:
            for i in range(len(X)):
                distances = dist(X[i], C)
                cluster = np.argmin(distances)
                clusters[i] = cluster
            C_old = deepcopy(C)
            for i in range(k):
                points = [X[j] for j in range(len(X)) if clusters[j] == i]
                C[i] = np.mean(points, axis=0)
            error = dist(C, C_old, None)
        colors = ['r', 'g', 'b', 'y', 'c', 'm']
        fig, ax = plt.subplots()
        for i in range(k):
            points = np.array([X[j] for j in range(len(X)) if clusters[j] == i])
            ax.scatter(points[:, 0], points[:, 1], points[:, 2], c=colors[i])
        ax.scatter(C[:, 0], C[:, 1], C[:, 2], marker='*', c='#050505')

        kmeans = np.array(list(zip(
            id, fullname, id_minat, student_class,
            par1, par2, par3,
            clusters
        )))
        return Response(kmeans)

class TryUpdate(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        par1 = queryset.values_list('score_math', flat=True)
        par2 = queryset.values_list('score_science', flat=True)
        par3 = queryset.values_list('score_indonesian', flat=True)

        X = np.array(list(zip(par1, par2, par3)))

        def dist(a, b, ax=1):
            return np.linalg.norm(a - b, axis=ax)

        k = 3
        C_x = [76, 62, 62]
        C_y = [69, 77, 69]
        C_z = [64, 64, 73]
        C = np.array(list(zip(C_x, C_y, C_z)), dtype=np.int)

        C_old = np.zeros(C.shape)
        clusters = np.zeros(len(X))
        error = dist(C, C_old, None)
        while error != 0:
            for i in range(len(X)):
                distances = dist(X[i], C)
                cluster = np.argmin(distances)
                clusters[i] = cluster
            C_old = deepcopy(C)
            for i in range(k):
                points = [X[j] for j in range(len(X)) if clusters[j] == i]
                C[i] = np.mean(points, axis=0)
            error = dist(C, C_old, None)
        colors = ['r', 'g', 'b', 'y', 'c', 'm']
        fig, ax = plt.subplots()
        for i in range(k):
            points = np.array([X[j] for j in range(len(X)) if clusters[j] == i])
            ax.scatter(points[:, 0], points[:, 1], points[:, 2], c=colors[i])
        ax.scatter(C[:, 0], C[:, 1], C[:, 2], marker='*', c='#050505')

    def get_object(self, obj_id):
        try:
            return Student.objects.get(id=obj_id)
        except (Student.DoesNotExist, ValidationError):
            raise status.HTTP_400_BAD_REQUEST

    def validate_ids(self, id_list):
        for id in id_list:
            try:
                Student.objects.get(id=id)
            except (Student.DoesNotExist, ValidationError):
                raise status.HTTP_400_BAD_REQUEST
        return True

    def put(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        par1 = queryset.values_list('score_math', flat=True)
        par2 = queryset.values_list('score_science', flat=True)
        par3 = queryset.values_list('score_indonesian', flat=True)

        X = np.array(list(zip(par1, par2, par3)))

        def dist(a, b, ax=1):
            return np.linalg.norm(a - b, axis=ax)

        k = 3
        C_x = [76, 62, 62]
        C_y = [69, 77, 69]
        C_z = [64, 64, 73]
        C = np.array(list(zip(C_x, C_y, C_z)), dtype=np.int)

        C_old = np.zeros(C.shape)
        clusters = np.zeros(len(X))
        error = dist(C, C_old, None)
        while error != 0:
            for i in range(len(X)):
                distances = dist(X[i], C)
                cluster = np.argmin(distances)
                clusters[i] = cluster
            C_old = deepcopy(C)
            for i in range(k):
                points = [X[j] for j in range(len(X)) if clusters[j] == i]
                C[i] = np.mean(points, axis=0)
            error = dist(C, C_old, None)

        id_list = request.data['id']
        self.validate_ids(id_list=id_list)
        instances = []
        for i in range(0, len(X)):
            for id in id_list:
                obj = self.get_object(obj_id=id)
            obj.cluster = clusters[i]
            obj.save()
            instances.append(obj)
        serializer = DemoSerializer(instances, many=True)
        return Response(serializer.data)

class StudentsList(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class StudentsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly]

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer