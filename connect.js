var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hsmskim',
    password : 'khkh1919',
    database : 'onepy'
});

module.exports = connection;
