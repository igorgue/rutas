from django.db import models

class Place(models.Model):
    """
    Stores the places.

    e.g.: Villa Venezuela
    """
    name = models.CharField(max_length=255, unique=True, blank=True)

    def __unicode__(self):
        return self.name

    def add_route(self, name):
        """Adds a route from the model"""
        from route.models import Route

        if not Route.objects.filter(name=name).exists():
            route = Route(name=name)
            route.save()

            self.routes.add(route)
            self.save()
