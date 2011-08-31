from django.db import models

class Route(models.Model):
    """
    Stores the route.

    e.g.: Ruta 101
    """
    name = models.CharField(max_length=255, unique=True, blank=True)
    places = models.ManyToManyField('place.Place', related_name='routes', blank=True)

    def __unicode__(self):
        return self.name

    def add_place(self, name):
        """Adds a place from the route model"""
        from place.models import Place

        if not Place.objects.filter(name=name).exists():
            place = Place(name=name)
            place.save()

            self.places.add(place)
            self.save()
