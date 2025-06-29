const express = require('express')
const route = express.Router()
const newsController = require('../controllers/news.controller')

route.get('/get-news' , newsController.getNews)

module.exports = route