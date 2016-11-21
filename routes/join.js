var express = require('express');
var connection = require('../connect');

var router = express.Router();


//set Join Request
router.post('/', function(req, res) {

	connection.config.debug = true;
	connection.query('INSERT INTO onepy_request SET ?', post, function(error, result){
		if (error) {
            console.log(error.message);
        } else {
            console.log('success');
        }
        res.redirect(req.get('referer'));
        //res.end();
	});
	
});

module.exports = router;
