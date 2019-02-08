var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('generic', { title: 'Ukdah |  Employee recognition portal' });
});

module.exports = router;