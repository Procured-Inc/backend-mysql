/**
 * Created by Shubhampatidar on 9/19/2016.
 */
var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'info.procured@gmail.com', // Your email id
        pass: 'procured@123' // Your password
    }
});

var signup=app.post('/', function (req, res) {
    connection.query('SELECT * from student_info where email_id=?', req.body.email, function (err, rows, fields) {
        if (rows.length != 0){
            console.log('email is already registered');
        }

        else {

            bcrypt.hash(req.body.contact_no, null, null, callback)
            function callback(error, hash) {
                console.log('inside', hash)
                // Store hash in your password DB.
                var post1 = {
                    user_name: req.body.email,
                    pass_word: hash
                }
                console.log('connection', hash);
                var query1 = connection.query('INSERT INTO authentication SET ?', post1, function (err, result) {
                    if (err)
                        console.log(error);
                    else {
                        console.log(post1);
                    }
                });
            }

            // sending mail

            var text = 'Hello your username is:  ' + req.body.email
                + '\n Your password is: ' + req.body.contact_no;

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
                    res.sendFile(path.join(__dirname+'/public/images/thankyou.jpg'));
                }

            });
        }
    });
});
module.exports=signup;