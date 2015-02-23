var L = require('leaflet');
var mapApi = require('./mapapi');
var MarkerForm = require('./MarkerForm');

var InfoMarker = L.Marker.extend({
    options: {},
    initialize: function initialize(marker, options) {
        L.Marker.prototype.initialize.call(this, [marker.latitude, marker.longitude], options);

        var that = this;
        this.on('click', function(e) {
            MarkerForm.show(that);
        });
    },
    save: mapApi.save,
    del: mapApi.del
});

module.exports = InfoMarker;