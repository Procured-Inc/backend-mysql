var express = require('express');
router = express.Router();
var connection = require('../connection/mysql');


router.get('/:', function(req, res, next) {
    connection.query('SELECT * from test_details', function (err, rows, fields) {
        res.send(rows);
    });
});
module.exports = router;