from django.conf.urls.defaults import patterns, url

urlpatterns = patterns('route.views',
    url(r'^/(?P<route_id>\d+)/?$', 'route', name="route"),
    url(r'^/?$', 'all_routes', name="all_routes"),
)
