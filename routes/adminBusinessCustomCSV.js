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

function csvData(res, sqlite3, sql, context, complete) {
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

        csv = "";

        for (i = 0; i < Object.keys(users[0]).length; i++) {
            if (i === Object.keys(users[0]).length - 1) {
                csv += Object.keys(users[0])[i] + '\n';
            }
            else {
                csv += Object.keys(users[0])[i] + ',';
            }
        }

        for (i = 0; i < users.length; i++) {
            for (j = 0; j < Object.values(users[i]).length; j++) {
                if (j === Object.values(users[i]).length - 1) {
                    csv += Object.values(users[i])[j] + '\n';
                }
                else {
                    csv += Object.values(users[i])[j] + ',';
                }
            }
        }
        context.csv = csv;
        complete();
    });
};

router.get('/', function (req, res, next) {
    var callbackCount = 0;
    var context = {};
    context.query = req.query;
    var sqlite3 = req.app.get('sqlite3');

    let sql1 = `SELECT fname as First_Name, lname as Last_Name, COUNT(userAwards.empID) as Num_Awards FROM user
                JOIN userAwards
                ON user.userID = userAwards.userID
                GROUP BY userAwards.userID
                ORDER BY Num_Awards DESC;`;
    let sql2 = `SELECT regName as Region, COUNT(userAwards.userID) as Awards FROM region
                JOIN user
                ON region.regID = user.regID
                JOIN userAwards
                ON user.userID = userAwards.userID
                GROUP BY regName
                ORDER BY Awards DESC;`
    let sql3 = `SELECT * FROM user`;
    let sql4 = `SELECT * FROM employee`;
    let sql5 = `SELECT * FROM region`;
    let sql6 = `SELECT * FROM award`;
    let sql7 = `SELECT * FROM userAwards`;
    let sql8 = `SELECT * FROM userTypeID`;

    switch (req.query.table) {
        case '1': {
            getUsers(res, sqlite3, sql1, context, complete);
            csvData(res, sqlite3, sql1, context, complete);
            break;
        }
        case '2': {
            getUsers(res, sqlite3, sql2, context, complete);
            csvData(res, sqlite3, sql2, context, complete);
            break;
        }
        case '3': {
            getUsers(res, sqlite3, sql3, context, complete);
            csvData(res, sqlite3, sql3, context, complete);
            break;
        }
        case '4': {
            getUsers(res, sqlite3, sql4, context, complete);
            csvData(res, sqlite3, sql4, context, complete);
            break;
        }
        case '5': {
            getUsers(res, sqlite3, sql5, context, complete);
            csvData(res, sqlite3, sql5, context, complete);
            break;
        }
        case '6': {
            getUsers(res, sqlite3, sql6, context, complete);
            csvData(res, sqlite3, sql6, context, complete);
            break;
        }
        case '7': {
            getUsers(res, sqlite3, sql7, context, complete);
            csvData(res, sqlite3, sql7, context, complete);
            break;
        }
        case '8': {
            getUsers(res, sqlite3, sql8, context, complete);
            csvData(res, sqlite3, sql8, context, complete);
            break;
        }
        default: {
            res.render('adminBusiness', context);
            break;
        }
    }

    function complete() {
        callbackCount++;
        if (callbackCount >= 2) {
            res.render('adminBusinessCustomCSV', context);
        }
    }
});

module.exports = router;