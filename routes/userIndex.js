var express = require('express');
var router = express.Router();

function getUserInfo(res, sqlite3, sql, context, complete){
    sqlite3.db.all(sql, [], (error, results) => {
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.users = results;
        console.log(context.users);
        complete();
    });
}

router.get('/', function(req, res) {
	res.render('userIndex',{
        First_Name: global.fname,
        Last_Name: global.lname,
        Email: global.email,
        Date: global.date
    });
    /*
	var sqlite3 = req.app.get('sqlite3');
	var callbackCount = 0;
    var context = {};
    let query = `SELECT [fname] AS First_Name FROM user WHERE email=?`;


    let sql = `SELECT [fname] AS First_Name`;
	sql += `FROM user WHERE userID=?`;
    getUserInfo(res, sqlite3, sql, context, complete);
    */
    /*
    var context = {First_Name: BLAH};
    function complete(){
        callbackCount++;
        if(callbackCount >= 1){
            res.render('userIndex', context);
        }
    }
    */
	//sqlite3.db.close();
});

module.exports = router;