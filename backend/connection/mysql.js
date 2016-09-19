/**
 * Created by Shubhampatidar on 9/19/2016.
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    //port: '3306',
    user: 'root',
    password: '',
    database: 'procured'
});
connection.connect();
module.exports=connection;