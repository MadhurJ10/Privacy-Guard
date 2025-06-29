const axios = require('axios')
const breachCheckValidation = require('../validations/breachCheck.validation')

module.exports.breachCheck = async (req, res) => {
    const { error, value } = breachCheckValidation.validate(req.body, { abortEarly: true })
    if (error) {
        return res.status(400).json({
            error: error.details.map((detail) => detail.message),
        });
    }

    try {

        const response = await axios.get('https://api.xposedornot.com/v1/breach-analytics', {
            params: { email: value.email },
            headers: {
                'User-Agent': 'PostmanRuntime/7.29.0', // xposedAPi has blacklisten axios to send req , thats why this req act as postman server
                'Accept': 'application/json'
            }
        });

        if (response.data.BreachMetrics === null) return res.json({ msg: "no breach found all acount is clear" })

        return res.json({
            msg: "account is found with a breach",
            data: response.data
        })
    } catch (error) {
        if (error.response) {
            // Errors from the API server
            res.status(error.response.status).json({
                error: error.response.data || 'Error from breach API',
            });
        } else {
            // Other errors (e.g., network issues)
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}