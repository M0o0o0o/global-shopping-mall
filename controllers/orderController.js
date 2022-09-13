const { v4: uuidv4 } = require("uuid");
const errorCodes = require("../codes/errorCodes");

const { orderService } = require("../services");

const addOrder = async (req, res, next) => {
  try {
    const data = {
      quantity: req.body.quantity,
      price: parseInt(req.body.price),
      buyr_country: req.body.buyr_country,
      buyr_city: req.body.buyr_city,
      buyr_zip: req.body.buyr_zip,
      buyr_name: req.body.buyr_name,
      delivery_num: req.body.delivery_num,
      coupon: req.body.coupon,
    };

    const newOrder = await orderService.addOrder(data);

    res.location(`/order/${newOrder.order_id}`);
    return res.status(201).json({ message: "create new Order" });
  } catch (err) {
    next(err);
  }
};

module.exports = { addOrder };
