var express = require('express');
var connection = require('../connect');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var path = require('path');
var fs = require('fs');
var shortid = require('shortid');
var dateFormat = require('dateformat');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	connection.query('SELECT id,title,name,content,location,date_format(date, "%Y-%m-%d") as date,img FROM onepy_review WHERE 1', 
		function(error, result){
			var response = [];
			for (var i in result) {
				result[i].content = result[i].content.substr(0, 50) + '...';
				response.push(result[i]);
			}

		res.render('review', { title: '1PY', data: response });
	});
});

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	connection.query('SELECT id,title,name,content,location,date_format(date, "%Y-%m-%d") as date,img FROM onepy_review WHERE id = ?',
		id, function(error, result){
			var response = [];
			for (var i in result) {
				//result[i].date = result[i].date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
				response.push(result[i]);
			}

			res.render('article', { title: '1PY', data: response });
	});
});

router.post('/',multipartMiddleware, function(req, res) {
	if(req.body.password == 'hsmskim') {
		fs.readFile(req.files.img.path, function(err, data){
			if(req.files.img.size > 0){
				var id = shortid.generate() + '.jpg';
				var filePath = path.join(__dirname, '../public/upload/', id);
				var uploadPath = '/upload/' + id;
				fs.writeFile(filePath, data, function(err){
					if (err) {
						throw err;
					} else {
						var post = {
							name: req.body.name,
							location: req.body.location,
							title: req.body.title,
							img: uploadPath,
							content: req.body.content
						};
						//connection.config.debug = true;
						connection.query('INSERT INTO onepy_review SET ?', post, function(error, result){
							if (error) {
					            console.log(error.message);
					        } else {
					            console.log('success');    
					        }
					        res.redirect(req.get('referer'));
						});
					}
				});
			} else {
				var uploadPath = '/upload/default.jpg';
				var post = {
					name: req.body.name,
					location: req.body.location,
					title: req.body.title,
					img: uploadPath,
					content: req.body.content
				};
				//connection.config.debug = true;
				connection.query('INSERT INTO onepy_review SET ?', post, function(error, result){
					if (error) {
			            console.log(error.message);
			        } else {
			            console.log('success');    
			        }
			        res.redirect(req.get('referer'));
				});
			}
		});
	} else {
		res.redirect(req.get('referer'));
	}
});

router.delete('/:id', function(req, res, next) {
	var id = req.params.id;
	connection.query('DELETE FROM onepy_review WHERE id = ?', id, function(error, result){
		res.redirect(req.get('referer'));
	});

});

module.exports = router;
