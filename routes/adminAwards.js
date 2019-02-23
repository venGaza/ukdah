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

/* GET all awards currently in the database*/
router.get('/',function(req, res, next){
    var callbackCount = 0;
    var context = {};
    var sqlite3 = req.app.get('sqlite3');
    let sql = `SELECT awardID AS Award_ID, awardName AS Name, awardDesc AS Desc FROM award`; 
    getAwards(res, sqlite3, sql, context, complete);
    function complete(){
        callbackCount++;
        if(callbackCount >= 1){
            res.render('adminAwardTypes', context);
        }
    }
});

module.exports = router;