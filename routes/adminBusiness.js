var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var context = {};
    res.render('adminBusiness', context);

});

module.exports = router;