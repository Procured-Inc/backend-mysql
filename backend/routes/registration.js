var  express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:username', function(req, res, next) {
    console.log(req.params.username)
    if(req.params.username===req.session.username)
    res.render('registration', { email: req.params.username });
    else{
        res.send("Invalid");
    }
});

module.exports = router;
