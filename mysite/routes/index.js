var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login',  {result: "true"});
});

// router.get('/:id', function(req, res, next) {

//   res.render('login', {result: "true"});
// });










module.exports = router;
