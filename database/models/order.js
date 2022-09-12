const Sequelize = require("sequelize");

module.exports = class Order extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        orderId: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        payState: {
          //0 : 결제 취소, 1 : 결제 완료
          type: Sequelize.TINYINT,
          allowNull: false,
        },
        orderState: {
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
        buyrCity: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        buyrCountry: {
          type: Sequelize.STRING(2),
          allowNull: false,
        },
        buyrZip: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        buyrName: {
          type: Sequelize.STRING(50),
          allowNull: true,
          defaultValue: null,
        },
        deliveryNum: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        deliveryDate: {
          type: Sequelize.STRING(8),
          allowNull: true,
          defaultValue: null,
        },
        orderDate: {
          type: Sequelize.STRING(8),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
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
