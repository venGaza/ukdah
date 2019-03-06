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
    let sql2 = `SELECT empID, fname, lname, email FROM employee`
    let sql3 = `SELECT awardID, awardName, awardDesc FROM award`
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
    var userFname = global.fname;
    var userLname = global.lname;
    var employee = req.body.employee.split(",");
    var empID = employee[0];
    var empFname = employee[1];
    var empLname = employee[2];
    var empEmail = employee[3];
    var award = req.body.award.split(",");
    var awardID = award[0];
    var awardName = award[1];
    var awardDesc = award[2];
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
            myDoc.font('Times-Roman');
            myDoc.fontSize(29);
            myDoc.text(awardName, 0, 310, {
                width: 620,
                align: 'center'
            });
            myDoc.text(empFname + " " + empLname, 0, 450, {
                width: 620,
                align: 'center'
            });
            myDoc.fontSize(20);
            myDoc.text(awardDate, 320, 660, {
                width: 310,
                align: 'center' 
            });
            myDoc.text(userFname + " " + userLname, 0, 660, {
                width: 310,
                align: 'center' 
            });
            myDoc.pipe(fs.createWriteStream('./certificates/' + userID + '_' + awardID + '_' + awardDate + '.pdf'));
            myDoc.end();
            res.redirect('/userIndex');
        }
    });
});

module.exports = router;