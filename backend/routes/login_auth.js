/**
 * Created by Shubhampatidar on 9/19/2016.
 */
var express = require('express');
var app = express();
var bcrypt = require('bcrypt-nodejs');
var connection=require('../connection/mysql');
var studentdata=require('../routes/studentdata');

var login_auth= app.post('/', function (reqs, response) {

    var post = reqs.body;
    console.log(post.user_name)
    connection.query('SELECT pass_word from authentication where user_name=?', post.user_name, function (err, rows) {
        if (rows.length === 0)
            console.log('username invalid');


        else {
            console.log(rows)
            bcrypt.compare(post.password, rows[0].pass_word, function (err, res) {
                // res == true
                if (res) {
                    response.send('test start');
                    app.use('/studentdata',studentdata);
                    console.log('inside')
                    setTimeout(function() {
                        console.log('over')
                        response.send('/rules');
                    }, 4000)
                    /*reqs.session.user_id = post.user;
                     console.log(reqs.session)*/

                }
                else {
                    response.send('Bad user/pass');
                    console.log('u are in else')
                }
            });

        }

    });

});
module.exports=login_auth;