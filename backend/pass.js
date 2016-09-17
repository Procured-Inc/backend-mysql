var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'procured'
});

connection.connect();

var bcrypt = require('bcrypt-nodejs');
bcrypt.hash('bacon', 10, function(err, hash) {
    // Store hash in your password DB.
});
var post={
    user_name:'shubham',
    pass_word:hash
}
var query = connection.query('INSERT INTO authentication SET ?', post, function (err, result) {
    // Neat!
});/**
 * Created by Shubhampatidar on 9/14/2016.
 */
