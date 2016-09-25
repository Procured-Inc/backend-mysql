var express = require('express');
router = express.Router();
var connection = require('../connection/mysql');

// service for getting marks of a stusent by passing studentID
router.get('/', function(req, res, next) {
    connection.query('SELECT * from result_info', function (err, rows, fields) {
        res.send(rows);
    });
});
module.exports = router;