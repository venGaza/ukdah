var express = require('express');
var router = express.Router();

function checkUserType(res, sqlite3, sql, adminUser){
    sqlite3.db.all(sql, [], (error, results) => {
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        } else if (results[0].userTypeID == adminUser) {
        	console.log("admin user");
            res.render('adminIndex');
        } else {
            console.log("normal user, unable to access admin console");
            res.redirect('/userIndex');
        }
    });
}

router.get('/', function(req, res, next) {
	if (global.email) {
        console.log("session");
        res.render('adminIndex');
        var sqlite3 = req.app.get('sqlite3');
        var adminUser = 2;

        let query = `SELECT userTypeID `;
        query += `FROM user `;
        query += `WHERE email='` + global.email + `'`;

        checkUserType(res, sqlite3, query, adminUser);
    } else {
        console.log("session not valid");
        res.redirect('/login');
    }
});

module.exports = router;