var express = require('express');
var router = express.Router();

function checkUserType(res, sqlite3, sql, adminUser){
    sqlite3.db.all(sql, [], (error, results) => {
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        } else if (results[0].userTypeID == adminUser) {
        	console.log("admin user, unable to access awards");
        	res.redirect('/userIndex');
        } else {
            console.log("normal user");
            res.render('createAward');
        }
    });
}

router.get('/', function(req, res) {
	//assume session is valid
	var sqlite3 = req.app.get('sqlite3');
	var adminUser = 2;

	let query = `SELECT userTypeID `;
	query += `FROM user `;
	query += `WHERE email='` + global.email + `'`;

	checkUserType(res, sqlite3, query, adminUser);
});

module.exports = router;