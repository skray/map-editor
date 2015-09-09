var mapapi = require('./maps/mapapi');
var Transparency = require('transparency');
var Firebase = require('firebase');
var ref = new Firebase('https://amber-inferno-2147.firebaseio.com/');

document.getElementById('login').addEventListener('click', function onLoginClick() {
	ref.authWithOAuthPopup("github", function(error, authData) {
	  if (error) {
	    console.log("Login Failed!", error);
	  } else {
	    console.log("Authenticated successfully with payload:", authData);
	  }
	});	
});

document.getElementById('logout').addEventListener('click', function onLogoutClick() {
	ref.unauth();
});

document.getElementById('save').addEventListener('click', function saveData() {
	ref.set("I'm writing data", function(error) {
	  if (error) {
	    alert("Data could not be saved." + error);
	  } else {
	    alert("Data saved successfully.");
	  }
	});
});


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