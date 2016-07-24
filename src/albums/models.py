from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from .constants import default_image_url
from accounts import models as account_models

class Album(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    image_url = models.CharField(max_length=500, default=default_image_url)
    upload_date = models.DateTimeField('date uploaded')
    user = models.ForeignKey(account_models.User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    def uploaded_time_ago(self):
        return timezone.now() - self.upload_date

class Photo(models.Model):
    image_url = models.CharField(max_length=200)
    caption = models.CharField(max_length=200)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    upload_date = models.DateTimeField('date uploaded')

    def __str__(self):
        return self.caption

    def uploaded_time_ago(self):
        return timezone.now() - self.upload_date
