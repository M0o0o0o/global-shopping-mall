const express = require("express");
const router = express();

const couponRouter = require("./couponRouter");

router.use("/coupon", couponRouter);
module.exports = router;
