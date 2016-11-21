var express = require('express');
var connection = require('../connect');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	connection.query('SELECT * FROM onepy_review ORDER BY id desc LIMIT 3', function(error, result){
		var response = [];

		if(error) {
			var obj = {};
	        obj.id = '100';
	        obj.name = '1PY';
	        obj.date = new Date();
	        obj.location = '기본위치';
	        obj.title = '이미지 로드 실패';
	        obj.img = '/upload/default.jpg';
	        obj.content = '이미지 로드에 실패했습니다. 시스템관리자에게 문의하세요.';

	        response.push(obj);

		} else {
			for (var i in result) {
				response.push(result[i]);
			}
		}
		res.render('index', { title: '1PY', data: response });
	})

});

module.exports = router;
