const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const port = 8000
require('dotenv').config()

const app = express()

app.get('/', (req, res) => {
    res.send("Hello world!!!")
})

app.listen(port, () => console.log('Server listening on port ' + port))
