$(document).ready ->

  window.Place = Backbone.Model.extend
    defaults:
      name: ""

  window.Places = Backbone.Collection.extend
    model: Place
    url: "/places"

  window.places = new window.Places()

  window.PlaceView = Backbone.View.extend
    tagName: "div"
    className: "place-view"

    template: _.template($('#place-template').html())

    initialize: ->
      _.bindAll(@, 'render')

    render: ->
      $(@el).html(@template(@model.toJSON()))
      $('.container').html(@el)
      return @

  window.PlaceListView = Backbone.View.extend
    tagName: "div"
    className: "place-list-view"

    initialize: ->
      _.bindAll(@, 'render', 'renderPlaces')
      @collection.bind('refresh', @render)
      @collection.bind('add', @renderPlace)

    render: ->
      @placesViews.each (place) ->
        place.render()

  window.SearchView = Backbone.View.extend
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

  window.RutasNicas = Backbone.Router.extend
    routes:
      '': "home"

    initialize: ->
      #@placeListView = new PlaceView(
        #collection: window.places
      #)
      @searchView = new window.SearchView()

    home: ->
      $appContainer = $('#app-form')
      $appContainer.empty()
      $appContainer.append(@searchView.render().el)
      $('#main-search').focus()

  $ ->
    window.App = new RutasNicas()
    Backbone.history.start()
