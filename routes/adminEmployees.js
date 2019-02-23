var express = require('express');
var router = express.Router();

// Returns all users 
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

// Returns one user based on the given user ID
function getUser(res, sqlite3, sql, context, id, complete){ 
    var inserts = [id];
    sqlite3.db.all(sql, inserts, (error, results) => {
        if(error){
            res.write(JSON.stringify(error));
            res.end();
    }
        context.user = results[0];
        complete();
    });
}

// Returns all regions
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

// Returns all user types
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

/* GET all users currently in the database*/
router.get('/',function(req, res, next){
    var callbackCount = 0;
    var context = {};
    var sqlite3 = req.app.get('sqlite3');
    let sql = `SELECT userID AS User_ID, fname ||' '|| lname AS Full_Name, email AS Email, \
                      userPass AS Password, r.regName AS Region, t.UserType AS User_Type, \
                      userDate AS Date \
                FROM user u \
                INNER JOIN userTypeID t ON t.userTypeID = u.userTypeID \
                INNER JOIN region r ON r.regID = u.regID`; 
    let sql2 = `SELECT regID, regName FROM region`;
    let sql3 = `SELECT userTypeID FROM userTypeID`;
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

/* GET one user by ID*/
router.get('/:id',function(req,res, next){
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["updateUser.js", "selectedRegion.js", "selectedType.js"];
    var sqlite3 = req.app.get('sqlite3');
    let sql = `SELECT userID AS User_ID, fname ||' '|| lname AS Full_Name, email AS Email, \
                      userPass AS Password, r.regName AS Region, t.UserType AS User_Type, \
                      userDate AS Date, u.fname AS First_Name, u.lname AS Last_Name \
                FROM user u \
                INNER JOIN userTypeID t ON t.userTypeID = u.userTypeID \
                INNER JOIN region r ON r.regID = u.regID
                WHERE userID = ?`; 
    let sql2 = `SELECT regID, regName FROM region`;
    let sql3 = `SELECT userTypeID FROM userTypeID`;
    getUser(res, sqlite3, sql, context, req.params.id, complete);
    getRegions(res, sqlite3, sql2, context, complete);
    getUserTypes(res, sqlite3, sql3, context, complete);
    function complete(){
        callbackCount++;
        if(callbackCount >= 3){
            res.render('updateUser', context);
        }
    }
});

/* ADD a user to the database*/
router.post('/', function(req, res){
    var date = new Date();
    var sqlite3 = req.app.get('sqlite3');
    var sql = `INSERT INTO user (fname, lname, email, userPass, userTypeID, regID, userSig, userDate) \
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
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

/* Updates user information */
router.put('/:id', function(req, res){
    var date = new Date();
    var sqlite3 = req.app.get('sqlite3');
    var sql = `UPDATE user SET fname=?, lname=?, email=?, userPass=?, regID=?, userDate=? WHERE userID = ?`;
    var inserts = [req.body.fname, req.body.lname, req.body.email, req.body.password, req.body.region, date.getTime(), req.params.id];
    sqlite3.db.run(`UPDATE user SET fname=? WHERE userID=1`, ['Greg'], function(err) {
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.status(200);
            res.end();
        }
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