var express = require('express');
var router = express.Router();

function getUsers(res, sqlite3, sql, context, complete) {
    sqlite3.db.all(sql, [], (error, results) => {
        var length = 0;
        if (error) {
            res.write(JSON.stringify(error));
            res.end();
        }
        results.forEach((result) => {
            length++;
        });
        var users = new Array(length);
        for (i = 0; i < length; i++) {
            users[i] = results[i];
        }
        context.createAward = JSON.stringify(users);
        context.users = results;
        complete();
    });
};

/* GET home page. */
router.get('/', function (req, res, next) {
    var callbackCount = 0;
    var context = {};
    var sqlite3 = req.app.get('sqlite3');
    let sql4 = `SELECT fname as First_Name, lname as Last_Name, COUNT(userAwards.empID) as Num_Awards FROM user
				JOIN userAwards
				ON user.userID = userAwards.userID
				GROUP BY userAwards.userID
				ORDER BY Num_Awards DESC;`
    getUsers(res, sqlite3, sql4, context, complete);
    function complete() {
        callbackCount++;
        if (callbackCount >= 1) {
            res.render('adminBusiness', context);
        }
    }
});

module.exports = router;