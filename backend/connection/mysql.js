// contains mysql connection
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '178.33.132.20',
    //port: '3306',
    user: 'root',
   password: 'Incture_09132016',
    //password: '',
    database: 'procured'
});
connection.connect();
module.exports=connection;