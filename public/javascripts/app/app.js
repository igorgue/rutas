(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  $(document).ready(function() {
    var Place, PlaceListView, PlaceView, Places, RutasNicas, SearchView, places;
    Place = (function() {
      __extends(Place, Backbone.Model);
      function Place() {
        Place.__super__.constructor.apply(this, arguments);
      }
      Place.prototype.defaults = {
        name: ""
      };
      return Place;
    })();
    Places = (function() {
      __extends(Places, Backbone.Collection);
      function Places() {
        Places.__super__.constructor.apply(this, arguments);
      }
      Places.prototype.model = Place;
      Places.prototype.url = "/places";
      return Places;
    })();
    places = new Places();
    PlaceView = (function() {
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
        $('.container').html(this.el);
        return this;
      };
      return PlaceView;
    })();
    PlaceListView = (function() {
      __extends(PlaceListView, Backbone.View);
      function PlaceListView() {
        PlaceListView.__super__.constructor.apply(this, arguments);
      }
      PlaceListView.prototype.tagName = "div";
      PlaceListView.prototype.className = "place-list-view";
      PlaceListView.prototype.initialize = function() {
        _.bindAll(this, 'render', 'renderPlaces');
        this.collection.bind('refresh', this.render);
        return this.collection.bind('add', this.renderPlace);
      };
      PlaceListView.prototype.render = function() {
        return this.placesViews.each(function(place) {
          return place.render();
        });
      };
      return PlaceListView;
    })();
    SearchView = (function() {
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
        $(this.el).html(this.template());
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
    RutasNicas = (function() {
      __extends(RutasNicas, Backbone.Router);
      function RutasNicas() {
        RutasNicas.__super__.constructor.apply(this, arguments);
      }
      RutasNicas.prototype.routes = {
        '': "home"
      };
      RutasNicas.prototype.initialize = function() {
        return this.searchView = new SearchView();
      };
      RutasNicas.prototype.home = function() {
        var $appContainer;
        $appContainer = $('#app-form');
        $appContainer.empty();
        $appContainer.append(this.searchView.render().el);
        return $('#main-search').focus();
      };
      return RutasNicas;
    })();
    return $(function() {
      var App;
      App = new RutasNicas();
      return Backbone.history.start();
    });
  });
}).call(this);
