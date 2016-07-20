from django.shortcuts import get_object_or_404, get_list_or_404, render
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.views import generic
from rest_framework.generics import GenericAPIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.response import Response
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
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    lookup_url_kwarg = "album_id"

    def get(self, request, album_id):
        album_id = self.kwargs.get(self.lookup_url_kwarg)
        photos = Photo.objects.filter(album__id=album_id)
        serializer = PhotoSerializer(photos, many=True)
        return Response({ "photos": serializer.data }, content_type="JSON")
