var $ = require('jquery');
var Transparency = require('transparency');
var mapapi = require('./mapapi');
// $.fn.render = Transparency.jQueryPlugin;




function MarkerForm() {
    var container = document.getElementById('marker-form');
    var saveBtn = document.getElementById('marker-form-save');
    var formName = container.name;
    var currentMarker;
    
    init();

    function init() {
        saveBtn.addEventListener('click', save);
    }

    function save() {

        var form = document[formName];
        var marker = {};

        for(var i=0; i < form.elements.length; i++) {
            var el = form.elements[i];
            if(el.name && el.value) {
                marker[el.name] = el.value;
            }
        }
        Object.keys(marker).forEach(function(key,index) {
            currentMarker[key] = marker[key];
        });
        mapapi.save(marker);
    }
    
    this.show = function show(marker) {
        currentMarker = marker;
        Transparency.render(container,marker);
        container.classList.add('shown');
    };

    this.hide = function hide() {
        container.classList.remove('shown');
    };

    this.updateLatLng = function updateLatLng(latLng) {
        currentMarker.latitude = latLng.lat;
        currentMarker.longitude = latLng.lng;
        Transparency.render(container,currentMarker);
    };
}

module.exports = new MarkerForm();