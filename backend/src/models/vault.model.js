const mongoose = require('mongoose')

const vaultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userDetails',
        required: true,
    },
    entries: [
        {
            appName: String,
            username: String,
            encryptedPassword: String,
            url: String
        },
    ]
})

const vaultModel = mongoose.model("vaultDetails", vaultSchema)

module.exports = vaultModel