from django.shortcuts import get_object_or_404, get_list_or_404, render
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.views import generic

from .models import Album, Photo

class IndexView(generic.ListView):
    template_name = 'albums/index.html'
    context_object_name = 'all_albums'

    def get_queryset(self):
        return Album.objects.order_by('-upload_date')

# class DetailView(generic.DetailView):
#     model = Album
#     # context_object_name = 'all_albums'
#     photos = get_list_or_404(Photo, album_id=self.id)
#     template_name = 'albums/detail.html'
#
#     def get_queryset(self):
#         return get_list_or_404(Photo, album_id=self.id)

def detail(request, album_id):
    album = get_object_or_404(Album, pk=album_id)
    photos = get_list_or_404(Photo, album_id=album_id)
    return render(request, 'albums/detail.html', {'album': album, 'photos': photos})
