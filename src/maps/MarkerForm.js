var $ = require('jquery');
var Transparency = require('transparency');
// $.fn.render = Transparency.jQueryPlugin;

var container = document.getElementById('marker-form');

function MarkerForm() {
    
    this.show = function show(marker) {
        console.log(marker);
        Transparency.render(container,marker);
        container.classList.add('shown');
    };

    this.hide = function hide() {
        container.classList.remove('shown');
    };

    this.save = function save() {

    };
}

module.exports = new MarkerForm();