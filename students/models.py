from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles
from pygments.lexers import get_lexer_by_name
from pygments.formatters.html import HtmlFormatter
from pygments import highlight

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted([(item, item) for item in get_all_styles()])

class Student(models.Model):
    fullname = models.CharField(max_length=60, blank=False)
    id_minat = models.IntegerField(blank=False)
    student_class = models.IntegerField(blank=False)
    score_math = models.IntegerField(blank=False)
    score_science = models.IntegerField(blank=False)
    score_indonesian = models.IntegerField(blank=False)
    cluster = models.IntegerField(blank=True, default="null")

    owner = models.ForeignKey('auth.User', related_name='students', on_delete=models.CASCADE)

    class Meta:
        ordering = ['id']