from django.conf import settings
from django.conf.urls import include, url
from django.views.decorators.cache import cache_page

from src.base import views as base_views

urlpatterns = [
    url(r'^api/v1/accounts/', include('src.accounts.urls', namespace='accounts')),
    url(r'^api/v1/getdata/', include('src.base.urls', namespace='base')),

    # url(r'^api/v1/getalbums/1', include('albums.urls', namespace='albums')),
    url(r'^api/v1/getalbums/', include('src.albums.urls', namespace='albums')),

    # catch all others because of how history is handled by react router - cache this page because it will never change
    url(r'', cache_page(settings.PAGE_CACHE_SECONDS)(base_views.IndexView.as_view()), name='index'),
]
