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

# def index(request):
#     queryset = Album.objects.all()
#     serializer_class = AlbumSerializer

# class AlbumViewSet(viewsets.ModelViewSet):
#     queryset = Album.objects.all()
#     serializer_class = AlbumSerializer



class AlbumDataView(GenericAPIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

    print("in AlbumDataView")
    # print(Album)
    # print(get_list_or_404(Album))
    def get(self, request):

        queryset = self.get_queryset()
        serializer = AlbumSerializer(queryset, many=True)
        # data = {
        # 'albums': albums
        # }
        #
        return Response(serializer.data, content_type="JSON")

    # albums = get_list_or_404(Album)
    # return HttpResponse(simplejson.dumps(albums), mimetype='application/json'

# def detail(request, album_id):
#     album = get_object_or_404(Album, pk=album_id)
#     photos = get_list_or_404(Photo, album_id=album_id)
#     # return render(request, 'albums/detail.html', {'album': album, 'photos': photos})
#
#     to_json = { album: album, photos: photos }
#     return HttpResponse(simplejson.dumps(to_json), mimetype='application/json')







    # class DetailView(generic.DetailView):
    #     model = Album
    #     # context_object_name = 'all_albums'
    #     photos = get_list_or_404(Photo, album_id=self.id)
    #     template_name = 'albums/detail.html'
    #
    #     def get_queryset(self):
    #         return get_list_or_404(Photo, album_id=self.id)


    # class IndexView(generic.ListView):
    #     template_name = 'albums/index.html'
    #     context_object_name = 'all_albums'
    #
    #     def get_queryset(self):
    #         # return Album.objects.order_by('-upload_date')
    #         albums Album.objects.order_by('-upload_date')
    #         return HttpResponse(simplejson.dumps(albums), mimetype='application/json')
