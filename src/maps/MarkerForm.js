// var $ = require('jquery');
var Transparency = require('transparency');
var mapapi = require('./mapapi');
// $.fn.render = Transparency.jQueryPlugin;


var container = document.getElementById('marker-form');
var saveBtn = document.getElementById('marker-form-save');
var formName = container.name;
var currentMarker;

function MarkerForm() {

    init();

    function init() {
        saveBtn.addEventListener('click', save);
    }

    function save() {

        var form = document[formName];

        for(var i=0; i < form.elements.length; i++) {
            var el = form.elements[i];
            if(el.name && el.value) {
                currentMarker[el.name] = el.value;
            }
        }

        mapapi.save(currentMarker);
    }
    
    this.show = function show(marker) {
        console.log(marker);
        currentMarker = marker;
        Transparency.render(container,marker);
        container.classList.add('shown');
    };

    this.hide = function hide() {
        container.classList.remove('shown');
    };
}

module.exports = new MarkerForm();