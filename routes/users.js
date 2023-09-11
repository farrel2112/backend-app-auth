const express = require('express')
const router = express.Router()
const getUsers = require('../controllers/userController.js')

router.get('/api/v1/users', getUsers)

module.exports = router
