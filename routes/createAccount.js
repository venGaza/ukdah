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
	var email = req.body.email;
	var fname = req.body.fname;
	var lname = req.body.lname;
    var password = req.body.password;
    var date = new Date();
    var signature = '?';
    var type = 1;
    var region = 1;

    console.log(date);

    let query = `INSERT INTO user `;
    query += `VALUES(?,`;
    query += `'` + fname + `',`;
    query += `'` + lname + `',`;
    query += `'` + email + `',`;
    query += `'` + password + `',`;
    query += `'` + date + `',`;
    query += `'` + signature + `',`;
    query += `'` + type + `',`;
    query += `'` + region + `')`;

    console.log(query);

    sqlite3.db.run(query, [], (errors, rows) => {
		if (errors) {
			throw errors;
            res.render('createAccount', {errors:errors});
        } else {
        	console.log("insert successful");
        	res.redirect('/login');
        }
	});
})

module.exports = router;