var express = require('express');
var router = express.Router();

/* GET test page. */
router.get('/', function(req, res, next) {
    res.render('test',{test_id:req.session.testid});
});

module.exports = router;
