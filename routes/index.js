var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (global.email) {
        console.log("session");
        res.redirect('/userIndex');
    } else {
    	console.log("no session");
        var context = {};
  		context.title = 'Ukdah |  Employee recognition portal';
  		context.header = "alt";
		res.render('index', context);
    }
});

module.exports = router;
