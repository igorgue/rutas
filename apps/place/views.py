import json

from django.http import HttpResponse

def all_places(request):
    """Return all the places in a JSON array"""
    data = [
        {'id': 1, 'name': "Test place 1"},
        {'id': 2, 'name': "Test place 2"}
    ]

    return HttpResponse(json.dumps(data), mimetype="application/json")

def place(request, place_id):
    """Return a single place"""
    data = {'id': place_id, 'name': "Test place {0}".format(place_id)}

    return HttpResponse(json.dumps(data), mimetype="application/json")
