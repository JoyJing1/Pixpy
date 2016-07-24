from django.conf.urls import url

from src.base import views as base_views

urlpatterns = [
    url(r'', base_views.ProtectedDataView.as_view(), name='protected_data'),
]
