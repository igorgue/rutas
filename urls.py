from django.conf.urls.defaults import patterns, include, url

# Enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Enable the admin:
    url(r'^admin', 'django.views.generic.simple.redirect_to', {'url': "/admin/"}),
    url(r'^admin/', include(admin.site.urls)),

    url(r'', include('home.urls')),
)
