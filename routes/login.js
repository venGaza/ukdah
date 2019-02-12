var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('login', { 
		title: 'login' 
	});
});

//ss021119
router.post('/', function(req, res, next){
	var newUser = {
		email: req.body.email,
		password: req.body.password
	}

	console.log(newUser.email);
	console.log(newUser.password);

	//validation here

});

module.exports = router;