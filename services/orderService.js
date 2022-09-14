const moment = require("moment");
const {
  countryRepository,
  couponRepository,
  orderRepository,
} = require("../repositories");
const deliveryData = require("../testData/delivery");
const applyCoupon = require("./applyCoupon");

const getOrdersDao = require("../dao/getOrdersDao");
const errorCodes = require("../codes/errorCodes");

const addOrder = async (data) => {
  // 국가 확인
  const country = await countryRepository.findCountry(data.buyr_country);
  if (!country) {
    throw new Error("국가 코드를 다시 입력해주세요.");
  }
  data.fk_country_id = country.country_id;
  const deliveryCost = deliveryData[data.quantity][country.country_name];

  // 쿠폰 확인
  if (data.coupon) {
    const coupon = await couponRepository.findCouponWithCode(data.coupon);
    if (!coupon) {
      throw new Error("존재하지 않는 쿠폰입니다.");
    }

    const newPrice = await applyCoupon(
      country.country_code,
      coupon.CouponCategory.type,
      coupon.amount,
      data.price,
      deliveryCost
    );

    data.price = newPrice;
    data.fk_coupon_id = coupon.coupon_id;
  }

  return await orderRepository.createOrder({
    ...data,
    pay_state: 1,
    order_date: moment().format("YYYYMMDD"),
  });
};

const getOrders = async (data) => {
  const whereClause = getOrdersDao(data);
  const orders = await orderRepository.findOrders({
    whereClause,
    page: data.page,
  });
  return orders;
};

const getOrder = async (order_id) => {
  const order = await orderRepository.findOrder(order_id);
  return order;
};

const setStartDelivery = async (order_id) => {
  const cnt = await orderRepository.updateStartDelivery(order_id);
  return cnt;
};

const deletedOrder = async (order_id) => {
  const order = await getOrder(order_id);

  if (!order) {
    throw new Error("이미 결제 취소된 주문이거나 없는 주문입니다.");
  }

  if (order.order_state !== 0) {
    throw new Error("이미 배송 중인 주문건이므로 결제취소가 불가능합니다.");
  }
  return await orderRepository.destroyOrder(order_id);
};

module.exports = {
  addOrder,
  getOrders,
  getOrder,
  setStartDelivery,
  deletedOrder,
};
