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
var drawnItems = new L.FeatureGroup();

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
            break;

    }

    // Initialise the FeatureGroup to store editable layers
    
    map.addLayer(drawnItems);

    // Initialise the draw control and pass it the FeatureGroup of editable layers
    var drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems
        }
    });
    map.addControl(drawControl);
}

function loadMarkers() {
    mapapi.list().then(function gotMarkers(data) {
        data.forEach(function eachMarker(marker) {
            addMarker(marker);
        });
    });
}


function addMarker(marker) {
    var layer = new L.marker([marker.latitude, marker.longitude], {draggable: true});
    layer.on('mousedown', function(e) {
        MarkerForm.show(marker);
    });

    layer.on('drag', function(e) {
        MarkerForm.updateLatLng(e.target.getLatLng());
    });

    layer.marker = marker;
    drawnItems.addLayer(layer);
}

function registerHandlers() {
    map.on('draw:created', function (e) {
        var type = e.layerType,
            layer = e.layer;

        if (type === 'marker') {
            var marker = {latitude: e.layer.getLatLng().lat, longitude: e.layer.getLatLng().lng};
            addMarker(marker);
            MarkerForm.show(marker);
        }
    });

    map.on('draw:deleted', function (e) {
        e.layers.eachLayer(function(layer) {
            mapapi.del(layer.marker);
        });
    });
}