(function() {
  $(document).ready(function() {
    window.Place = Backbone.Model.extend({
      defaults: {
        name: ""
      }
    });
    window.Places = Backbone.Collection.extend({
      model: Place,
      url: "/places"
    });
    window.places = new window.Places();
    window.PlaceView = Backbone.View.extend({
      tagName: "div",
      className: "place-view",
      template: _.template($('#place-template').html()),
      initialize: function() {
        return _.bindAll(this, 'render');
      },
      render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        $('.container').html(this.el);
        return this;
      }
    });
    window.PlaceListView = Backbone.View.extend({
      tagName: "div",
      className: "place-list-view",
      initialize: function() {
        _.bindAll(this, 'render', 'renderPlaces');
        this.collection.bind('refresh', this.render);
        return this.collection.bind('add', this.renderPlace);
      },
      render: function() {
        return this.placesViews.each(function(place) {
          return place.render();
        });
      }
    });
    window.SearchView = Backbone.View.extend({
      tagName: "div",
      className: "search-bar",
      template: _.template($('#search-template').html()),
      events: {
        'keyup #main-search': "search"
      },
      initialize: function() {
        return _.bindAll(this, 'render', 'search');
      },
      render: function() {
        $(this.el).html(this.template());
        return this;
      },
      search: function(key) {
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
      }
    });
    window.RutasNicas = Backbone.Router.extend({
      routes: {
        '': "home"
      },
      initialize: function() {
        return this.searchView = new window.SearchView();
      },
      home: function() {
        var $appContainer;
        $appContainer = $('#app-form');
        $appContainer.empty();
        $appContainer.append(this.searchView.render().el);
        return $('#main-search').focus();
      }
    });
    return $(function() {
      window.App = new RutasNicas();
      return Backbone.history.start();
    });
  });
}).call(this);
