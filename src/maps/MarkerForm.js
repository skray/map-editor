// var $ = require('jquery');
var Transparency = require('transparency');
var mapapi = require('./mapapi');
// $.fn.render = Transparency.jQueryPlugin;

function MarkerForm() {
    var container = document.getElementById('marker-form');
    var saveBtn = document.getElementById('marker-form-save');
    var cancelBtn = document.getElementById('marker-form-cancel');
    var formName = container.name;
    var currentMarker;
    
    init();

    function init() {
        saveBtn.addEventListener('click', save);
        cancelBtn.addEventListener('click', this.hide);
    }

    function save() {
        var form = document[formName];
        currentMarker['title'] = form['title'].value;
        currentMarker['date'] =  form['title'].value;
        currentMarker.setLatLng([form['latitude'].value, form['longitude'].value]);
        currentMarker['description'] = form['description'].value; 
        currentMarker.save();
    }

    function renderMarker(marker) {
        var directives = {
            latitude: {
                value: function() {
                    return this.getLatLng().lat;
                }
            },
            longitude: {
                value: function() {
                    return this.getLatLng().lng;
                }
            }
        };
        Transparency.render(container, marker, directives);
    }
    
    this.show = function show(marker) {
        currentMarker = marker;
        renderMarker(marker);
        container.classList.add('shown');
    };

    this.hide = function hide() {
        container.classList.remove('shown');
    };

    this.updateLatLng = function updateLatLng(latLng) {
        currentMarker.setLatLng(latLng);
        renderMarker(marker);
    };
}

module.exports = new MarkerForm();