const crypto = require('crypto'); // For SHA-1 hashing
const passwordCheckValidation = require('../validations/passwordCheck.validation');
const axios = require('axios');

module.exports.passwordCheck = async (req, res) => {
  const { error, value } = passwordCheckValidation.validate(req.body, { abortEarly: true });

  if (error) {
    return res.status(400).json({
      error: error.details.map((detail) => detail.message),
    });
  }

  // Hash the password using SHA-1
  const sha1Hash = crypto.createHash('sha1').update(value.password).digest('hex');
  const prefix = sha1Hash.slice(0, 5);
  const suffix = sha1Hash.slice(5).toUpperCase();
  const url = `https://api.pwnedpasswords.com/range/${prefix}`;

  try {
    // Make the API request to HIBP
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'NodeApp', // Optional but good practice
        'Accept': 'application/json',
      },
    });

    // Parse the response to find if the suffix matches
    const hashes = response.data.split('\n');
    const match = hashes.find((hash) => hash.startsWith(suffix));

    if (match) {
      const [_, count] = match.split(':');
      return res.status(200).json({
        found: true,
        message: 'Password found in breach database',
        occurrences: parseInt(count, 10),
      });
    } else {
      return res.status(200).json({
        found: false,
        message: 'Password not found in breach database',
      });
    }
  } catch (err) {
    console.error('Error calling the API:', err.message);
    if (err.response) {
      return res.status(err.response.status).json({
        message: 'API error',
        error: err.response.data,
      });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};
