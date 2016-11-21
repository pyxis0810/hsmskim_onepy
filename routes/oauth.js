var express = require('express');
var router = express.Router();
var request = require('request');
var instagram = require('instagram-node-lib');

instagram.set('client_id', 'e40ba9339e1149fc84052fb1a5fb33a7');
instagram.set('client_secret', 'ebacde227a054b9bac5cbc8dd0c1f569');
//instagram.set('callback_url', 'http://localhost:8001/callback');
//instagram.set('redirect_uri', 'http://localhost:8001');
instagram.set('callback_url', 'http://www.1py.co.kr/callback');
instagram.set('redirect_uri', 'http://www.1py.co.kr');
instagram.set('maxSockets', 10);

var url = instagram.oauth.authorization_url({
	//scope: 'comments likes', // use a space when specifying a scope; it will be encoded into a plus
	//display: 'touch'
});



/* GET home page. */
router.get('/', function(req, res, next) {

	console.log(url);

	res.redirect(url);

});

module.exports = router;