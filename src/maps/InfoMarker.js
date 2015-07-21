var L = require('leaflet');
var mapApi = require('./mapapi');
var MarkerForm = require('./MarkerForm');

var InfoMarker = L.Marker.extend({
    options: {},
    initialize: function initialize(latLng, map, options) {
        this.map = map;
        L.Marker.prototype.initialize.call(this, latLng, options);

        var that = this;
        this.on('click', function(e) {
            MarkerForm.show(that);
        });
    },
    save: function() {
        mapApi.saveMap(this.map);
    },
    del: mapApi.del
});

module.exports = InfoMarker;