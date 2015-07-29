var L = require('leaflet');
var InfoMarker = require('./InfoMarker');
var MarkerForm = require('./MarkerForm');
var mapapi = require('./mapapi');

require('leaflet-draw');
L.Icon.Default.imagePath = 'images';

var MAX_ZOOM = 18;

function Map(mapData) {
	var that = this;

	// pull off relevant info
	this.id = mapData.id;
	this.line = mapData.line || [];
	this.markers = mapData.markers || [];
	this.name = mapData.name || '';
	this.center = mapData.center || [0, 0];
	this.zoom = mapData.zoom || 1;

	// build slippy map and layers
	this.slippyMap = createSlippyMap(mapData.center, mapData.zoom);
    this.drawnItems = new L.FeatureGroup();

	this.slippyMap.addLayer(this.drawnItems);
	this.drawnItems.addLayer(new L.polyline(mapData.line));

    mapData.markers.forEach(function addEm(latLng, i, arr) {
        arr[i] = that.addMarker(latLng);
    });

	// Initialise the draw control and pass it the FeatureGroup of editable layers
	this.slippyMap.addControl(
		new L.Control.Draw({
		    draw: {
		    	polyline: false,
		    	polygon: false,
		    	rectangle: false,
		    	circle: false,
		        marker: {
		            repeatMode: true
		        }
		    },
		    edit: {
		        featureGroup: this.drawnItems
		    }
		})
	);

}

Map.prototype.addMarker = function addMarker(latLng) {
	var marker = new InfoMarker(latLng, this, {draggable: true})
	this.markers.push(marker);
    this.drawnItems.addLayer(marker);
    MarkerForm.show(marker);
};

Map.prototype.updateLine = function updateLine(lineLatLngs) {
	this.line = lineLatLngs;
	this.save();
};

Map.prototype.save = function save() {
	mapapi.saveMap(this.serialize);	
};

Map.prototype.serialize = function serialize() {
	var justLatLngs = [];
	this.markers.forEach(function(marker) {
	    justLatLngs.push([marker.getLatLng().lat, marker.getLatLng().lng]);
	});

	var serializedMap = {
		id: this.id,
		name: this.name,
		center: this.center,
		zoom: this.zoom,
		line: this.line,
		markers: justLatLngs
	};

	return serializedMap;
};

function createSlippyMap(center, zoom) {
	var map = L.map('map').setView(center, zoom);

	L.tileLayer('http://{s}.tiles.mapbox.com/v3/seankennethray.map-zjkq5g6o/{z}/{x}/{y}.png', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: MAX_ZOOM
	}).addTo(map);

	return map;
}

module.exports = Map;