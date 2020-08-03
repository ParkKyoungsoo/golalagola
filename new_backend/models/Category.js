const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const category = sequelize.define(
    "Category",
    {
      cat_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cat_title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cat_image: {
        allowNull: false,
        type: Sequelize.STRING(1234),
      },
    },
    {
      sequelize,
      charset: "utf8",
      collate: "utf8_unicode_ci",
      timestamps: false,
      tableName: "categories",
    }
  );

  return category;
};
