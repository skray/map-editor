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
	this.markers = [];
	this.name = mapData.name || '';
	this.center = mapData.center || [0, 0];
	this.zoom = mapData.zoom || 1;

	// build slippy map and layers
	this.slippyMap = createSlippyMap(mapData.center, mapData.zoom);
    this.drawnItems = new L.FeatureGroup();
    this.line = new L.polyline(mapData.line)

	this.slippyMap.addLayer(this.drawnItems);
	this.drawnItems.addLayer(this.line);
	this.markerLayer = new L.FeatureGroup();
	this.drawnItems.addLayer(this.markerLayer);

    mapData.markers.forEach(function addEm(markerData, i, arr) {
        arr[i] = that.addMarker(markerData);
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

Map.prototype.addMarker = function addMarker(markerData) {
	var marker = new InfoMarker(markerData, this, {
		draggable: true,
		icon: createCampfireIcon(this.slippyMap.getZoom())
	});
	this.markers.push(marker);
    this.markerLayer.addLayer(marker);
    MarkerForm.show(marker);
};

Map.prototype.updateLine = function updateLine(lineLatLngs) {
	this.line = lineLatLngs;
	this.save();
};

Map.prototype.save = function save() {
	mapapi.saveMap(this.serialize());	
};

Map.prototype.serialize = function serialize() {
	var serializedMarkers = [];
	this.markers.forEach(function serializeMarkers(marker) {
	    serializedMarkers.push(marker.serialize());
	});

	var serializedMap = {
		id: this.id,
		name: this.name,
		center: this.center,
		zoom: this.zoom,
		line: this.line,
		markers: serializedMarkers
	};

	return serializedMap;
};

Map.prototype.resizeIcons = function resizeIcons() {
	var zoom = this.slippyMap.getZoom();
	this.markerLayer.eachLayer(function eachMarker(marker) {
		marker.setIcon(createCampfireIcon(zoom));
	});
};

function createSlippyMap(center, zoom) {
	var map = L.map('map').setView(center, zoom);

	L.tileLayer('http://{s}.tiles.mapbox.com/v3/seankennethray.map-zjkq5g6o/{z}/{x}/{y}.png', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a><br>'+
	                 '<a href="https://thenounproject.com/search/?q=campfire&i=15120">“Campfire”</a> icon by Pavel N. from <a href="http://thenounproject.com">the Noun Project.</a><br>'+
	                 'Campsite locations provided by <a href="https://www.google.com/maps/d/viewer?mid=zgLi8Vih7akA.kvuzH9irSVwg">Lewis and Clark Westbound Part 1</a>',
	    maxZoom: MAX_ZOOM
	}).addTo(map);

	return map;
}

function createCampfireIcon(zoom) {
	var scale = zoom*zoom*0.02;
	return new L.Icon({
		iconUrl:'images/campfire.svg', 
		iconSize: [Math.floor(30*scale), Math.floor(30*scale)], 
		iconAnchor: [Math.floor(15*scale),Math.floor(20*scale)]
	});
}

module.exports = Map;