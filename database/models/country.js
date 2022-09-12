const Sequelize = require("sequelize");

module.exports = class Country extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        countryId: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        countryCode: {
          type: Sequelize.STRING(2),
          allowNull: false,
        },
        countryDcode: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        countryName: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: "Country",
        tableName: "country",
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }
  static associate(db) {
    db.Country.hasMany(db.Order, { foreignKey: "fk_country_id" });
  }
};
