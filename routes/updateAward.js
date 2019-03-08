var express = require('express');
var router = express.Router();

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

router.get('/',function(req, res, next){
    var callbackCount = 0;
    var context = {};
    var sqlite3 = req.app.get('sqlite3');
    let sql = `SELECT certID AS Cert_ID, e.fname ||' '|| e.lname AS Employee, \
                    a.awardName AS Award_Name, a.awardDesc AS Award_Desc, \
                    awardDate AS Award_Date \
                FROM userAwards ua \
                INNER JOIN employee e ON e.empID=ua.empID \
                INNER JOIN award a ON a.awardID=ua.awardID \
                WHERE ua.userID='` + global.userID + `'`;
    getAwards(res, sqlite3, sql, context, complete);
    function complete(){
        callbackCount++;
        if(callbackCount >= 1){
            res.render('updateAward', context);
        }
    }
});

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