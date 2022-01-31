const express = require("express")

const adminRouter = express.Router()

const getAdminController = require("../controller/get-admin.controller")

adminRouter.get("/get-admin", getAdminController.getAdmin)

module.exports = adminRouter