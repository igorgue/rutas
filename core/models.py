from django.db import models

class Route(models.Model):
    """
    Stores the route.

    e.g.: Ruta 101
    """
    name = models.CharField(max_length=255, unique=True, blank=True)
    places = models.ManyToManyField('Place', related_name='routes', blank=True)

    def add_place(self, name):
        """Adds a place from the route model"""
        if not Place.objects.filter(name=name).exists():
            place = Place(name=name)
            place.save()

            self.places.add(place)
            self.save()

class Place(models.Model):
    """
    Stores the places.

    e.g.: Villa Venezuela
    """
    name = models.CharField(max_length=255, unique=True, blank=True)

    def add_route(self, name):
        """Adds a route from the model"""
        if not Route.objects.filter(name=name).exists():
            route = Route(name=name)
            route.save()

            self.routes.add(route)
            self.save()
