from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from account import views

urlpatterns = [
    path('api/user/', include('account.urls')),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]
