var express = require('express');
var router = express.Router();

/* GET log in page. */
router.get('/', function(req, res, next) {
    res.render('rules');
});

module.exports = router;
