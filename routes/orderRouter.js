const express = require("express");
const router = express.Router();

const { postOrder, getOrders } = require("../validator/order");
const { orderController } = require("../controllers");

router.post("/", postOrder(), orderController.addOrder);
router.get("/:id", orderController.getOrder);
router.get("/", getOrders(), orderController.getOrders);
router.patch("/delivery/:id", orderController.setStartDelivery);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
