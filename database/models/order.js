const Sequelize = require("sequelize");

module.exports = class Order extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        order_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        pay_state: {
          //0 : 결제 취소, 1 : 결제 완료
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 1,
        },
        order_state: {
          //0: 배송 전, 1: 배송 중, 2: 배송 완료
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: 0,
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        price: {
          type: Sequelize.DECIMAL(15, 2),
          allowNull: false,
        },
        buyr_city: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        buyr_country: {
          type: Sequelize.STRING(2),
          allowNull: false,
        },
        buyr_zip: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        buyr_name: {
          type: Sequelize.STRING(50),
          allowNull: true,
          defaultValue: null,
        },
        delivery_num: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        delivery_date: {
          type: Sequelize.STRING(8),
          allowNull: true,
          defaultValue: null,
        },
        order_date: {
          type: Sequelize.STRING(8),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Order",
        tableName: "orders",
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }
  static associate(db) {
    db.Order.belongsTo(db.Coupon, {
      foreignKey: "fk_coupon_id",
      allowNull: true,
    });
    db.Order.belongsTo(db.Country, { foreignKey: "fk_country_id" });
  }
};
