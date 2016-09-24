/**
 * Created by Shubhampatidar on 9/19/2016.
 */
var express = require('express');
var app = express();
var mysql = require('mysql');


var connection = require('../connection/mysql');
var bcrypt = require('bcrypt-nodejs');
var nodemailer = require('nodemailer');
var randomnumber = Math.floor((Math.random() * 100393) + 433334);
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'info.procured@gmail.com', // Your email id
        pass: 'procured@123' // Your password
    }
});


var signup = app.post('/', function (req, res) {

    //check weather email is registered

    connection.query('SELECT * from student_info where email_id=?', req.body.email, function (err, rows, fields) {
        if (rows.length != 0) {
            req.session.already = "yes";
            console.log('{ "message" : "email is already registered" }');
            res.render(__dirname + '/../views/alreadyregistered');
            console.log(rows)


        }

        else {
            //encypt password and store in db

            bcrypt.hash(randomnumber, null, null, function (error, hash) {
                // Store hash in your password DB.
                var post1 = {
                    user_name: req.body.email,
                    pass_word: hash
                }
                console.log('connection', hash);
                console.log(post1)
                var query = connection.query('INSERT INTO authentication SET ?', post1, function (err, result) {

                    if (err)
                        console.log(err);


                    else {
                        console.log('query1 done');
                    }
                });
                //Inserting mail and contact no in db
                var post2 = {
                    email_id: req.body.email,
                    contact_no: req.body.contact_no,
                    student_id: Math.floor((Math.random() * 1000) + 1)
                }
                console.log(post2);
                var query1 = connection.query('INSERT INTO student_info SET ?', post2, function (err, result) {
                    if (err) {
                        console.log('error 2', err);
                    }

                    else {
                        console.log('query2 done');
                    }
                });

            });
            // sending mail
            var link = "http://178.33.132.20:5000/login_user";

            var text = 'Hello your username is:  ' + req.body.email
                + '\n Your password is: ' + randomnumber +
                " \n Please complete ur profile before test by clicking on following link : \n \n " + link;


            var mailOptions = {
                from: 'shubham.apatidar111@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: 'Procured Registration', // Subject line
                text: text //, // plaintext body
                // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);

                } else {

                    res.render(__dirname + '/../views/thankyou');
                    console.log('{ "message" : "Signup Done" }');
                    //res.send('{ "message" : "Signup done!" }');
                }

            });
        }
    });
});
module.exports = signup;