const { Order } = require("../database/models");
const logger = require("../logger");

const createOrder = async (data) => {
  try {
    return await Order.create(data);
  } catch (err) {
    logger.error(err);
    return null;
  }
};

module.exports = { createOrder };
