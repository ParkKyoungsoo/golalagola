const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const kiosk = sequelize.define(
    "Kiosk",
    {
      kiosk_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      kiosk_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_unicode_ci",
      timestamps: false,
      tableName: "kiosks",
    }
  );

  return kiosk;
};
