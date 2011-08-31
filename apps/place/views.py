import json

from django.http import HttpResponse
from django.shortcuts import get_object_or_404

from place.models import Place

def all_places(request):
    """Return all the places in a JSON array"""
    data = json.dumps([
        {
            'id': place.id,
            'name': place.name,
            'routes': [
                {
                    'id': route.id,
                    'name': route.name
                }
                for route in place.routes.all()
            ]
        }
        for place in Place.objects.all()
    ])

    return HttpResponse(data, mimetype="application/json")

def place(request, place_id):
    """Return a single place"""
    route = get_object_or_404(Place, id=place_id)
    data = json.dumps({
        'id': place.id,
        'name': place.name,
        'routes': [
            {
                'id': route.id,
                'name': route.name
            }
            for route in place.routes.all()
        ]
    })

    return HttpResponse(data, mimetype="application/json")
