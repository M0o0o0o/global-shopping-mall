const Sequelize = require("sequelize");

module.exports = class CouponCategory extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        coupon_category_id: {
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
          // 0 : 배송비 할인, 1 : %할인, 정액 할인
          type: Sequelize.TINYINT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
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
