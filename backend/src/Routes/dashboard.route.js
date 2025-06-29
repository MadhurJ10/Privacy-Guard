const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboard.controller')
const authMiddlware = require('../middlewares/Auth.middleware')

router.post('/create-dashboard' , authMiddlware.authMid ,dashboardController.CreateDashboard)
router.get('/get-dashboard' , authMiddlware.authMid , dashboardController.getDashboard)
router.patch('/update-dashboard' , authMiddlware.authMid , dashboardController.updateDashboard) 
router.delete('/delete-dashboard' , authMiddlware.authMid , dashboardController.deleteDashboard) 


module.exports = router