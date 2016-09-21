/**
 * Created by Shubhampatidar on 9/19/2016.
 */
var express = require('express');
var router = express.Router();

/* GET log in page. */
router.get('/', function(req, res, next) {
    res.render('login_admin');
});

module.exports = router;
