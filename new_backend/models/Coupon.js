"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define(
    "Coupon",
    {
      coupon_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      coupon_select: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      coupon_use: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      coupon_date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      coupon_useDate: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: "coupons",
      charset: "utf8",
      collate: "utf8_unicode_ci",
      timestamps: false,
    }
  );
  return Coupon;
};
