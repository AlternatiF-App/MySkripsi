import json
from rest_framework.exceptions import ValidationError
from students.models import Student
from django.contrib.auth.models import User
from students.serializers import StudentSerializer, UserSerializer, ClustersSerializer
from rest_framework import permissions, status
from students.permissions import IsOwnerOrReadOnly
from rest_framework import generics
from rest_framework.response import Response

from copy import deepcopy
import numpy as np
import matplotlib.pyplot as plt

class ClustersUpdate(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

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
        serializer = ClustersSerializer(instances, many=True)
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