const express = require("express");

const sellerRouter = express.Router();

const sellerRegisterController = require("../controller/seller-reg.controller");
const getSellerController = require("../controller/get-seller.controller");

sellerRouter.post(
  "/register-seller",
  sellerRegisterController.sellerRegistration
);
sellerRouter.get("/get-seller", getSellerController.getSeller);

module.exports = sellerRouter;
