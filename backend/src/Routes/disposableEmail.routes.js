const express = require('express')
const route = express.Router()
const authMiddleware = require("../middlewares/Auth.middleware")
const disposableEmailController = require('../controllers/disposableEmail.controller')

route.get('/create-disposableEmail' , authMiddleware.authMid , disposableEmailController.CreateDisposableEmail)
route.post('/get-disposableEmailInbox' , authMiddleware.authMid , disposableEmailController.getInbox)


module.exports = route