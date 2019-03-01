var express = require('express');
var router = express.Router();

function isEmpty (obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

// Create regions object
function getRegions(res, sqlite3, sql, context, complete){
    sqlite3.db.all(sql, [], (error, results) => {
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.regions  = results;
        complete();
    });
}

// Create user types object
function getUserTypes(res, sqlite3, sql, context, complete){
    sqlite3.db.all(sql, [], (error, results) => {
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.userType = results;
        complete();
    });
}

router.get('/',function(req, res, next){
    var callbackCount = 0;
    var context = {};
    var sqlite3 = req.app.get('sqlite3');
    let sql2 = `SELECT regID, regName FROM region`
    let sql3 = `SELECT userTypeID FROM userTypeID`
    getRegions(res, sqlite3, sql2, context, complete);
    getUserTypes(res, sqlite3, sql3, context, complete);
    function complete(){
        callbackCount++;
        if(callbackCount >= 2){
            res.render('createAccount', context);
        }
    }
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
        	res.redirect('/userIndex');
        }
	});
})

module.exports = router;