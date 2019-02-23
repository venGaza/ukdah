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
    if (global.email) {
        console.log("session");
        res.render('adminAccount',{
            First_Name: global.fname,
            Last_Name: global.lname,
            Email: global.email,
            Date: global.date
        });
    } else {
        console.log("session not valid");
        res.redirect('/login');
    }
});

module.exports = router;