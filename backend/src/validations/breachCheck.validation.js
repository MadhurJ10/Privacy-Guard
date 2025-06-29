const joi = require('joi')

const breachCheckValidation = joi.object({
    email:joi.string().email().required()
})

module.exports = breachCheckValidation