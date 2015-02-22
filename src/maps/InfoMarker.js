var L = require('leaflet');
var mapApi = require('./mapapi');
var MarkerForm = require('./MarkerForm');

var InfoMarker = L.Marker.extend({
    options: {},
    initialize: function initialize(latLng, options) {
        L.Marker.prototype.initialize.call(this, latLng, options);

        this.on('click', function(e) {
            MarkerForm.show(marker);
            console.log(drawnItems);
        });
    },
    save: mapApi.save,
    del: mapApi.del
});

module.exports = InfoMarker;