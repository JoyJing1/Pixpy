from django.conf.urls import url

from . import views

app_name = 'albums'
urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    # ex: /albums/5/
    url(r'^(?P<album_id>[0-9]+)/$', views.detail, name='detail'),
]
