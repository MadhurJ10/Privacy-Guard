const joi = require('joi')

const passwordCheckValidation = joi.object({
    password: joi.string().required()
})

module.exports = passwordCheckValidation