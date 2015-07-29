var Map = require('./Map');
var mapapi = require('./mapapi');
var MarkerForm = require('./MarkerForm');
var InfoMarker = require('./InfoMarker');

var map;

init();

function init() {
    mapapi.getMap(getQueryParams().id)
        .then(buildMap);
}

function buildMap(mapResponse) {
    map = new Map(mapResponse);
    registerHandlers();
}

function registerHandlers() {
    map.slippyMap.on('draw:created', function (e) {
        var type = e.layerType,
            layer = e.layer;

        if (type === 'marker') {
            map.addMarker(e.layer.getLatLng());
        }

    });

    map.slippyMap.on('draw:edited', function drawEdited(e) {
        e.layers.eachLayer(function eachLayer(layer) {
            if(layer instanceof L.Polyline) {
                map.updateLine(layer.getLatLngs());
            }
        });    
    });
}

function getQueryParams() {
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if (typeof query_string[pair[0]] === "undefined") {
          query_string[pair[0]] = pair[1];
        } else if (typeof query_string[pair[0]] === "string") {
          var arr = [ query_string[pair[0]], pair[1] ];
          query_string[pair[0]] = arr;
        } else {
          query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
}