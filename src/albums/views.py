from django.shortcuts import get_object_or_404, get_list_or_404, render
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.views import generic
from rest_framework.generics import GenericAPIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.response import Response
import pdb

# from django.utils import simplejson
from rest_framework import viewsets
from albums.serializers import AlbumSerializer, PhotoSerializer

from .models import Album, Photo

class AlbumDataView(GenericAPIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

    # print("in AlbumDataView")
    print("just reached AlbumDataView")
    # print(self)
    # pdb.set_trace()

    lookup_url_kwarg = "album_id"

    def get(self, request):
        print("inside AlbumDataView.get()")
        # print(self.kwargs)

        # album_id = self.kwargs.get(self.lookup_url_kwarg)
        #
        # print(album_id)
        #
        # if album_id:
        #     # album_id = self.kwargs('album_id')
        #     print("album_id successfully pulled")
        #     print(album_id)
        #     photos = Photo.objects.filter(album__id=album_id)
        #     serializer = PhotoSerializer(photos, many=True)
        #     return Response({ "photos": serializer.data }, content_type="JSON")
        #
        # else:
        #     print("no album_id was passed in url")
        #     queryset = self.get_queryset()
        #     serializer = AlbumSerializer(queryset, many=True)
        #
        #     return Response({ "albums": serializer.data }, content_type="JSON")
        #

        print("no album_id was passed in url")
        queryset = self.get_queryset()
        serializer = AlbumSerializer(queryset, many=True)

        return Response({ "albums": serializer.data }, content_type="JSON")



class AlbumDetailView(GenericAPIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    # queryset = Album.objects.all()
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    lookup_url_kwarg = "album_id"

    def get(self, request, album_id):
        album_id = self.kwargs.get(self.lookup_url_kwarg)
        photos = Photo.objects.filter(album__id=album_id)
        serializer = PhotoSerializer(photos, many=True)
        return Response({ "photos": serializer.data }, content_type="JSON")


#     print("inside AlbumDetailView")
#
#     def get_queryset(self):
#         album_id = self.kwargs('album_id')
#         print(album_id)
#
#         photos = Photo.objects.filter(album__id=album_id)
#         print(photos)
#         return photos
#
#
#     def get(self, request):
#         queryset = self.get_queryset()
#         serializer = PhotoSerializer(queryset, many=True)
#
#         return Response({ "photos": serializer.data }, content_type="JSON")

        # filter = {}
        # filter[album_id] =

    #  Filter based on album_id
    # return photos in json


#     serializer_class = AlbumSerializer

# def detail(request, album_id):
#     album = get_object_or_404(Album, pk=album_id)
#     photos = get_list_or_404(Photo, album_id=album_id)
    # return render(request, 'albums/detail.html', {'album': album, 'photos': photos})
#
#     to_json = { album: album, photos: photos }
#     return HttpResponse(simplejson.dumps(to_json), mimetype='application/json')
