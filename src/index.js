var mapapi = require('./maps/mapapi');
var Transparency = require('transparency');

init();

function init() {
	mapapi.listMaps().then(function gotMaps(maps) { 
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
		Transparency.render(document.getElementById('maps'), maps, directives);
	});
}