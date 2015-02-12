(function(L, MQ) {

    L.Icon.Default.imagePath = 'images';

    var center = [38.804967,-90.113183];
    var initialZoom = 11;
    var layers = [];
    var map;
    var current = 0;

    init();

    function init() {

        buildMap('mapquest');

    }

    function buildMap(type) {
        switch(type) {
            case 'mapquest':
                map = L.map('map', {
                    drawControl: true,
                    layers: MQ.mapLayer(),
                    center: center,
                    zoom: initialZoom
                });
                break;
            default:
                map = L.map('map').setView(center, initialZoom);

                L.tileLayer('http://{s}.tiles.mapbox.com/v3/seankennethray.map-zjkq5g6o/{z}/{x}/{y}.png', {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    maxZoom: 18
                }).addTo(map);
        }

        map.on('draw:created', function (e) {
            var type = e.layerType,
                layer = e.layer;

            if (type === 'marker') {
                // Do marker specific actions
            }

            // Do whatever else you need to. (save to db, add to map etc)
            map.addLayer(layer);
        });
    }

}(L, MQ));