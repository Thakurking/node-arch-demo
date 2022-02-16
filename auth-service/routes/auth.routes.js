const express= require("express")

const authRouter = express.Router()

const loginRouter = require("../controller/login.controller")

authRouter.post("/login", loginRouter.login)

module.exports = authRouter