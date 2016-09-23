var express = require('express');
var router = express.Router();

/* GET complete page. */
router.get('/', function(req, res, next) {
    res.render('complete');
});

module.exports = router;
