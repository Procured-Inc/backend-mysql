var express = require('express');
var router = express.Router();

/* GET log in page. */
router.get('/', function(req, res, next) {
    //var x = req.session === undefined ? "no" : "yes";
    res.render('login_user');
});

module.exports = router;