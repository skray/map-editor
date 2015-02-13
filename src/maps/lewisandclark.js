(function(L, MQ) {

    L.Icon.Default.imagePath = 'images';

    var center = [38.804967,-90.113183];
    var initialZoom = 11;
    var layers = [];
    var map;
    var current = 0;
    var markers;
    var layers;

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

        $.ajax({
            type: "GET",
            url: 'http://localhost:8080/markers',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(markers) {
                console.log(markers);
                addMarkers(markers);
            }
        });

        map.on('draw:created', function (e) {
            var type = e.layerType,
                layer = e.layer;

            console.log(e.layer.getLatLng());
            if (type === 'marker') {
                $.ajax({
                    type: "POST",
                    url: 'http://localhost:8080/markers',
                    data: JSON.stringify({latLng: [layer.getLatLng().lat, layer.getLatLng().lng]}),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function() {console.log('created');}
                });
                // Do marker specific actions
            }

            // Do whatever else you need to. (save to db, add to map etc)
            map.addLayer(layer);
        });
    }


    function addMarkers(markers) {
        removeLayers();

        for(var i=0; i < markers.length; i++) {
            layers.push(new L.marker(markers[i].latLng));
            map.addLayer(layers[i]);
        }
    }

    function removeLayers() {
        for(var i=0; i < layers.length; i++) {
            map.removeLayer(layers[i]);
        }

        layers = [];
    }

}(L, MQ));