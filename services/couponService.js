const errorCodes = require("../codes/errorCodes");
const { categoryRepository, couponRepository } = require("../repositories");

const addCoupon = async (data) => {
  const isCategory = await categoryRepository.findCategory({
    coupon_category_id: data.fk_category_id,
  });
  if (!isCategory) {
    throw new Error(errorCodes.NOTEXISTCATEGORY);
  }

  const newCoupon = await couponRepository.createCoupon(data);
  return newCoupon;
};

const getCoupon = async (coupon_id) => {
  const coupon = await couponRepository.findCoupon(coupon_id);
  if (!coupon) return null;

  return {
    coupon_id: coupon.coupon_id,
    content: coupon.content,
    amount: coupon.amount,
    count: coupon.count,
    total_discount: coupon.total_discount,
    create: coupon.createdAt,
    coupon_type: coupon.CouponCategory.content,
  };
};

const getCoupons = async (page) => {
  const coupons = await couponRepository.findCoupons(page);
  return coupons;
};

const getCouponsWithCategory = async () => {
  const coupons = await couponRepository.fundCouponsWithCategory();
  return coupons;
};

module.exports = { addCoupon, getCoupon, getCoupons, getCouponsWithCategory };
