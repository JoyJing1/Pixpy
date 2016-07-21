from django.shortcuts import get_object_or_404, get_list_or_404, render
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.views import generic
from rest_framework.generics import GenericAPIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone

# import cloudinary
# import cloudinary.uploader
# import cloudinary.api


from rest_framework import viewsets
from albums.serializers import AlbumSerializer, PhotoSerializer

from .models import Album, Photo

class AlbumDataView(GenericAPIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

    def get(self, request):
        print("inside AlbumDataView.get()")
        queryset = self.get_queryset()
        serializer = AlbumSerializer(queryset, many=True)

        return Response({ "albums": serializer.data }, content_type="JSON")


class AlbumDetailView(GenericAPIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    lookup_url_kwarg = "album_id"

    def get(self, request, album_id):
        album_id = self.kwargs.get(self.lookup_url_kwarg)
        photos = Photo.objects.filter(album__id=album_id)
        photo_serializer = PhotoSerializer(photos, many=True)

        album = Album.objects.filter(id=album_id)
        album_serializer = AlbumSerializer(album, many=True)

        return Response({ "curr_album": album_serializer.data, "photos": photo_serializer.data }, content_type="JSON")


class CreatePhoto(GenericAPIView):
    print("inside CreatePhoto")
    authentication_classes = (JSONWebTokenAuthentication,)
    lookup_url_kwarg = "album_id"

    def post(self, request, album_id):
        album_id = self.kwargs.get(self.lookup_url_kwarg)

        photo = request.data
        album = Album.objects.filter(id=album_id)

        photo["album"] = album
        photo["upload_date"] = timezone.now()

        serializer = PhotoSerializer(data=photo)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
