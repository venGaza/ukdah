var express = require('express');
var router = express.Router();

function isEmpty (obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('login', { 
		title: 'login' 
	});
});

//post request
router.post('/', function(req, res, next) {
	var sqlite3 = req.app.get('sqlite3');
	var newUser = {
		email: req.body.email,
		password: req.body.password
	}

	//console.log(newUser);
	console.log(newUser.email);
	console.log(newUser.password);

	//let sql = `SELECT [userID], [email]`;
	let sql = `SELECT [userID]`;
	sql += `FROM user WHERE email=?`;

	sqlite3.db.all(sql, [newUser.email], (error, results) => {
		if (error) {
            results.write(JSON.stringify(error));
            results.end();
        } else if (isEmpty(results)) { //
        	console.log("Email not found");
        } else {
        	console.log("Email found");
        	console.log(results);
        }

		//console.log(results[0].userID);
	});
	
	sqlite3.db.close()
});

module.exports = router;