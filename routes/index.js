var express = require('express');
var connection = require('../connect');
var router = express.Router();
var request = require('request');
var parseString = require('xml2js').parseString;
var instagram = require('instagram-node').instagram();

instagram.use({ access_token: '2084305522.467ede5.ca16029b92974e428ba0770abd9e4a4d' });
instagram.use({
	client_id: 'e40ba9339e1149fc84052fb1a5fb33a7',
	client_secret: 'ebacde227a054b9bac5cbc8dd0c1f569'
});

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: '1PY', data: 'test' });
});

router.get('/blog', function(req, res) {
	request.get({
		uri: 'http://blog.rss.naver.com/hsmskim.xml',
	}, function(error, response, body) {
		var xml = body;
		var json = null;
		parseString(xml, function(err, result) {
			json = result.rss.channel[0];
		})
		res.send(json);
	});
});

router.get('/instagram', function(req, res) {
	instagram.media_popular(function(err, medias, pagination, remaining, limit) {
		console.log(err);
		//res.send(medias);
	});
});

module.exports = router;
