const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER_DATABASE,
    password: process.env.PASSWORD
});

connection.connect(function(err){
    if(err){
        throw err;
    }else{
        console.log("MySql database is connected succesfully");
    }
});

module.exports = connection;