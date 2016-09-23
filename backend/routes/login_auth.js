/**
 * Created by Shubhampatidar on 9/19/2016.
 */
var express = require('express');
var app = express();
var bcrypt = require('bcrypt-nodejs');
var connection=require('../connection/mysql');
var registration=require('../routes/registration');





var login_auth= app.post('/', function (reqs, response) {

    var post = reqs.body;

///////////// check if username is present

    connection.query('SELECT pass_word from authentication where user_name=?', post.user_name, function (err, rows) {
        if (rows.length === 0)
            console.log('{ "message" : "username invalid" }');


        else {
            console.log(rows[0].pass_word);
            console.log(post.pass_word);
            bcrypt.compare(post.pass_word, rows[0].pass_word,function (err, res) {

                if(err)
                    console.log(err, res)
                if (res) {
                    //response.render(__dirname+ '/../views/registration');
                    reqs.session.username=post.user_name;
                    response.redirect('/registration/'+post.user_name)
                    console.log('{ "message" : "Authentication done" }');

                }
                else {
                    response.send('{ "message" : "username invalid" }');
                    console.log('u are in else')
                }
            });

        }

    });

});
module.exports=login_auth;