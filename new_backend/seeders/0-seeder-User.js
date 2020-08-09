"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [];
    for (let i = 0; i < 10; i++) {
      let obj = {
        user_email: "test" + i + "@example.com",
        user_name: "testUser" + i,
        user_pwd: "1234",
        user_phone: "01012341234",
        user_image: "",
        user_quiz: false,
      };
      datas.push(obj);
    }
    let obj = {
      user_email: "admin@example.com",
      user_name: "admin",
      user_pwd: "1234",
      user_phone: "01012341234",
      user_image: "",
      user_quiz: false,
      isAdmin: true,
    };
    datas.push(obj);

    return queryInterface.bulkInsert("users", datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
