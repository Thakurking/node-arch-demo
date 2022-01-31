const express = require("express");

const buyerRouter = express.Router();

const buyerRegistrationController = require("../controller/buyer-reg.controller");
const getBuyerController = require("../controller/get-buyer.controller");

buyerRouter.post("/buyer-reg", buyerRegistrationController.buyerRegistration);
buyerRouter.get("/get-buyer", getBuyerController.getBuyers);

module.exports = buyerRouter;
