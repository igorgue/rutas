$ ->
  class window.Place extends Backbone.Model
    defaults:
      name: ""

  class window.Places extends Backbone.Collection
    model: Place
    url: "/places"

  window.places = new Places()

  class window.PlaceView extends Backbone.View
    tagName: "div"
    className: "place-view"

    template: _.template($('#place-template').html())

    initialize: ->
      _.bindAll(@, 'render')

    render: ->
      $(@el).html(@template(@model.toJSON()))
      return @

  class window.PlaceListView extends Backbone.View
    tagName: "div"
    className: "place-list-view"

    initialize: ->
      _.bindAll(@, 'render')
      places.bind('all', @render, @)

      places.fetch()

    render: ->
      places.each (place) ->
        placeView = new PlaceView({model: place})
        $('#app-results').append(placeView.render().el)

      return @

  class window.SearchView extends Backbone.View
    tagName: "div"
    className: "search-bar"

    template: _.template($('#search-template').html())

    events:
      'keyup #main-search': "search"

    initialize: ->
      _.bindAll(@, 'render', 'search')

    render: ->
      $(@el).html(@template())

      $appContainer = $('#app-form')
      $appContainer.empty()
      $appContainer.append(@el)
      $('#main-search').focus()

      return @

    search: (key) ->
      text = $('#main-search').val()
      switch key.keyCode
        when 13 then console.log("Enter was pressed")
        else console.log("autocomplete")

      # We hide or show the twipsy.
      if text isnt ''
        $('#main-search-twipsy').fadeOut()
      else
        $('#main-search-twipsy').fadeIn()

  class window.RutasNicas extends Backbone.Router
    routes:
      '': "home"

    initialize: ->
      @placeListView = new PlaceListView()
      @searchView = new SearchView()

    home: ->
      @searchView.render()
      @placeListView.render()

  window.App = new RutasNicas()
  Backbone.history.start()
