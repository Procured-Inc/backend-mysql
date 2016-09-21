var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var db = require('./model/db');
var question = require('./model/questions');

// for giving path in routes
var index = require('./routes/index');
var users = require('./routes/users');
var Registration = require('./routes/Registration');
var login = require('./routes/login');
var rules = require('./routes/rules');
var test = require('./routes/test');
var studentdata =require('./routes/studentdata');

var marks = require('./routes/marks');
var testdet = require('./routes/testdet');
var questions = require('./routes/questions');


var bcrypt = require('bcrypt-nodejs');

var app = express();

// mysql connection
/*var session = require('express-session')
 var MongoStore = require('connect-mongo')(session);*/
var connection=require('./connection/mysql');



var session = require('express-session');
/*var MongoStore = require('connect-mongo')(session);
var store = new MongoStore({
    url: 'localhost',
    db: 'session_db',
    collection: 'session'
});*/

/*
app.use(session({
    store: store,
    secret: 'dfjhsksdfdhfr879487',
    saveUninitialized: true,
    resave: true,
    cookie: {httpOnly: true, maxAge: 1000 * 60 * 60 * 2}
}));
*/


// khatm my sql connection


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', index);
app.use('/users', users);
app.use('/registration', Registration);
app.use('/rules', rules);
app.use('/login', login);
app.use('/test', test);
app.use('/studentdata',studentdata);
app.use('/marks', marks);
app.use('/testdetails', testdet);


// khatm my sql connection









app.post('/login_auth', function (reqs, response) {

    var post = reqs.body;
    console.log('sks', post.username);
    connection.query('SELECT pass_word from authentication where user_name=?', post.username, function (err, rows) {
        if (rows.length === 0)
            console.log('username invalid');


        else {
            console.log(rows);
            bcrypt.compare(post.password, rows[0].pass_word, function (err, res) {
                // res == true
                if (res) {
                    response.send('test start');
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
app.get('/result',function (err,res) {
    connection.query('SELECT student_info.first_name,student_info.contact_no,student_info.email_id,result_info.apti_marks,result_info.tech_marks from student_info,result_info where result_info.student_id=student_info.student_id', function (err, rows, fields) {
        res.send(rows);

    })
});
app.get('/data',function (err,res) {
    connection.query('SELECT * from student_info where student_id=?', '12345', function (err, rows, fields) {
        res.send(rows);
        console.log(rows.current_cgpa)
    })
});


//transporter for mail
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'info.procured@gmail.com', // Your email id
        pass: 'procured@123' // Your password
    }
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
