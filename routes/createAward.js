var express = require('express');
var pdf = require('pdfkit');
var fs = require('fs');
var router = express.Router();

// Create employees object
function getEmployees(res, sqlite3, sql, context, complete){
    sqlite3.db.all(sql, [], (error, results) => {
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.employees  = results;
        complete();
    });
}

// Create award object
function getAwards(res, sqlite3, sql, context, complete){
    sqlite3.db.all(sql, [], (error, results) => {
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.awards = results;
        complete();
    });
}

router.get('/',function(req, res, next){
    var callbackCount = 0;
    var context = {};
    var sqlite3 = req.app.get('sqlite3');
    let sql2 = `SELECT empID, fname FROM employee`
    let sql3 = `SELECT awardID, awardName FROM award`
    getEmployees(res, sqlite3, sql2, context, complete);
    getAwards(res, sqlite3, sql3, context, complete);
    function complete(){
        callbackCount++;
        if(callbackCount >= 2){
            res.render('createAward', context);
        }
    }
});


router.post('/', function(req, res) {
    var sqlite3 = req.app.get('sqlite3');
    var userID = global.userID;
    var awardID = req.body.award;
    var empID = req.body.employee;
    var awardDate = req.body.date;
    var myDoc = new pdf;

    let query = `INSERT INTO userAwards `;
    query += `VALUES(?,`;
    query += `'` + userID + `',`;
    query += `'` + empID + `',`;
    query += `'` + awardID + `',`;
    query += `'` + awardDate + `')`;

    console.log(query);

    sqlite3.db.run(query, [], (errors, rows) => {
        if (errors) {
            throw errors;
            res.render('createAward', {errors:errors});
        } else {
            console.log("insert successful");
            myDoc.image('./public/images/certificateTemplate.jpg', 0, 0, {
                height: 800,
                width: 620
            });
            myDoc.pipe(fs.createWriteStream('./certificates/' + userID + '_' + awardID + '.pdf'));
            myDoc.end();
            res.redirect('/userIndex');
        }
    });
});

module.exports = router;