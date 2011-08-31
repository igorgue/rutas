(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  $(function() {
    window.Place = (function() {
      __extends(Place, Backbone.Model);
      function Place() {
        Place.__super__.constructor.apply(this, arguments);
      }
      Place.prototype.defaults = {
        name: "",
        routes: []
      };
      return Place;
    })();
    window.Places = (function() {
      __extends(Places, Backbone.Collection);
      function Places() {
        Places.__super__.constructor.apply(this, arguments);
      }
      Places.prototype.model = Place;
      Places.prototype.url = "/places";
      return Places;
    })();
    window.places = new Places;
    window.Route = (function() {
      __extends(Route, Backbone.Model);
      function Route() {
        Route.__super__.constructor.apply(this, arguments);
      }
      Route.prototype.defaults = {
        name: "",
        places: []
      };
      return Route;
    })();
    window.Routes = (function() {
      __extends(Routes, Backbone.Collection);
      function Routes() {
        Routes.__super__.constructor.apply(this, arguments);
      }
      Routes.prototype.model = Route;
      Routes.prototype.url = "/routes";
      return Routes;
    })();
    window.routes = new Routes;
    window.PlaceView = (function() {
      __extends(PlaceView, Backbone.View);
      function PlaceView() {
        PlaceView.__super__.constructor.apply(this, arguments);
      }
      PlaceView.prototype.tagName = "div";
      PlaceView.prototype.className = "place-view";
      PlaceView.prototype.template = _.template($('#place-template').html());
      PlaceView.prototype.initialize = function() {
        return _.bindAll(this, 'render');
      };
      PlaceView.prototype.render = function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
      };
      return PlaceView;
    })();
    window.PlaceListView = (function() {
      __extends(PlaceListView, Backbone.View);
      function PlaceListView() {
        PlaceListView.__super__.constructor.apply(this, arguments);
      }
      PlaceListView.prototype.tagName = "div";
      PlaceListView.prototype.className = "place-list-view";
      PlaceListView.prototype.initialize = function() {
        _.bindAll(this, 'render');
        places.bind('all', this.render, this);
        return places.fetch();
      };
      PlaceListView.prototype.render = function() {
        places.each(function(place) {
          var placeView;
          placeView = new PlaceView({
            model: place
          });
          return $('#app-results').append(placeView.render().el);
        });
        return this;
      };
      return PlaceListView;
    })();
    window.RouteView = (function() {
      __extends(RouteView, Backbone.View);
      function RouteView() {
        RouteView.__super__.constructor.apply(this, arguments);
      }
      RouteView.prototype.tagName = "div";
      RouteView.prototype.className = "route-view";
      RouteView.prototype.template = _.template($('#route-template').html());
      RouteView.prototype.initialize = function() {
        return _.bindAll(this, 'render');
      };
      RouteView.prototype.render = function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
      };
      return RouteView;
    })();
    window.RouteListView = (function() {
      __extends(RouteListView, Backbone.View);
      function RouteListView() {
        RouteListView.__super__.constructor.apply(this, arguments);
      }
      RouteListView.prototype.tagName = "div";
      RouteListView.prototype.className = "route-list-view";
      RouteListView.prototype.initialize = function() {
        _.bindAll(this, 'render');
        places.bind('all', this.render, this);
        return routes.fetch();
      };
      RouteListView.prototype.render = function() {
        routes.each(function(route) {
          var routeView;
          routeView = new RouteView({
            model: route
          });
          return $('#app-results').append(routeView.render().el);
        });
        return this;
      };
      return RouteListView;
    })();
    window.SearchView = (function() {
      __extends(SearchView, Backbone.View);
      function SearchView() {
        SearchView.__super__.constructor.apply(this, arguments);
      }
      SearchView.prototype.tagName = "div";
      SearchView.prototype.className = "search-bar";
      SearchView.prototype.template = _.template($('#search-template').html());
      SearchView.prototype.events = {
        'keyup #main-search': "search"
      };
      SearchView.prototype.initialize = function() {
        return _.bindAll(this, 'render', 'search');
      };
      SearchView.prototype.render = function() {
        var $appContainer;
        $(this.el).html(this.template());
        $appContainer = $('#app-form');
        $appContainer.empty();
        $appContainer.append(this.el);
        $('#main-search').focus();
        return this;
      };
      SearchView.prototype.search = function(key) {
        var text;
        text = $('#main-search').val();
        switch (key.keyCode) {
          case 13:
            console.log("Enter was pressed");
            break;
          default:
            console.log("autocomplete");
        }
        if (text !== '') {
          return $('#main-search-twipsy').fadeOut();
        } else {
          return $('#main-search-twipsy').fadeIn();
        }
      };
      return SearchView;
    })();
    window.RutasNicas = (function() {
      __extends(RutasNicas, Backbone.Router);
      function RutasNicas() {
        RutasNicas.__super__.constructor.apply(this, arguments);
      }
      RutasNicas.prototype.routes = {
        '': "home"
      };
      RutasNicas.prototype.initialize = function() {
        this.routeListView = new RouteListView();
        return this.searchView = new SearchView();
      };
      RutasNicas.prototype.home = function() {
        this.searchView.render();
        return this.routeListView.render();
      };
      return RutasNicas;
    })();
    window.App = new RutasNicas();
    return Backbone.history.start();
  });
}).call(this);
