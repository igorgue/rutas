import json

from django.http import HttpResponse

def all_routes(request):
    """Return all the routes in a JSON array"""
    data = [
        {'id': 1, 'name': "Test route 1"},
        {'id': 2, 'name': "Test route 2"}
    ]

    return HttpResponse(json.dumps(data), mimetype="application/json")

def route(request, route_id):
    """Return a single route"""
    data = {'id': route_id, 'name': "Test place {0}".format(route_id)}

    return HttpResponse(json.dumps(data), mimetype="application/json")
