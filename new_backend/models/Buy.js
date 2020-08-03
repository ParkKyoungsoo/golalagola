const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Buy = sequelize.define(
    "Buy",
    {
      buy_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      prod_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      buy_amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      buy_date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: "buys",
      charset: "utf8",
      collate: "utf8_unicode_ci",
      timestamps: false,
    }
  );

  return Buy;
};
