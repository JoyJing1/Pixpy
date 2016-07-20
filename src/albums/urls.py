from django.conf.urls import url, include
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token

from django.views.decorators.csrf import csrf_exempt

from albums import views

router = routers.DefaultRouter()

urlpatterns = [
    url(r'^(?P<album_id>[0-9]+)/$', views.AlbumDetailView.as_view(), name='detail'),
    url(r'', views.AlbumDataView.as_view(), name='album_data')
]
