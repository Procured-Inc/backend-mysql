var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// for giving path in routes
var index = require('./routes/index');
var users = require('./routes/users');
var Registration = require('./routes/Registration');
var login = require('./routes/login');
var rules = require('./routes/rules');
var test = require('./routes/test');
var bcrypt = require('bcrypt-nodejs');
var app = express();
// mysql connection
/*var session = require('express-session')
 var MongoStore = require('connect-mongo')(session);*/
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '178.33.132.20',
    port: '3306',
    user: 'root',
    password: 'Incture_09132016',
    database: 'procured'
});

connection.connect();
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

// khatm my sql connection

app.post('/data', function (req, res) {
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

app.post('/student_data', function (req, res) {
    console.log('inside')
    var post = {
        first_name: req.body.first_name,
        //last_name: req.body.last_name,
       // dob: req.body.dob,
        email_id: req.body.ema_il,
        student_id: req.body.id,
        contact_no: req.body.contact_no,
        /*board10:req.body.board_10,
        yop10:req.body.yop_10,
        score10:req.body.marks_10,
        board12:req.body.board_12,
        yop12:req.body.yop_12,
        score12:req.body.marks_12,*/

    };
    console.log(post)
    var query = connection.query('INSERT INTO student_info SET ?', post, function (err, result) {
        // Neat!
        console.log('query done')
    });
});

app.post('/login_auth', function (reqs, res) {
    console.log(reqs.query)
    var post = reqs.body;
    console.log('u are in')
    console.log('sks', post.user)
    connection.query('SELECT pass_word from authentication where user_name=?', post.user, function (err, rows, fields) {
        if (rows.length == 0)
            console.log('username invalid');


        else {
            console.log(rows)
            bcrypt.compare(post.pass, rows[0].pass_word, function (err, res) {
                // res == true
                if (res) {
                    reqs.session.user_id = post.user;
                    console.log(reqs.session)

                }
                else {
                    res.send('Bad user/pass');
                    console.log('u are in else')
                }
            });

        }


    });

});
app.get('/data',function (err,res) {
    connection.query('SELECT * from student_info where student_id=?', '123', function (err, rows, fields) {
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
