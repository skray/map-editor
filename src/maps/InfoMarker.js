var L = require('leaflet');
var mapApi = require('./mapapi');
var MarkerForm = require('./MarkerForm');

var InfoMarker = L.Marker.extend({
    options: {},
    initialize: function initialize(data, map, options) {
        this.map = map;
        this.id = data.id;
        this.title = data.title;
        this.date = data.date;
        this.description = data.description;
        L.Marker.prototype.initialize.call(this, data.latLng, options);

        var that = this;
        this.on('click', function(e) {
            MarkerForm.show(that);
        });
    },
    serialize: function serialize() {
        return {
            id: this.id,
            title: this.title,
            date: this.date,
            latLng: this.getLatLng(),
            description: this.description
        };
    }
});

module.exports = InfoMarker;