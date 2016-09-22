var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('demo');
});

module.exports = router;
/**
 * Created by Shubhampatidar on 9/22/2016.
 */
