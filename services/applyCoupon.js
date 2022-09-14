const errorCodes = require("../codes/errorCodes");
const ratesAPI = require("../ratesAPI");

module.exports = async (
  country,
  type,
  couponAmount,
  productPrice,
  deliveryPrice
) => {
  console.log(couponAmount, productPrice, deliveryPrice);
  if (type === 0) {
    // 배달비
    return await deliveryCoupon(
      country,
      couponAmount,
      productPrice,
      deliveryPrice
    );
  } else if (type === 1) {
    // 정률
    return await ratesCoupon(
      country,
      couponAmount,
      productPrice,
      deliveryPrice
    );
  } else if (type === 2) {
    //정액
    return await fixCoupon(country, couponAmount, productPrice, deliveryPrice);
  }
};

/**
 * KR이 아니라면 환율 계산 해야 한다.
 */
// 배송비 할인
// 배송비 할인이면 원화에서 해당 금액을 뺸 후 국가가 다르다면 API 요청한다.
// 정액 할인
// 전체 금액에서 금액을 뺀 후 국가가 다르다면 API 요청한다.
// 정률 할인
// 국가가 다르다면 API 요청 후 변환 후 소수점 처리 아니라면 원화로 소수점 계산

const deliveryCoupon = async (country, amount, productPrice, deliveryPrice) => {
  deliveryPrice -= amount;
  if (deliveryPrice < 0) {
    deliveryPrice = 0;
  }
  if (country === "KR") {
    return productPrice + deliveryPrice;
  }
  let price = await ratesAPI(productPrice + deliveryPrice);
  return price;
};

const fixCoupon = async (country, amount, productPrice, deliveryPrice) => {
  let price = productPrice + deliveryPrice - amount;

  if (price < 0) {
    return 0;
  }

  if (country === "KR") {
    return price;
  }

  price = await ratesAPI(price);
  return price;
};

const ratesCoupon = async (country, amount, productPrice, deliveryPrice) => {
  let price = productPrice + deliveryPrice;

  if (country === "KR") {
    price = (price - price / amount).toFixed(0);
    return price;
  }
  price = await ratesAPI(price);
  price = (price - price / amount).toFixed(2);
  console.log(price);
  return price;
};
