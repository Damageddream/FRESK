from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):

    def _str_(self):
        return self.username

class Aktualnosci(models.Model):
    poster = models.ForeignKey(User, models.SET_NULL, null=True, related_name="poster")
    title = models.CharField(max_length=64, )
    title_image = models.ImageField(null=True, blank=True, upload_to="images/")
    content = models.JSONField(default=[])
    content_preview = models.TextField(max_length=800, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    archived = models.BooleanField(default=False)

    def _str_(self):
        return self.title


class Photos(models.Model):
    wydarzenie = models.ForeignKey(Aktualnosci, models.SET_NULL, null=True, related_name="wydarzenie_photos")
    image = models.ImageField(null=True, blank=True, upload_to="images/")

class DownloadFile(models.Model):
    wydarzenie = models.ForeignKey(Aktualnosci, models.SET_NULL, null=True, related_name="wydarzenie_files")
    file = models.FileField(null=True, blank=True, upload_to="images/")
    file_name = models.CharField(max_length=64, default='' )
    
class ContactForm(models.Model):
    conForm = models.TextField(max_length=300)
    email = models.EmailField(max_length=64, )
    name = models.CharField(max_length=64, )
    read = models.BooleanField(default=False)



