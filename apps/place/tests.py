from django.test import TestCase

from route.models import Route
from place.models import Place

class PlacesTest(TestCase):
    def setUp(self):
        self.route = Route(name="Route 101")
        self.place1 = Place(name="Villa Venezuela")
        self.place2 = Place(name="Villa Libertad")

        self.route.save()
        self.place1.save()
        self.place2.save()

        self.route.places.add(self.place1, self.place2)

        self.route.save()

    def test_places_can_get_route(self):
        """docstring for test_places_can_get_route"""
        place1 = Place.objects.get(name="Villa Venezuela")
        place2 = Place.objects.get(name="Villa Libertad")

        self.assertEqual(place1.routes.all()[0], self.route)
        self.assertEqual(place2.routes.all()[0], self.route)

    def test_add_route_from_place(self):
        self.place1.add_route("Ruta 112")
        self.place1.save()

        self.assertEqual(self.place1.routes.count(), 2)

    def tearDown(self):
        Place.objects.all().delete()
        Route.objects.all().delete()
