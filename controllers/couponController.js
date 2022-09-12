/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require("uuid");
const errorCodes = require("../codes/errorCodes");

const { couponService } = require("../services");

const addCoupon = async (req, res, next) => {
  try {
    const data = {
      coupon_id: uuidv4(),
      content: req.body.content,
      amount: req.body.amount,
      fk_category_id: req.body.category_id,
      coupon_code: uuidv4(),
    };

    const newCoupon = await couponService.addCoupon(data);

    if (!newCoupon) {
      res.status(400);
      throw new Error(errorCodes.RETRY);
    }

    res.location(`/coupon/${newCoupon.coupon_id}`);
    res.status(201).json({ message: "created new coupon" });
  } catch (err) {
    next(err);
  }
};

const getCoupon = async (req, res, next) => {
  try {
    const coupon_id = req.params.id;
    const coupon = await couponService.getCoupon(coupon_id);
    if (!coupon) {
      res.status(404);
      throw new Error(errorCodes.pageNotFound);
    }

    res.status(200).json(coupon);
  } catch (err) {
    throw err;
  }
};

const getCoupons = async (req, res, next) => {
  try {
    const coupons = await couponService.getCoupons(req.query.page);
    res.status(200).json(coupons);
  } catch (err) {
    throw err;
  }
};

const getCouponsWithCategory = async (req, res, next) => {
  try {
    const coupons = await couponService.getCouponsWithCategory();
    res.status(200).json(coupons);
  } catch (err) {
    throw err;
  }
};

module.exports = { addCoupon, getCoupon, getCoupons, getCouponsWithCategory };
