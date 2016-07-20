from django.conf.urls import url, include
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token

from django.views.decorators.csrf import csrf_exempt

from albums import views

router = routers.DefaultRouter()
# router.register(r'', views.AlbumViewSet)


# app_name = 'albums'
urlpatterns = [

    # url(r'^', include(router.urls)),
    url(r'', views.AlbumDataView.as_view(), name='album_data'),
    url(r'^api-token-auth/', csrf_exempt(obtain_jwt_token))



    # url(r'^api-token-auth/', include('rest_framework.urls', namespace='rest_framework'))
    # url(r'^$', views.IndexView.as_view(), name='index'),
    # ex: /albums/
    # url(r'^albums/$', views.IndexView.as_view(), name='index'),
    # ex: /albums/5/
    # url(r'^(?P<album_id>[0-9]+)/$', views.detail, name='detail'),
]
