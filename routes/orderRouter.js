const express = require("express");
const router = express.Router();

const { postOrder } = require("../validator/order");
const { orderController } = require("../controllers");

router.post("/", postOrder(), orderController.addOrder);

module.exports = router;
