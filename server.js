const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const register = require('./routes/register')
const usersRouter = require('./routes/users')
const db = require('./database/db')
require('dotenv').config()
const port = 8000

const app = express()

// Middlewares
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.options('*', cors())

// Database

db.connect((err) => {
  err
    ? console.log('Error when trying to connect to database')
    : console.log('Succesfully connected to database')
})

// Routes
app.get('/', (req, res) => {
  res.send('Hello world!!!')
})

app.use('/', register)
app.use('/', usersRouter)

app.listen(port, () => console.log('Server listening on port ' + port))
