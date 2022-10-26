from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title

class User(AbstractUser):
    pass

class Aktualnosci(models.Model):
    poster = models.ForeignKey(User, models.SET_NULL, null=True, related_name="poster")
    title = models.TextField(max_length=50)
    title_image = models.URLField(max_length=200)
    content = RichTextField(blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)
    archived = models.BooleanField(default=False)
    