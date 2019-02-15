var express = require('express');
var router = express.Router();

/* GET elements page. */
router.get('/', function(req, res, next) {
  var context = {};
  context.title = 'Ukdah |  Employee recognition portal';
  context.header = "alt";
  res.render('elements', context);
});

module.exports = router;