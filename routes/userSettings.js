var express = require('express');
var router = express.Router();

function checkUserPass(res, sqlite3, sql, tempPass){
    sqlite3.db.all(sql, [], (error, results) => {
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        } else if (results[0].userPass == tempPass) {
            console.log("passwords match");
            res.redirect('/userSettings');
        } else {
            console.log("passwords don't match");
            res.redirect('/userSettings');
        }
    });
}

/*
function updateUserInfo(res, sqlite3, sql){
    console.log(sql);
    sqlite3.db.run(sql, [], (errors, results) => {
        if (errors) {
            throw errors;
            res.render('userSettings', {errors:errors});
        } else {
            console.log("update successful");
        }
    });
}
*/

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
	//var tempPass = req.body.Old_Password;
	var newPass = req.body.New_Password;

    let sql2 = `SELECT userPass `;
    sql2 += `FROM user `;
    sql2 += `WHERE email='` + global.email + `'`;

	let sql3 = `UPDATE user `;
    sql3 += `SET fname='` + fname + `',`;
    sql3 += `lname='` + lname + `',`;
    sql3 += `email='` + email + `',`;
    sql3 += `userPass='` + newPass + `' `;
    sql3 += `WHERE email='` + global.email + `'`;

    //checkUserPass(res, sqlite3, sql2, tempPass);

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
});

module.exports = router;