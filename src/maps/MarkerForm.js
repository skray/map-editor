var $ = require('jquery');
var rivets = require('rivets');

var container = $('#marker-form');

function MarkerForm() {
    
    console.log(container);

    this.show = function show(marker) {
        rivets.bind(container[0], {marker: marker});
        container.addClass('shown');
    };

    this.hide = function hide() {
        container.removeClass('shown');
    };
}

module.exports = new MarkerForm();