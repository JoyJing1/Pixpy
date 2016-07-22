# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('albums', '0003_album_upload_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='image_url',
            field=models.CharField(default='http://res.cloudinary.com/joyjing1/image/upload/v1469206585/empty-album_frzcxq.png', max_length=500),
        ),
    ]
