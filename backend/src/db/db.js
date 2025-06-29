const mongoose = require('mongoose')


function connectDb(){
    const dbUrl = process.env.DATABASE_URL
    mongoose.connect(dbUrl)
    .then(() => {
        console.log('connected to database')
    })
}

module.exports = connectDb