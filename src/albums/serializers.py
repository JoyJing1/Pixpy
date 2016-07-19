from rest_framework import serializers

from albums.models import Album
# from lib.utils import validate_email as email_is_valid


class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ('id', 'title', 'description')

    def create(self, validated_data):
        album = Album.objects.create(**validated_data)
        # album.set_password(validated_data['password'])
        album.save()
        return album
    #
    # def validate_email(self, value):
    #     """
    #     Validate if email is valid or there is an album using the email.
    #
    #     :param value: string
    #     :return: string
    #     """
    #
    #     if not email_is_valid(value):
    #         raise serializers.ValidationError('Please use a different email address provider.')
    #
    #     if Album.objects.filter(email=value).exists():
    #         raise serializers.ValidationError('Email already in use, please use a different email address.')
    #
    #     return value
