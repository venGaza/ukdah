var express = require('express');
var router = express.Router();

// Returns all users 
function getEmployees(res, sqlite3, sql, id, context, complete){
    sqlite3.db.all(sql, id, (error, results) => {
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.employees  = results;
        complete();
    });
}

/* GET all employees currently in the database*/
router.get('/',function(req, res, next){
    var callbackCount = 0;
    var context = {};
    var sqlite3 = req.app.get('sqlite3');
    let sql = `SELECT empID AS Employee_ID, fname ||' '|| lname AS Employee_Name, email AS Employee_Email \
               FROM employee e \
               WHERE userID = ?`; 
    var id = global.userID;
    getEmployees(res, sqlite3, sql, id, context, complete);
    function complete(){
        callbackCount++;
        if(callbackCount >= 1){
            res.render('userEmployees', context);
        }
    }
});

/* ADD an employee to the database*/
router.post('/', function(req, res){
    var sqlite3 = req.app.get('sqlite3');
    var sql = `INSERT INTO employee (userID, fname, lname, email) \
               VALUES (?, ?, ?, ?)`;
    var inserts = [global.userID, req.body.fname, req.body.lname, req.body.email];
    sqlite3.db.run(sql, inserts, function(err) {
        if (err) {
          return console.log(err.message);
        } else{
            res.redirect('/user/employees');
        }
        console.log(`A row has been inserted`);
    });
});

/* DELETE an employee from the database */
router.delete('/:id', function(req, res){
    var sqlite3 = req.app.get('sqlite3');
    let sql = `DELETE FROM employee WHERE empID=?`;
    var id = [req.params.id];
    sqlite3.db.run(sql, id, function(err) {
        if (err) {
          return console.error(err.message);
        } else{
            res.status(202).end();
        }
        console.log(`Row deleted`);
    });
})

module.exports = router;