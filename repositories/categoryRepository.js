const couponCategory = require("../database/models/couponCategory");
const logger = require("../logger");
const findCategory = async (coupon_category_id) => {
  try {
    return await couponCategory.findOne({ where: coupon_category_id });
  } catch (err) {
    logger.error(err);
    return null;
  }
};

module.exports = { findCategory };
