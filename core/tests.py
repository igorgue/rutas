from django.test import TestCase
from core.models import Place, Route

class Routes(TestCase):
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
