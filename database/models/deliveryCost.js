// const Sequelize = require("sequelize");
// const countriesName = require("../countriesName");

// module.exports = class DeliveryCost extends Sequelize.Model {
//   static init(sequelize) {
//     return super.init(addColumns(sequelize), {
//       sequelize,
//       timestamps: false,
//       underscored: false,
//       modelName: "DeliveryCost",
//       tableName: "delivery_cost",
//       charset: "utf8mb4",
//       collate: "utf8mb4_unicode_ci",
//     });
//   }
// };

// const addColumns = () => {
//   let columns = {
//     id: {
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false,
//     },
//     quantity: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//     },
//   };

//   countriesName().forEach((country) => {
//     columns[`${country}`] = {
//       type: Sequelize.INTEGER(50),
//       allowNull: false,
//     };
//   });

//   return columns;
// };
