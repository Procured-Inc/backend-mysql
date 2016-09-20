var express = require('express');
router = express.Router();
var connection = require('../connection/mysql');


router.get('/', function(req, res, next) {
    connection.query('SELECT * from result_info', function (err, rows, fields) {
        res.send(rows);
    });
});
module.exports = router;