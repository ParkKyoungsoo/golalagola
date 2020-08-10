const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const product = sequelize.define(
    "Product",
    {
      prod_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      prod_title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      prod_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      prod_category: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      prod_price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      prod_amount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      prod_expiration: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      prod_image: {
        allowNull: true,
        type: Sequelize.STRING(1234),
      },
      prod_desc: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      prod_sale: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      prod_weight: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_unicode_ci",
      timestamps: false,
      tableName: "products",
    }
  );

  return product;
};
