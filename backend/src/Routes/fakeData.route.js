const express = require("express")
const route = express.Router()
const fakeDataController = require("../controllers/fakeData.controller")
const authMiddleware = require('../middlewares/Auth.middleware')

route.post('/Create-fakeData' ,authMiddleware.authMid ,fakeDataController.createFakeData)
route.get('/get-fakeData' ,authMiddleware.authMid ,fakeDataController.getFakeData)
route.delete('/delete-fakeData' , authMiddleware.authMid , fakeDataController.deleteFakeData)


module.exports = route