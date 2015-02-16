var $ = require('jquery');
var Transparency = require('transparency');
$.fn.render = Transparency.jQueryPlugin;

var container = $('#marker-form');

function MarkerForm() {
    
    console.log(container);

    this.show = function show(marker) {
        console.log(marker);
        container.render(marker);
        container.addClass('shown');
    };

    this.hide = function hide() {
        container.removeClass('shown');
    };
}

module.exports = new MarkerForm();