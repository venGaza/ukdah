var express = require('express');
var router = express.Router();

function isEmpty (obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

//register form
router.get('/', function(req, res) {
	res.render('createAccount');
});

//register process
router.post('/', function(req, res) {
	var sqlite3 = req.app.get('sqlite3');
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;

	//check if email exists
	let query = `SELECT * `;
	query += `FROM user `;
	query += `WHERE email='` + email + `'`;

	console.log(query);

	sqlite3.db.all(query, [], (errors, rows) => {
		if (errors) {
			throw errors;
            res.render('createAccount', {errors:errors});
        } else if (isEmpty(rows)) {
        	console.log("Valid");
        	//res.render('login');
        	//perform insert
        } else {
        	console.log("Email exists");
        	res.render('createAccount');
        }
	});
})

module.exports = router;