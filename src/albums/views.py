from django.shortcuts import get_object_or_404, get_list_or_404, render
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.views import generic
from rest_framework.generics import GenericAPIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.response import Response

# from django.utils import simplejson
from rest_framework import viewsets
from albums.serializers import AlbumSerializer

from .models import Album

class AlbumDataView(GenericAPIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

    print("in AlbumDataView")
    def get(self, request):
        queryset = self.get_queryset()
        serializer = AlbumSerializer(queryset, many=True)

        return Response({ "albums": serializer.data }, content_type="JSON")

# def detail(request, album_id):
#     album = get_object_or_404(Album, pk=album_id)
#     photos = get_list_or_404(Photo, album_id=album_id)
#     # return render(request, 'albums/detail.html', {'album': album, 'photos': photos})
#
#     to_json = { album: album, photos: photos }
#     return HttpResponse(simplejson.dumps(to_json), mimetype='application/json')
