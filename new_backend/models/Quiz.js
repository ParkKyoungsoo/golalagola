"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define(
    "Quiz",
    {
      quiz_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      quiz_question: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      quiz_answer: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      quiz_hint: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      quiz_num: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      quiz_desc: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: "quizzes",
      charset: "utf8",
      collate: "utf8_unicode_ci",
      timestamps: false,
    }
  );

  return Quiz;
};
