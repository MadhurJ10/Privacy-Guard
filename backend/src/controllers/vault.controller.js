const userModel = require("../models/user.model")
const vaultModel = require('../models/vault.model')
const bcrypt = require('bcrypt')
const userValidationSchema = require('../validations/user.validation');
const mongoose = require("mongoose");
const { json } = require("express");

const getVaultInfo = async (userId) => {
    return await vaultModel.find({ userId });
};

// usr crypto-js to encrypt password

module.exports.createVault = async (req, res) => { // to create new vault
    const { error, value } = userValidationSchema.validate(req.body, {
        abortEarly: true,
        context: { isVault: true }
    })
    const { userId } = req

    if (error) {
        return res.status(400).json({ errors: error.details.map(d => d.message) });
    }

    const saltRounds = 8;
    const hashedVaultPassword = await bcrypt.hash(value.vaultPassword, saltRounds);

    try {
        const vaultCreate = await userModel.findOneAndUpdate({ _id: userId }, { $set: { vaultPassword: hashedVaultPassword } })
        res.json({
            msg: 'created vault password'
        })
    } catch (error) {
        res.json({
            msg: "error in creating the vault"
        })
    }

}

module.exports.checkVault = async (req, res) => { // password input / login page
    const { error, value } = userValidationSchema.validate(req.body, {
        abortEarly: true,
        context: { isVault: true }
    })

    const { userId } = req

    if (error) {
        return res.status(400).json({ errors: error.details.map(d => d.message) });
    }

    try {
        const isPasswordValid = await userModel.findOne({ _id: userId })
        const check = await bcrypt.compare(value.vaultPassword, isPasswordValid.vaultPassword)
        if (!check) return res.json({ msg: "wrong password" })
        const vaultInfo = getVaultInfo(userId)
        return res.json({
            msg: 'valut infoo',
            vaultInfo
        })
    } catch (error) {
        res.json({
            msg: "error , invalid credentials"
        })
    }
}

module.exports.getVault = async (req, res) => { // to get vault infoo 
    const { userId } = req
    const vaultInfo = await getVaultInfo(userId)
    return res.json({
        msg: "vault infoo",
        vaultInfo
    })
}

module.exports.vaultData = async (req, res) => {
    const { appName, username, encryptedPassword, url } = req.body;
    const { userId } = req;

    try {
        const newEntry = {
            appName: appName,
            username: username,
            encryptedPassword: encryptedPassword,
            url: url,
        };

        // Check if the user already has a vault
        const existingVault = await vaultModel.findOne({ userId: userId });

        if (existingVault) {
            // Push the new entry into the 'entries' array
            existingVault.entries.push(newEntry);
            await existingVault.save();

            // Return only the newly added entry
            return res.json({
                msg: "User already existed, added new vault data",
                newEntry: newEntry,
            });
        }

        // If no existing vault, create a new vault with the new entry
        const newVault = await vaultModel.create({
            userId,
            entries: [ newEntry ],
        });

        return res.json({
            msg: "Created a new Vault Data",
            newEntry: newEntry,
        });
    } catch (error) {
        console.error("Error handling vault data:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

module.exports.updateVault = async (req, res) => { //Updating already created
    const { appName, username, encryptedPassword, url, data_id } = req.body
    const { userId } = req


    const entryObjectId = new mongoose.Types.ObjectId(data_id);


    const result = await vaultModel.findOneAndUpdate(
        { userId, "entries._id": entryObjectId },
        {
            $set: {
                "entries.$.appName": appName,
                "entries.$.username": username,
                "entries.$.encryptedPassword": encryptedPassword,
                "entries.$.url": url,
            },
        },
        { new: true } // returns the full updated document
    );
    res.json({
        result
    })
}

module.exports.deleteVault = async (req, res) => {
    const { data_id } = req.body;
    const { userId } = req;

    const entryObjectId = new mongoose.Types.ObjectId(data_id);

    try {
        const updatedVault = await vaultModel.findOneAndUpdate(
            { userId },  // Find the document by userId
            { $pull: { entries: { _id: entryObjectId } } }, // Remove the array element with matching _id
            { new: true } // Return the updated document
        );

        if (!updatedVault) {
            return res.status(404).json({ msg: "Vault or entry not found" });
        }

        res.json({
            msg: "Entry deleted successfully",
            updatedVault,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
};
