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

function getUserTypes(res, sqlite3, sql, context, complete){
    sqlite3.db.all(sql, [], (error, results) => {
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.userType = results;
        complete();
    });
}

/*GET all employees currently in the database*/
router.get('/',function(req, res, next){
    var callbackCount = 0;
    var context = {};
    var sqlite3 = req.app.get('sqlite3');
    let sql = `SELECT userID AS User_ID, fname ||' '|| lname AS Full_Name, email AS Email, \
                      userPass AS Password, r.regName AS Region, t.UserType AS User_Type, \
                      userDate AS Date \
                FROM user u \
                INNER JOIN userTypeID t ON t.userTypeID = u.userTypeID \
                INNER JOIN region r ON r.regID = u.regID` 
    let sql2 = `SELECT regID, regName FROM region`
    let sql3 = `SELECT userTypeID FROM userTypeID`
    getEmployees(res, sqlite3, sql, context, complete);
    getRegions(res, sqlite3, sql2, context, complete);
    getUserTypes(res, sqlite3, sql3, context, complete);
    function complete(){
        callbackCount++;
        if(callbackCount >= 3){
            res.render('adminEmployees', context);
        }
    }
});

/*Adds a user to the database*/
router.post('/', function(req, res){
    var date = new Date();
    var sqlite3 = req.app.get('sqlite3');
    var sql = `INSERT INTO user (fname, lname, email, userPass, userTypeID, regID, userSig, userDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    var inserts = [req.body.fname, req.body.lname, req.body.email, req.body.password, req.body.userType, req.body.region, req.body.sig, date.getTime()];
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