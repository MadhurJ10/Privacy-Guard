const express = require('express')
const router = express.Router()
const passwordCheckController = require('../controllers/passwordCheck.controller')
const authMiddlware = require('../middlewares/Auth.middleware')

router.post('/password-check' , authMiddlware.authMid ,passwordCheckController.passwordCheck)

module.exports = router
