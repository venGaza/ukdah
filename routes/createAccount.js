var express = require('express');
var router = express.Router();

//register form
router.get('/', function(req, res) {
	res.render('createAccount');
});

//register process
router.post('/createAccount', function(req, res) {
	//var sqlite3 = req.app.get('sqlite3');
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;

	/*
	if (errors) {
		res.render('createAccount', {
			errors:errors //pass along errors
		});
	} else {
		console.log('Submitted');
		res.redirect('login');
	}
	*/
})

module.exports = router;