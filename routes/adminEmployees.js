var express = require('express');
var router = express.Router();

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

/* GET admin index page. 
router.get('/', function(req, res, next) {
  res.render('adminEmployees', { title: 'Ukdah |  Employee Recognition Portal' });
});*/

/*GET all employees currently in the database*/
router.get('/',function(req, res, next){
    var callbackCount = 0;
    var context = {};
    var sqlite3 = req.app.get('sqlite3');
    let sql = `SELECT eID AS Employee_ID, fname AS First_Name, lname AS Last_Name, email AS Email FROM employee`
    getEmployees(res, sqlite3, sql, context, complete);
    function complete(){
        callbackCount++;
        if(callbackCount >= 1){
            res.render('adminEmployees', context);
        }
    }
});

module.exports = router;