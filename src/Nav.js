var Firebase = require('firebase');
var ref = new Firebase('https://amber-inferno-2147.firebaseio.com/');

function Nav() {

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

}

module.exports = new Nav();

