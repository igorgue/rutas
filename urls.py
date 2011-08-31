from django.conf.urls.defaults import patterns, include, url

# Enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Enable the admin:
    url(r'^admin/', include(admin.site.urls)),

    url(r'^places', include('place.urls')),
    url(r'^routes', include('route.urls')),
    url(r'', include('search.urls')),
)
