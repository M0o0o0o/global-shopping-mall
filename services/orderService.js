const moment = require("moment");
const errorCodes = require("../codes/errorCodes");
const {
  countryRepository,
  couponRepository,
  orderRepository,
} = require("../repositories");
const deliveryCost = require("../testData/delivery");

const addOrder = async (data) => {
  // 국가 확인
  const country = await countryRepository.findCountry(data.buyr_country);
  if (!country) {
    throw new Error("국가 코드를 다시 입력해주세요.");
  }

  data.fk_country_id = country.country_id;

  // 쿠폰 확인
  if (data.coupon) {
    const coupon = await couponRepository.findCouponWithCode(data.coupon);
    if (!coupon) {
      throw new Error("존재하지 않는 쿠폰입니다.");
    }
    // 계산 price 변경
    data.fk_coupon_id = coupon.coupon_id;
    data.price =
      data.price + deliveryCost[data.quantity][country.country_name] - 1000;
  }

  return await orderRepository.createOrder({
    ...data,
    pay_state: 1,
    order_date: moment().format("YYYYMMDD"),
  });
};

module.exports = { addOrder };
