var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if (global.email) {
        console.log("session");
        res.render('userSettings');
    } else {
        console.log("session not valid");
        res.redirect('/login');
    }
});

router.post('/', function(req, res) {
	var sqlite3 = req.app.get('sqlite3');
	var fname = req.body.First_Name;
	var lname = req.body.Last_Name;
	var email = req.body.Email;
	var oldPassword = req.body.Old_Password;
	var newPassword = req.body.New_Password;
	console.log(fname);
	console.log(lname);
	console.log(email);
	console.log(oldPassword);
	console.log(newPassword);

	let query = `UPDATE user `;
    query += `SET fname='` + fname + `',`;
    query += `lname='` + lname + `',`;
    query += `email='` + email + `',`;
    query += `userPass='` + newPassword + `' `;
    query += `WHERE email='` + global.email + `'`;

    console.log(query);

    sqlite3.db.run(query, [], (errors, rows) => {
		if (errors) {
			throw errors;
            res.render('userSettings', {errors:errors});
        } else {
        	console.log("update successful");
        	global.fname = fname;
        	global.lname = lname;
        	global.email = email;
        	res.redirect('/userIndex');
        }
	});
});

module.exports = router;