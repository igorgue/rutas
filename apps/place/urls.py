from django.conf.urls.defaults import patterns, url

urlpatterns = patterns('place.views',
    url(r'/(?P<place_id>\d+)/?$', 'place', name="place"),
    url(r'/?$', 'all_places', name="all_places"),
)
