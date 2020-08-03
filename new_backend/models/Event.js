const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      event_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      event_prod_A: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      event_prod_B: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      event_date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      event_expire: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      event_category: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: "events",
      charset: "utf8",
      collate: "utf8_unicode_ci",
      timestamps: false,
    }
  );

  Event.associate = function (models) {
    Event.hasMany(models.Coupon, {
      foreignKey: "event_id",
      onDelete: "cascade",
    });
  };

  return Event;
};
