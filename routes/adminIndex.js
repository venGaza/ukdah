var express = require('express');
var router = express.Router();

/* GET admin index page. */
router.get('/', function(req, res, next) {
  res.render('adminIndex', { title: 'Ukdah |  Employee Recognition Portal' });
});

module.exports = router;