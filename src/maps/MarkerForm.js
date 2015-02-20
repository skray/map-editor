var $ = require('jquery');
var Transparency = require('transparency');
var mapapi = require('./mapapi');
// $.fn.render = Transparency.jQueryPlugin;


var container = document.getElementById('marker-form');
var saveBtn = document.getElementById('marker-form-save');
var formName = container.name;

function MarkerForm() {

    init();

    function init() {
        saveBtn.addEventListener('click', save);
    }

    function save() {

        var form = document[formName];
        var marker = {};

        for(var i=0; i < form.elements.length; i++) {
            console.log(form.elements[i]);
            var el = form.elements[i];
            if(el.name && el.value) {
                marker[el.name] = el.value;
            }
        }

        mapapi.save(marker);
    }
    
    this.show = function show(marker) {
        Transparency.render(container,marker);
        container.classList.add('shown');
    };

    this.hide = function hide() {
        container.classList.remove('shown');
    };
}

module.exports = new MarkerForm();