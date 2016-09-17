var express = require('express');
var router = express.Router();

/* GET log in page. */
router.get('/', function(req, res, next) {
    res.render('test');
});

module.exports = router;
