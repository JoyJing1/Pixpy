from rest_framework import serializers

from albums.models import Album

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ('id', 'title', 'description')

    def create(self, validated_data):
        album = Album.objects.create(**validated_data)
        album.save()
        return album
