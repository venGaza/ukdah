var express = require('express');
var router = express.Router();

// Returns all users 
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

// Returns employees for a specific user
function getUserEmployees(res, sqlite3, sql, inserts, context, complete){
    sqlite3.db.all(sql, inserts, (error, results) => {
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
               FROM employee e`; 
    getEmployees(res, sqlite3, sql, context, complete);
    function complete(){
        callbackCount++;
        if(callbackCount >= 1){
            res.render('adminEmployees', context);
        }
    }
});

/* GET employees for a specific user*/
router.get('/:id',function(req, res, next){
    var callbackCount = 0;
    var context = {};
    var sqlite3 = req.app.get('sqlite3');
    let sql = `SELECT empID AS Employee_ID, e.fname ||' '|| e.lname AS Employee_Name, e.email AS Employee_Email, \
                      u.fname ||' '|| u.lname AS User_Name \
                FROM employee e \
                INNER JOIN user u ON u.userID = e.userID \
                WHERE e.userID = ?`; 
    getUserEmployees(res, sqlite3, sql, req.params.id, context, complete);
    function complete(){
        callbackCount++;
        if(callbackCount >= 1){
            res.render('adminEmployees', context);
        }
    }
});

/* DELETE a user from the database */
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