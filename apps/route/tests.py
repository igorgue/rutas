from django.test import TestCase

from route.models import Route
from place.models import Place

class RoutesTest(TestCase):
    def setUp(self):
        self.route = Route(name="Route 101")
        self.place1 = Place(name="Villa Venezuela")
        self.place2 = Place(name="Villa Libertad")

        self.route.save()
        self.place1.save()
        self.place2.save()

        self.route.places.add(self.place1, self.place2)

        self.route.save()

    def test_routes_adds_places(self):
        """
        Creating a route and adding a place to it
        """
        # Getting the object from the database
        route = Route.objects.get(name="Route 101")

        self.assertEqual(route.places.count(), 2)

    def test_add_place_from_route(self):
        """
        Test the method add_place
        """
        self.route.add_place("14 De Septiembre")
        self.route.save()

        self.assertEqual(self.route.places.count(), 3)

    def tearDown(self):
        Place.objects.all().delete()
        Route.objects.all().delete()
