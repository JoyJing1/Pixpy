from __future__ import unicode_literals

from django.db import models
from django.utils import timezone

# Create your models here.

class Album(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    upload_date = models.DateTimeField('date uploaded')

    def __str__(self):
        return self.title

    # Add to Album model once we've created User model
    # user = models.ForeignKey(User, on_delete=models.CASCADE)


class Photo(models.Model):
    image_url = models.CharField(max_length=200)
    caption = models.CharField(max_length=200)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    upload_date = models.DateTimeField('date uploaded')

    def __str__(self):
        return self.caption

    def uploaded_time_ago(self):
        return timezone.now() - self.upload_date