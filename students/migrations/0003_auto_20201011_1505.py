# Generated by Django 3.1.2 on 2020-10-11 08:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0002_remove_student_highlighted'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='cluster',
            field=models.IntegerField(blank=True, default='null'),
        ),
    ]
