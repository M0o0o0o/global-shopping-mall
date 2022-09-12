const Sequelize = require("sequelize");

module.exports = class Coupon extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        couponId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        amount: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        couponCode: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        count: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        totalDiscount: {
          type: Sequelize.DECIMAL(15, 2),
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "Coupon",
        tableName: "coupon",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }
  static associate(db) {
    db.Coupon.hasMany(db.Order, {
      foreignKey: "fk_coupon_id",
      allowNull: null,
    });
    db.Coupon.belongsTo(db.CouponCategory, { foreignKey: "fk_category_id" });
  }
};
