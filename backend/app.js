var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
// for giving path in routes
var index = require('./routes/index');
var users = require('./routes/users');
var registration = require('./routes/registration');
var login_user = require('./routes/login_user');
var login_admin = require('./routes/login_admin');
var rules = require('./routes/rules');
var test = require('./routes/test');
var bcrypt = require('bcrypt-nodejs');
var complete=require('./routes/complete')
var studentdata=require('./routes/studentdata');
var signup = require('./routes/signup');
var demo = require('./routes/demo');
var login_auth=require('./routes/login_auth');
var connection=require('./connection/mysql');
var testid=require('./routes/testid');
var app = express();
var cors=require('cors');

// mysql connection

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

var session = require('express-session');
// console.log("session >> ", session)
var MongoStore = require('connect-mongo')(session);
// console.log("Mongostore obj >> ", MongoStore)
var store = new MongoStore({
    url: 'mongodb://178.33.132.20',
    db: 'session_db',
    collection: 'session'
});

app.use(session({
    store: store,
    secret: 'dfjhsksdfdhfr879487',
    saveUninitialized: true,
    resave: true,
    cookie: {httpOnly: true, maxAge: 1000 *10*10}
}));

app.use(cors());
app.use('/', index);
app.use('/registration', registration);
app.use('/rules', rules);
app.use('/login_user', login_user);
app.use('/login_admin', login_admin);
app.use('/test', test);
app.use('/studentdata', studentdata);
app.use('/login_auth',login_auth);
app.use('/signup',signup);
app.use('/complete',complete);
app.use('/demo',demo);
app.use('/testid',testid);

app.get('/result',function (err,res) {
    connection.query('SELECT student_info.first_name,student_info.contact_no,student_info.email_id,result_info.apti_marks,result_info.tech_marks from student_info,result_info where result_info.student_id=student_info.student_id', function (err, rows, fields) {
        res.send(rows);

    })
});



app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
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






/**
 * Module dependencies.
 */

module.exports = app;
