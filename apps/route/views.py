import json

from django.http import HttpResponse
from django.shortcuts import get_object_or_404

from route.models import Route

def all_routes(request):
    """Return all the routes in a JSON array"""
    data = json.dumps([
        {
            'id': route.id,
            'name': route.name,
            'places': [
                {
                    'id': place.id,
                    'name': place.name
                }
                for place in route.places.all()
            ]
        }
        for route in Route.objects.all()
    ])

    return HttpResponse(data, mimetype="application/json")

def route(request, route_id):
    """Return a single route"""
    route = get_object_or_404(Route, id=route_id)
    data = json.dumps({
        'id': route.id,
        'name': route.name,
        'places': [
            {
                'id': place.id,
                'name': place.name
            }
            for place in route.places.all()
        ]
    })

    return HttpResponse(data, mimetype="application/json")
