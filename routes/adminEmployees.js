var express = require('express');
var router = express.Router();

function getEmployees(res, sqlite3, sql, context, complete){
    sqlite3.db.all(sql, [], (error, results) => {
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.users  = results;
        complete();
    });
}

function getRegions(res, sqlite3, sql, context, complete){
    sqlite3.db.all(sql, [], (error, results) => {
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.regions  = results;
        complete();
    });
}

/*GET all employees currently in the database*/
router.get('/',function(req, res, next){
    var callbackCount = 0;
    var context = {};
    var sqlite3 = req.app.get('sqlite3');
    let sql = `SELECT userID AS User_ID, fname AS First_Name, lname AS Last_Name, email AS Email FROM user`
    let sql2 = `SELECT regID, regName FROM region`
    getEmployees(res, sqlite3, sql, context, complete);
    getRegions(res, sqlite3, sql2, context, complete);
    function complete(){
        callbackCount++;
        if(callbackCount >= 2){
            res.render('adminEmployees', context);
        }
    }
});

/*Adds a user to the database*/
router.post('/', function(req, res){
    var sqlite3 = req.app.get('sqlite3');
    var sql = `INSERT INTO user (fname, lname, email, ins, txdate, doctor) VALUES (?, ?, ?, ?, ?, ?)`;
    var inserts = [req.body.fname, req.body.lname, req.body.pnum, req.body.insurance, req.body.txdate, req.body.doctor];
    sqlite3.db.run(sql, inserts, function(err) {
        if (err) {
          return console.log(err.message);
        } else{
            res.redirect('/adminEmployees');
        }
        console.log(`A row has been inserted`);
      });
});

/* DELETE a user from the database */
router.delete('/:id', function(req, res){
    var sqlite3 = req.app.get('sqlite3');
    let sql = `DELETE FROM user WHERE userID=?`;
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