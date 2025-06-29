const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const userValidationSchema = require('../validations/user.validation');
const jwt = require('jsonwebtoken')

const jwtKey = process.env.JWT_SECRET;

module.exports.registerUser = async (req, res) => {
    const { error, value } = userValidationSchema.validate(req.body, {
        abortEarly: false,
        context: { isRegister: true, islogin: true }
    });

    if (error) {
        return res.status(400).json({ errors: error.details.map(d => d.message) });
    }

    try {
        // Hashing the password
        const saltRounds = 8;
        const hashedPassword = await bcrypt.hash(value.password, saltRounds);

        // Creating  user
        const userAdded = await userModel.create({
            firstName: value.firstName,
            lastName: value.lastName,
            phoneNumber: value.phoneNumber,
            email: value.email,
            password: hashedPassword, // Store the hashed password
        });

        const token = await jwt.sign({ id: userAdded._id }, jwtKey) // Have to change the key !!!!!

        res.status(201).json({
            msg: "User registered successfully",
            user: {
                firstName: userAdded.firstName,
                lastName: userAdded.lastName,
                email: userAdded.email,
                phoneNumber: userAdded.phoneNumber,
                uniquesId: userAdded._id,
                token: token
            }
        });
    } catch (err) {
        if (err.code === 11000) {
            if (!err.errorResponse.keyPattern.email) {
                return res.status(409).json({
                    // big error is not taking phone number as unique number
                    error: "User phone number already exists.",

                });
            }
            // Handle duplicate key error (e.g., email already exists)
            return res.status(409).json({
                // big error is not taking phone number as unique number
                error: "User with this email already exists.",

            });
        }
        // Handle other errors
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};


module.exports.loginUser = async (req, res) => {
    const { error, value } = userValidationSchema.validate(req.body, {
        abortEarly: true,
        context: { islogin: true },
    });

    if (error) {
        return res.status(400).json({ errors: error.details.map(d => d.message) });
    }


    try {
        const userdet = await userModel.findOne({ email: value.email });
        if (!userdet) {
            return res.status(404).json({ msg: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(value.password, userdet.password);
        if (isPasswordValid) {
            const token = jwt.sign({ id: userdet._id }, jwtKey);
            return res.json({
                success: true,
                token,
            });
        }

        res.status(401).json({ msg: "Invalid credentials" });
    } catch (err) {
        res.status(500).json({
            msg: "Internal server error",
            error: err.message,
        });
    }
};

module.exports.getUser = async (req, res) => {
    try {
        const { userId } = req
        const userDeatils = await userModel.findById(userId).select("-password  -_id")
        res.status(200).json(userDeatils);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' })
    }

}