var express = require('express');
var router = express.Router();
var connection = require('../connection/mysql');

/* GET log in page. */
router.get('/', function(req, res, next) {
    var feed={
        new_user:req.query.YN,
        exprience:req.query.rate,
        feed:req.query.feedback
    }
    console.log(feed,req.query,req.body)
    var query1 = connection.query('INSERT INTO feedback SET ?', feed, function (err, result) {
        if (err) {
            console.log('feed query error', err);
        }

        else {
            console.log('feed query done');
        }
    });

});

module.exports = router;
