const Coupon = require("../database/models/coupon");
const CouponCategory = require("../database/models/couponCategory");
const sequelize = require("sequelize");
const logger = require("../logger");
const createCoupon = async (data) => {
  try {
    return await Coupon.create(data);
  } catch (err) {
    logger.error(err);
    return null;
  }
};

const findCoupon = async (coupon_id) => {
  try {
    return await Coupon.findOne({
      where: { coupon_id },
      include: [{ model: CouponCategory, required: true }],
    });
  } catch (err) {
    logger.error(err);
    return null;
  }
};

const findCoupons = async (page) => {
  try {
    return await Coupon.findAll({
      attributes: ["coupon_id", "content", "createdAt"],
      order: [["createdAt", "DESC"]],
      limit: 20,
      offset: (page - 1) * 20,
    });
  } catch (err) {
    logger.error(err);
    return [];
  }
};

const fundCouponsWithCategory = async () => {
  try {
    const coupons = await Coupon.findAll({
      attributes: [
        "fk_category_id",
        [
          sequelize.fn("sum", sequelize.col("total_discount")),
          "total_discount",
        ],
        [sequelize.fn("sum", sequelize.col("count")), "total_count"],
      ],
      group: ["fk_category_id"],
    });
    return coupons;
  } catch (err) {
    logger.error(err);
    return [];
  }
};

module.exports = {
  createCoupon,
  findCoupon,
  findCoupons,
  fundCouponsWithCategory,
};
