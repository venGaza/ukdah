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
	if (global.email) {
        console.log("session");
        res.render('createAward');
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

router.post('/', function(req, res) {
    var sqlite3 = req.app.get('sqlite3');
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var awardDate = req.body.date;

    //get userID, empID, awardID

    /*
    let query = `INSERT INTO award `;
    query += `VALUES(?,`;
    query += `'` + userID + `',`;
    query += `'` + empID + `',`;
    query += `'` + awardID + `',`;
    query += `'` + awardDate + `')`;

    sqlite3.db.run(sql3, [], (errors, rows) => {
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
    */
});

module.exports = router;