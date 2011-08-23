$(document).ready ->

  class Place extends Backbone.Model
    defaults:
      name: ""

  class Places extends Backbone.Collection
    model: Place
    url: "/places"

  places = new Places()

  class PlaceView extends Backbone.View
    tagName: "div"
    className: "place-view"

    template: _.template($('#place-template').html())

    initialize: ->
      _.bindAll(@, 'render')

    render: ->
      $(@el).html(@template(@model.toJSON()))
      $('.container').html(@el)
      return @

  class PlaceListView extends Backbone.View
    tagName: "div"
    className: "place-list-view"

    initialize: ->
      _.bindAll(@, 'render', 'renderPlaces')
      @collection.bind('refresh', @render)
      @collection.bind('add', @renderPlace)

    render: ->
      @placesViews.each (place) ->
        place.render()

  class SearchView extends Backbone.View
    tagName: "div"
    className: "search-bar"

    template: _.template($('#search-template').html())

    events:
      'keyup #main-search': "search"

    initialize: ->
      _.bindAll(@, 'render', 'search')

    render: ->
      $(@el).html(@template())
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

  class RutasNicas extends Backbone.Router
    routes:
      '': "home"

    initialize: ->
      #@placeListView = new PlaceView(
        #collection: places
      #)
      @searchView = new SearchView()

    home: ->
      $appContainer = $('#app-form')
      $appContainer.empty()
      $appContainer.append(@searchView.render().el)
      $('#main-search').focus()

  $ ->
    App = new RutasNicas()
    Backbone.history.start()
