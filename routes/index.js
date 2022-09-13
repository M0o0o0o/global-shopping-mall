const express = require("express");
const router = express();

const couponRouter = require("./couponRouter");
const orderRouter = require("./orderRouter");
router.use("/coupon", couponRouter);
router.use("/order", orderRouter);

module.exports = router;
