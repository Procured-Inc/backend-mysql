var express = require('express');
var router = express.Router();

/* GET log in page. */
router.get('/', function(req, res, next) {
    /*var x = 'normal' ;
    x = req.session.popup ;*/
    res.render('login_user');
});

module.exports = router;
