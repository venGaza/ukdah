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

        var dataKeys = [];

        for (i = 0; i < Object.keys(users[0]).length; i++) {
            if (i === Object.keys(users[0]).length - 1) {
                csv += Object.keys(users[0])[i] + '\n';
                dataKeys.push(Object.keys(users[0])[i]);
            }
            else {
                csv += Object.keys(users[0])[i] + ',';
                dataKeys.push(Object.keys(users[0])[i]);
            }
        }

        for (i = 0; i < length; i++){
            var end = 0;
            for (var key of Object.keys(users[i])) {
                
                var val = (users[i])[key];
                if (end == Object.keys(users[i]).length - 1){
                    csv += val + '\n';
                }
                else{
                    csv += val + ',';
                }
                end++;
            }
        }
        context.csv = csv;
        complete();
    });
};

function craftSQLStatement(req) {
    var numCalls = 0;
    var calls = [];
    var userTable = false,
        employeeTable = false,
        regionTable = false,
        awardsTable = false;
    var groupBy = ``;

    if (req.uIDC == "on") {
        if (req.uCountIDC == "on"){
            calls.push(`COUNT(user.userID)`);
        }
        else{
            calls.push(`user.userID`);
        }

        if (req.order_1 == 1){
            groupBy = `ORDER BY userID`;
        }
        userTable = true;
        numCalls++;
    }
    if (req.uFNC == "on") {
        if (req.uCountFNC == "on") {
            calls.push(`COUNT(user.fname) as 'user.fname'`);
        }
        else {
            calls.push(`user.fname as 'user.fname'`);
        }

        if (req.order_2 == 1) {
            groupBy = `ORDER BY user.fname`;
        }
        userTable = true;
        numCalls++;
    }
    if (req.uLNC == "on") {
        if (req.uCountLNC == "on") {
            calls.push(`COUNT(user.lname) as 'user.lname'`);
        }
        else {
            calls.push(`user.lname as 'user.lname'`);
        }

        if (req.order_3 == 1) {
            groupBy = `ORDER BY user.lname`;
        }
        userTable = true;
        numCalls++;
    }
    if (req.uEC == "on") {
        if (req.uCountEC == "on") {
            calls.push(`COUNT(user.email) as 'user.email'`);
        }
        else {
            calls.push(`user.email as 'user.email'`);
        }

        if (req.order_4 == 1) {
            groupBy = `ORDER BY user.email`;
        }
        userTable = true;
        numCalls++;
    }
    if (req.uACC == "on") {
        calls.push(`user.userDate`);
        if (req.uCountACC == "on") {
            calls.push(`COUNT(user.userDate)`);
        }
        else {
            calls.push(`user.userDate`);
        }

        if (req.order_5 == 1) {
            groupBy = `ORDER BY userDate`;
        }
        userTable = true;
        numCalls++;
    }
    if (req.uSC == "on") {
        if (req.uCountSC == "on") {
            calls.push(`COUNT(user.userSig)`);
        }
        else {
            calls.push(`user.userSig`);
        }

        if (req.order_6 == 1) {
            groupBy = `ORDER BY userSig`;
        }
        userTable = true;
        numCalls++;
    }
    if (req.uTC == "on") {
        if (req.uCountTC == "on") {
            calls.push(`COUNT(user.userTypeID)`);
        }
        else {
            calls.push(`user.userTypeID`);
        }

        if (req.order_7 == 1) {
            groupBy = `ORDER BY userSig`;
        }
        userTable = true;
        numCalls++;
    }
    if (req.uRC == "on") {
        if (req.uCountRC == "on") {
            calls.push(`COUNT(user.regID)`);
        }
        else {
            calls.push(`user.regID`);
        }

        if (req.order_8 == 1) {
            groupBy = `ORDER BY user.regID`;
        }
        userTable = true;
        numCalls++;
    }
    if (req.eIDC == "on") {
        if (req.eCountIDC == "on") {
            calls.push(`COUNT(employee.empID)`);
        }
        else {
            calls.push(`employee.empID`);
        }

        if (req.order_9 == 1) {
            groupBy = `ORDER BY employee.empID`;
        }
        employeeTable = true;
        numCalls++;
    }
    if (req.eFNC == "on") {
        if (req.eCountFNC == "on") {
            calls.push(`COUNT(employee.fname) as 'employee.fname'`);
        }
        else {
            calls.push(`employee.fname as 'employee.fname'`);
        }

        if (req.order_10 == 1) {
            groupBy = `ORDER BY employee.fname`;
        }
        employeeTable = true;
        numCalls++;
    }
    if (req.eLNC == "on") {
        if (req.eCountLNC == "on") {
            calls.push(`COUNT(employee.lname) as 'employee.lname'`);
        }
        else {
            calls.push(`employee.lname as 'employee.lname'`);
        }

        if (req.order_11 == 1) {
            groupBy = `ORDER BY employee.lname`;
        }
        employeeTable = true;
        numCalls++;
    }
    if (req.eEC == "on") {
        if (req.eCountEC == "on") {
            calls.push(`COUNT(employee.email) as 'employee.email'`);
        }
        else {
            calls.push(`employee.email as 'employee.email'`);
        }

        if (req.order_12 == 1) {
            groupBy = `ORDER BY employee.email`;
        }
        employeeTable = true;
        numCalls++;
    }
    if (req.rIDC == "on") {
        if (req.rCountIDC == "on") {
            calls.push(`COUNT(region.regID)`);
        }
        else {
            calls.push(`region.regID`);
        }

        if (req.order_13 == 1) {
            groupBy = `ORDER BY region.regID`;
        }
        regionTable = true;
        numCalls++;
    }
    if (req.rNC == "on") {
        if (req.rCountNC == "on") {
            calls.push(`COUNT(region.regName)`);
        }
        else {
            calls.push(`region.regName`);
        }

        if (req.order_14 == 1) {
            groupBy = `ORDER BY region.regName`;
        }
        regionTable = true;
        numCalls++;
    }
    if (req.aIDC == "on") {      
        if (req.aCountIDC == "on") {
            calls.push(`COUNT(award.awardID)`);
        }
        else {
            calls.push(`award.awardID`);
        }

        if (req.order_15 == 1) {
            groupBy = `ORDER BY award.awardID`;
        }
        awardsTable = true;
        numCalls++;
    }
    if (req.aNC == "on") {    
        if (req.aCountNC == "on") {
            calls.push(`COUNT(award.awardName)`);
        }
        else {
            calls.push(`award.awardName`);
        }

        if (req.order_16 == 1) {
            groupBy = `ORDER BY award.awardName`;
        }
        awardsTable = true;
        numCalls++;
    }
    if (req.aDC == "on") {
        if (req.aCountDC == "on") {
            calls.push(`COUNT(award.awardDesc)`);
        }
        else {
            calls.push(`award.awardDesc`);
        }

        if (req.order_17 == 1) {
            groupBy = `ORDER BY award.awardDesc`;
        }
        awardsTable = true;
        numCalls++;
    }

    let selectStatement = ``;
    for (i = 0; i < calls.length; i++) {
        if (i == calls.length - 1) {
            selectStatement += calls[i] + ` `;
        }
        else {
            selectStatement += calls[i] + `, `;
        }
    }

    let from = `user `;
    if (employeeTable) {
        from += ` JOIN employee ON user.userID == employee.userID `;
    }
    if (regionTable) {
        from += ` JOIN region ON user.regID == region.regID `;
    }
    if (awardsTable) {
        from += ` JOIN userAwards ON user.userID == userAwards.userID JOIN award ON userAwards.awardID == award.awardID `;
    }

    if (numCalls == 0){
        return `SELECT * FROM user`;
    }
    let sql = `SELECT ` + selectStatement + ` FROM ` + from + groupBy;
    return sql;
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
        case '9': {
            let sql9 = craftSQLStatement(req.query);
            getUsers(res, sqlite3, sql9, context, complete);
            csvData(res, sqlite3, sql9, context, complete);
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