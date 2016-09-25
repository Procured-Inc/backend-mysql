var express = require('express');
var router = express.Router();

/* GET log in page. */
router.get('/', function(req, res, next) {
    var x = 'normal' ;
    //popup is for displaying alert is username is not present or password enterd is wrong
    x = req.session.popup ;
    console.log(req.session.popup)
    res.render('login_user',{ value: x });
});

module.exports = router;
