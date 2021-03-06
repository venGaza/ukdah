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
        global.userID = "";
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
    var context = {};
    context.error = "Incorrect username or password";

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
        	res.render('login', context);
        } else {
        	console.log("Email found");
            global.userID = rows[0].userID;
        	global.fname = rows[0].fname;
        	global.lname = rows[0].lname;
        	global.email = rows[0].email;
            global.userPass = rows[0].userPass;
            global.date = rows[0].userDate;
            if (rows[0].userTypeID == 1) {
                res.redirect('/user');
            } else {
                res.redirect('/admin');
            }    
        }
	});
});

module.exports = router;