const mongoose = require('mongoose')

const dashboardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userDetails',
        required: true,
    },
    apps: [
        {
            appName: { type: String, required: true },
            email: { type: Boolean, default: false, required: false },
            password: { type: Boolean, default: false, required: false },
            location: { type: Boolean, default: false, required: false },
            phoneNumber: { type: Boolean, default: false, required: false },
            aadharNumber: { type: Boolean, default: false, required: false },
        }
    ]
})

const dashboardModel = mongoose.model('dashboardDetails', dashboardSchema)

module.exports = dashboardModel