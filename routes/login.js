var express = require('express');
var router = express.Router();

function isEmpty (obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

//login form
router.get('/', function(req, res) {
    if (global.email) {
        console.log("session");
        global.email = "";
        global.fname = "";
        global.lname = "";
        global.date = "";
        res.redirect('/');
    } else {
        console.log("no session");
        res.render('login');
    }
});

//login process
router.post('/', function(req, res) {
	var sqlite3 = req.app.get('sqlite3');
	var email = req.body.email;
	var password = req.body.password;

	//email query
	let query = `SELECT * `;
	query += `FROM user `;
	query += `WHERE email='` + email + `' `;
	query += `AND userPass='` + password + `' `;

	console.log(query);

	sqlite3.db.all(query, [], (errors, rows) => {
		if (errors) {
			throw errors;
            res.render('login', {errors:errors});
        } else if (isEmpty(rows)) {
        	console.log("Email not found");
        	res.render('login');
        } else {
        	console.log("Email found");
        	global.fname = rows[0].fname;
        	global.lname = rows[0].lname;
        	global.email = rows[0].email;
            global.userPass = rows[0].userPass;
        	global.date = rows[0].userDate;
        	res.redirect('/userIndex');
        }
	});
});

module.exports = router;