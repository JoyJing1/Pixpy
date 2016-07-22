from rest_framework import serializers

from albums.models import Album, Photo

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ('id', 'title', 'description', 'image_url')

    def create(self, validated_data):
        album = Album.objects.create(**validated_data)
        album.save()
        return album

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ('id', 'caption', 'image_url', 'upload_date', 'album')

    def create(self, validated_data):
        photo = Photo.objects.create(**validated_data)
        photo.save()
        return photo
