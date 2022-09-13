const { Op } = require("sequelize");
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

const findOrders = async ({ whereClause, page }) => {
  try {
    return await Order.findAndCountAll({
      attributes: [
        "order_id",
        "pay_state",
        "order_state",
        "order_state",
        "buyr_country",
        "buyr_name",
      ],
      where: { [Op.and]: whereClause },
      order: [["order_date", "DESC"]],
      offset: (page - 1) * 20,
      limit: 20,
    });
  } catch (err) {
    logger.error(err);
    return [];
  }
};

const findOrder = async (order_id) => {
  try {
    return await Order.findOne({ where: { order_id } });
  } catch (err) {
    logger.error(err);
    return null;
  }
};

module.exports = { createOrder, findOrders, findOrder };
