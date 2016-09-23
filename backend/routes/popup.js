/**
 * Created by Shubhampatidar on 9/23/2016.
 */
var  express = require('express');
var router = express.Router();

/* GET popups. */

router.get('/:message', function(req, res, next) {

        res.render('popup', { title: req.params.message });

});

module.exports = router;
