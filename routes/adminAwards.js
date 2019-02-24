var express = require('express');
var router = express.Router();

// Returns all awards 
function getAwards(res, sqlite3, sql, context, complete){
    sqlite3.db.all(sql, [], (error, results) => {
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.awards  = results;
        complete();
    });
}

// Returns awards given by specific user 
function getUserAwards(res, sqlite3, sql, inserts, context, complete){
    sqlite3.db.all(sql, inserts, (error, results) => {
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.awards  = results;
        complete();
    });
}

/* GET all awards currently in the database*/
router.get('/',function(req, res, next){
    var callbackCount = 0;
    var context = {};
    var sqlite3 = req.app.get('sqlite3');
    let sql = `SELECT certID AS Cert_ID, awardDate AS Award_Date, u.fname ||' ' || u.lname AS User_Name, \
                    a.awardName AS Award_Name, e.fname ||' '|| e.lname AS Employee_Name \
               FROM userAwards ua \
               INNER JOIN user u ON ua.userID = u.userID \
               INNER JOIN award a ON a.awardID = ua.awardID \
               INNER JOIN employee e ON e.empID = ua.empID`;
    getAwards(res, sqlite3, sql, context, complete);
    function complete(){
        callbackCount++;
        if(callbackCount >= 1){
            res.render('adminAwards', context);
        }
    }
});

/* GET all awards given by a single user*/
router.get('/:id',function(req, res, next){
    var callbackCount = 0;
    var context = {};
    var sqlite3 = req.app.get('sqlite3');
    let sql = `SELECT certID AS Cert_ID, awardDate AS Award_Date, u.fname ||' ' || u.lname AS User_Name, \
                    a.awardName AS Award_Name, e.fname ||' '|| e.lname AS Employee_Name \
               FROM userAwards ua \
               INNER JOIN user u ON ua.userID = u.userID \
               INNER JOIN award a ON a.awardID = ua.awardID \
               INNER JOIN employee e ON e.empID = ua.empID
               WHERE ua.userID = ?`;
    let inserts = [req.params.id];
    getUserAwards(res, sqlite3, sql, inserts, context, complete);
    function complete(){
        callbackCount++;
        if(callbackCount >= 1){
            res.render('adminAwards', context);
        }
    }
});

/* DELETE an award from the database */
router.delete('/:id', function(req, res){
    var sqlite3 = req.app.get('sqlite3');
    let sql = `DELETE FROM userAwards WHERE certID=?`;
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