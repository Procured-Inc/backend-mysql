var express = require('express');
var router = express.Router();

/* GET rules page. */
router.get('/', function(req, res, next) {
    res.render('rules',{ testid: req.query.test_id,s_id:req.session.sid });
});

module.exports = router;
