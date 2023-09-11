const mysql = require('mysql2')
require('dotenv').config()

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_DATABASE,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
})

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'appAuth',
// })

module.exports = db
