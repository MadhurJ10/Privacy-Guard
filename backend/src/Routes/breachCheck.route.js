const express = require("express")
const router = express.Router()
const breachCheckController = require("../controllers/breachCheck.controller")
const authMiddlware = require('../middlewares/Auth.middleware')

router.post('/breach-check' , authMiddlware.authMid ,breachCheckController.breachCheck)

module.exports = router