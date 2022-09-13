const { Op } = require("sequelize");
const moment = require("moment");

module.exports = (data) => {
  const whereCluase = {};
  if (!data.endDate) {
    data.endDate = moment().format("YYYYMMDD");
  }
  if (data.startDate) {
    whereCluase.order_date = {
      [Op.and]: {
        [Op.gte]: data.startDate,
        [Op.lte]: data.endDate,
      },
    };
  } else {
    whereCluase.order_date = {
      [Op.and]: {
        [Op.lte]: data.endDate,
      },
    };
  }

  if (data.buyr_name) {
    whereCluase.buyr_name = { [Op.like]: `%${data.buyr_name}%` };
  }

  if (data.order_state) {
    whereCluase.order_state = data.order_state;
  }

  return whereCluase;
};
