var mapapi = require('./maps/mapapi');
var Transparency = require('transparency');
var Firebase = require('firebase');

init();

function init() {
	mapapi.listMaps(function gotMaps(maps) { 
		console.log(maps.val());
		var directives = {
		    map: {
			    text: function() {
			        return this.value;
			    },
			    href: function(params) {
			        return "maps/edit.html?id=" + this.value;
			    }
			}
		};
		Transparency.render(document.getElementById('maps'), maps.val(), directives);
	});
}