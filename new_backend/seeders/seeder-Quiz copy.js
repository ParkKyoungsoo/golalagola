"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [
      {
        quiz_question: "우리 마트는 둘째주, 넷째주 일요일에 쉰다.",
        quiz_answer: true,
        quiz_hint: "평일에는 매일 영업합니다.",
        quiz_desc: "우리 마트는 둘째주, 넷째주 일요일에 쉽니다.",
      },
      {
        quiz_question: "우리 마트는 수요일에 육류를 할인행사를 한다.",
        quiz_answer: true,
        quiz_hint: "수요일에 육류가 많이 남습니다.",
        quiz_desc: "우리 마트는 수요일에 육류를 할인행사 합니다.",
      },
      {
        quiz_question: "우리 마트는 월요일에 수산물을 할인행사를 한다.",
        quiz_answer: true,
        quiz_hint: "월요일에 수산물이 많이 남습니다.",
        quiz_desc: "우리 마트는 월요일에 수산물을 할인행사 합니다.",
      },
      {
        quiz_question: "우리 마트는 금요일에 샐러드를 할인행사를 한다.",
        quiz_answer: true,
        quiz_hint: "금요일에 샐러드가 많이 남습니다.",
        quiz_desc: "우리 마트는 금요일에 샐러드를 할인행사 합니다.",
      },
      {
        quiz_question: "회원일 시, 2개 이벤트에 참여할 수 있다.",
        quiz_answer: true,
        quiz_hint: "이벤트는 vs이벤트와 퀴즈이벤트가 존재합니다.",
        quiz_desc: "회원일 시, vs이벤트, 퀴즈 이벤트에 참여할 수 있습니다.",
      },
      {
        quiz_question: "비회원일 시, 1개 이벤트에 참여할 수 있다.",
        quiz_answer: true,
        quiz_hint: "이벤트는 vs이벤트와 퀴즈이벤트가 존재합니다.",
        quiz_desc: "비회원일 시, 퀴즈 이벤트만 참여할 수 있습니다.",
      },
    ];

    return queryInterface.bulkInsert("quizzes", datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("quizzes", null, {});
  },
};
