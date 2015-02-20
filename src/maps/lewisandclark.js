var L = require('leaflet');
var mapapi = require('./mapapi');
var MarkerForm = require('./MarkerForm');
require('leaflet-draw');

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

    buildMap();
    registerHandlers();
    loadMarkers();

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
            map = L.map('map',{drawControl: true}).setView(center, initialZoom);

            L.tileLayer('http://{s}.tiles.mapbox.com/v3/seankennethray.map-zjkq5g6o/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 18
            }).addTo(map);
            break;

    }
}

function loadMarkers() {
    mapapi.list().then(function gotMarkers(data) {
        addMarkers(data);
    });
}


function addMarkers(markers) {
    markers.forEach(function eachMarker(marker) {
        var layer = new L.marker([marker.latitude, marker.longitude], {draggable: true});
        layer.on('click', function(e) {
            MarkerForm.show(marker);
        });
        layers.push(layer);
        map.addLayer(layer);
    })
}

function registerHandlers() {
    map.on('draw:created', function (e) {
        var type = e.layerType,
            layer = e.layer;

console.log(e);
        if (type === 'marker') {
            layer.draggable = true;
            MarkerForm.show({latitude: e.layer.getLatLng().lat, longitude: e.layer.getLatLng().lng});
        }

        // Do whatever else you need to. (save to db, add to map etc)
        map.addLayer(layer);
    });
}