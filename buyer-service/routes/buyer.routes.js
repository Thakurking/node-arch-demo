const express = require("express");

const buyerRouter = express.Router();

const middleware = require("../middleware");

const buyerRegistrationController = require("../controller/buyer-reg.controller");
const getBuyerController = require("../controller/get-buyer.controller");

buyerRouter.post(
  "/buyer-reg",
  middleware,
  buyerRegistrationController.buyerRegistration
);
buyerRouter.get("/get-buyer", getBuyerController.getBuyers);

module.exports = buyerRouter;
