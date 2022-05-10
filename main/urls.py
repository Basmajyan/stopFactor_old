from django.urls import path , re_path
from django.conf import settings
from django.conf.urls.static import static
from . import views

from django.conf import settings
from django.views.static import serve

urlpatterns = [
    path('', views.index, name='index'),
    path('pay/<str:token>', views.pay, name='pay'),
    path('order/<str:token>', views.order, name='order'),
    path('apirequest', views.PayConform.as_view()),
    path('contact', views.contact, name='contact'),
    re_path(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
    re_path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
    
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
