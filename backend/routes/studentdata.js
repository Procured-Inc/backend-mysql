/**
 * Created by Shubhampatidar on 9/19/2016.
 */
var express = require('express');
var app = express();
//var router = express.Router();
var connection=require('../connection/mysql');

//router.route('/').post(function (req, res) {
var studentdata=app.post('/',function (req, res) {
    console.log('inside');
    var post = {
        first_name: req.body.first_name,
        //last_name: req.body.last_name,
        // dob: req.body.dob,
        email_id: req.body.ema_il,
        student_id: req.body.id,
        contact_no: req.body.contact_no
        /*board10:req.body.board_10,
         yop10:req.body.yop_10,
         score10:req.body.marks_10,
         board12:req.body.board_12,
         yop12:req.body.yop_12,
         score12:req.body.marks_12,*/

    };
    console.log(post);
    var query = connection.query('INSERT INTO student_info SET ?', post, function (err, result) {
        // Neat!
        console.log('query done');
        res.send('ho gaya');
    });
});
module.exports=studentdata;