const mongoose = require('mongoose')

const fakeDataSchema = new mongoose.Schema({
    userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userDetails',
            required: true,
        },
        name:String,
        userName:String,
        email:String,
        phoneNumber:String,
        ipAddress:String
})

const fakeDataModel = mongoose.model('fakeDataDetails' , fakeDataSchema)

module.exports = fakeDataModel