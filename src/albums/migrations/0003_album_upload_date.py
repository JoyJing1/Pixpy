# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('albums', '0002_remove_album_upload_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='upload_date',
            field=models.DateTimeField(default=datetime.datetime(2016, 7, 18, 19, 15, 40, 883647, tzinfo=utc), verbose_name='date uploaded'),
            preserve_default=False,
        ),
    ]
