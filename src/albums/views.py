from django.shortcuts import get_object_or_404, get_list_or_404, render
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.views import generic
from rest_framework.generics import GenericAPIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone

from rest_framework.mixins import CreateModelMixin

import json
import codecs

from rest_framework import viewsets
from src.albums.serializers import AlbumSerializer, PhotoSerializer
from .constants import default_image_url
from .models import Album, Photo


class AlbumDataView(GenericAPIView, CreateModelMixin):
    authentication_classes = (JSONWebTokenAuthentication,)
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

    def perform_create(self, serializer):
        serializer.save(upload_date=timezone.now(), user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({"album": serializer.data}, status=status.HTTP_201_CREATED, headers=headers)

    def get(self, request):
        print("inside AlbumDataView.get()")
        queryset = self.get_queryset()
        serializer = AlbumSerializer(queryset, many=True)
        
        print(serializer.data)

        return Response({"albums": serializer.data}, content_type="JSON")

    def post(self, request):
        print("inside AlbumDataView.post()")
        print(request.data)
        data = request.data
        response = self.create(request)
        return response


class AlbumDetailView(GenericAPIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    lookup_url_kwarg = "album_id"

    def get(self, request, album_id):
        album_id = self.kwargs.get(self.lookup_url_kwarg)
        photos = Photo.objects.filter(album__id=album_id)
        photo_serializer = PhotoSerializer(photos, many=True)

        album = Album.objects.filter(id=album_id)
        album_serializer = AlbumSerializer(album, many=True)

        return Response({ "curr_album": album_serializer.data,
                          "photos": photo_serializer.data },
                        content_type="JSON")


class CreatePhoto(GenericAPIView, CreateModelMixin):
    print("inside CreatePhoto")
    authentication_classes = (JSONWebTokenAuthentication,)
    lookup_url_kwarg = "album_id"

    def post(self, request, album_id):
        # print("attempting to post photo")

        album_id = self.kwargs.get(self.lookup_url_kwarg)
        album = Album.objects.filter(id=album_id)
        if request.user.id != album[0].user.id:
            return Response({"statusText": "Only album owners can add photos"},
                            status=status.HTTP_403_FORBIDDEN)

        body = request.body
        data = json.loads(body.decode("utf-8"))

        caption = data["caption"]
        image_url = data["image_url"]

        if album[0].image_url == default_image_url:
            album.update(image_url = image_url)
        upload_date = timezone.now()

        # Update album's cover image if doesn't exist
        # Check whether url is default
        # album.image_url = image_url

        photo = {'caption': caption,
                 'image_url': image_url,
                 'album': album,
                 'upload_date': upload_date}

        photo_serializer = PhotoSerializer(data=photo)

        if photo_serializer.is_valid():
            photo_serializer.save()
            return Response({"photo": photo_serializer.data}, content_type="JSON")
        return Response(photo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
