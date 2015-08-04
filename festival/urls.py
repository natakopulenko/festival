from django.conf.urls import include, url
from django.contrib import admin
from apps.ajax import *

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/v1/countdown/$', CountView.as_view()),
    url(r'^api/v1/registration/$', RegisterView.as_view()),
    url(r'^$', 'core.views.home'),
    url(r'^ajax/templates/landing/', 'core.views.landing'),
]
