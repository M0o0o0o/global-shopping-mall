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

const getOrder = async (req, res, next) => {
  try {
    const order = await orderService.getOrder(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error(errorCodes.pageNotFound);
    }

    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getOrders(req.query);
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

module.exports = { addOrder, getOrders, getOrder };
