const express = require("express")
const route = express.Router()
const authMiddleware = require("../middlewares/Auth.middleware")
const vaultController = require("../controllers/vault.controller")

route.post("/create-vault" , authMiddleware.authMid , vaultController.createVault)
route.post("/check-vault" , authMiddleware.authMid , vaultController.checkVault)
route.get('/get-vaultData' , authMiddleware.authMid , vaultController.getVault)
route.post("/create-vaultData" , authMiddleware.authMid , vaultController.vaultData)
route.patch('/vault-update' , authMiddleware.authMid , vaultController.updateVault)
route.delete('/vault-delete' , authMiddleware.authMid , vaultController.deleteVault)


module.exports = route