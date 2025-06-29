const express = require('express')
const cors = require('cors')

const dotenv = require('dotenv');
dotenv.config();


const app = express()
const userRoute = require('./Routes/user.route')
const dashboardRoute = require('./Routes/dashboard.route')
const breachCheckRoute = require('./Routes/breachCheck.route')
const passwordCheckRoute = require('./Routes/passwordCheck.route')
const fakeDataRoute = require('./Routes/fakeData.route')
const newsRoute = require('./Routes/news.route')
const vaultRoute = require('./Routes/vault.route')
const disposableEmailRoute = require('./Routes/disposableEmail.routes')



app.use(express.json())

app.use(cors());

app.use('/h/' , userRoute)
app.use('/' , dashboardRoute)
app.use('/check' , breachCheckRoute)
app.use('/checkk' , passwordCheckRoute)
app.use('/checkkk' , fakeDataRoute)
app.use('/news' , newsRoute)
app.use('/vault' , vaultRoute)
app.use('/email' , disposableEmailRoute)

module.exports = app;