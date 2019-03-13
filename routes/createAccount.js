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

// Create Ukdah account and redirect to login page
router.post('/', function(req, res) {
	var sqlite3 = req.app.get('sqlite3');
	var email = req.body.email;
	var fname = req.body.fname;
	var lname = req.body.lname;
    var password = req.body.password;
    var signature = req.body.sig;
    var type = req.body.type;
    var region = req.body.region;

    var sql = `INSERT INTO user (fname, lname, email, userPass, userTypeID, regID, userSig) \
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
    var inserts = [fname, lname, email, password, type, region, signature]

    console.log(sql);

    sqlite3.db.run(sql, inserts, (errors, rows) => {
		if (errors) {
			throw errors;
        } else {
        	console.log("insert successful");
        	res.redirect('/user');
        }
	});
})

module.exports = router;