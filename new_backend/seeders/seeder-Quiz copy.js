"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [
      {
        quiz_question: "찬석이는 잘생겼나요?",
        quiz_answer: true,
        quiz_hint: "찬석이는 아주 인기가 좋습니다.",
      },
      {
        quiz_question: "재경이는 잘생겼나요?",
        quiz_answer: true,
        quiz_hint: "재경이는 아주 인기가 좋습니다.",
      },
    ];

    return queryInterface.bulkInsert("Quizzes", datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Quizzes", null, {});
  },
};
