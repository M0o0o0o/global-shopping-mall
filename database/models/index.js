const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config")[env];
const db = {};

const Order = require("./order");
const Country = require("./country");
const CouponCategory = require("./couponCategory");
const Coupon = require("./coupon");
// const DeliveryCost = require("./deliveryCost");
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Order = Order;
db.Country = Country;
db.CouponCategory = CouponCategory;
db.Coupon = Coupon;
// db.DeliveryCost = DeliveryCost;

db.Order.init(sequelize);
db.Country.init(sequelize);
db.CouponCategory.init(sequelize);
db.Coupon.init(sequelize);
// db.DeliveryCost.init(sequelize);

db.Order.associate(db);
db.Country.associate(db);
db.CouponCategory.associate(db);
db.Coupon.associate(db);

module.exports = db;
