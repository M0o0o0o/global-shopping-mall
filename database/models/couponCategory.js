const Sequelize = require("sequelize");

module.exports = class CouponCategory extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        couponCategoryId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        type: {
          type: Sequelize.ENUM("ratio", "fix"),
          allowNull: false,
        },
        target: {
          type: Sequelize.ENUM("price", "delivery", "total"),
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "CouponCategory",
        tableName: "coupon_category",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }
  static associate(db) {
    db.CouponCategory.hasMany(db.Coupon, { foreignKey: "fk_category_id" });
  }
};
