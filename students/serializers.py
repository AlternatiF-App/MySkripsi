from rest_framework import serializers
from students.models import Student
from django.contrib.auth.models import User

class DemoSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    id = serializers.IntegerField()
    class Meta:
        model = Student
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    id = serializers.IntegerField()
    class Meta:
        model = Student
        fields = ['id', 'fullname', 'id_minat', 'student_class',
                  'score_math', 'score_science', 'score_indonesian', 'cluster', 'owner',]

class UserSerializer(serializers.ModelSerializer):
    students = serializers.PrimaryKeyRelatedField(many=True, queryset=Student.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username','teacher_class', 'siswa']