const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller');
const { authMid } = require('../middlewares/Auth.middleware');

router.post('/register' , userController.registerUser);
router.post('/login' , userController.loginUser)
router.get('/get-user' , authMid , userController.getUser)

module.exports = router;