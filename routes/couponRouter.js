const express = require("express");
const router = express.Router();

const { couponController } = require("../controllers");

const {
  postCouponValidator,
  getOneCouponValidator,
  getCouponsValidator,
} = require("../validator/coupon");

// 특정 신규 쿠폰 코드 발급
/**
 * @body
 * amount, couponCode, categoryId
 */
router.post("/", postCouponValidator(), couponController.addCoupon);

// get a coupon with coupon_id
router.get("/:id", getOneCouponValidator(), couponController.getCoupon);

//get coupon list with pagination
router.get("/", getCouponsValidator(), couponController.getCoupons);

router.get("/statictics/category", couponController.getCouponsWithCategory);

module.exports = router;
