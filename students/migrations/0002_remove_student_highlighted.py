# Generated by Django 3.1.2 on 2020-10-09 15:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='highlighted',
        ),
    ]
