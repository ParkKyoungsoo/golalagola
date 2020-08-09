const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_email: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
      user_pwd: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      user_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      user_phone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      user_image: {
        allowNull: true,
        type: DataTypes.STRING(1234),
      },
      user_quiz: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      key_verify: {
        type: DataTypes.STRING,
      },
      email_verify: {
        type: DataTypes.BOOLEAN,
      },
      isAdmin: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "users",
      charset: "utf8",
      collate: "utf8_unicode_ci",
      timestamps: false,
    }
  );
  User.associate = function (models) {
    User.hasMany(models.Coupon, {
      foreignKey: "user_id",
      onDelete: "cascade",
    });
  };

  return User;
};
