// 
const Joi = require('joi');

const userValidationSchema = Joi.object({
  firstName: Joi.string().when('$isRegister', {
    is: true,
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),
  lastName: Joi.string()
    .default("")
    .when('$isRegister', {
      is: true,
      then: Joi.optional(),
      otherwise: Joi.forbidden()
    }),
  phoneNumber: Joi.string().length(10).when('$isRegister', {
    is: true,
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),
  // email: Joi.string().email().required(),
  // password: Joi.string().min(6).required(),
  
   email: Joi.string().email().when('$islogin', {
    is: true,
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),
   password: Joi.string().min(6).when('$islogin', {
    is: true,
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),
  vaultPassword: Joi.string().when('$isVault', {
    is: true,
    then: Joi.required(),
    otherwise: Joi.forbidden()
  })
});

module.exports = userValidationSchema