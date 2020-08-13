"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [
      {
        user_id: 1,
        prod_id: 1,
        buy_amount: 3,
        bud_date: new Date(),
      },
      {
        user_id: 2,
        prod_id: 1,
        buy_amount: 5,
        bud_date: new Date(),
      },
      {
        user_id: 3,
        prod_id: 1,
        buy_amount: 3,
        bud_date: new Date(),
      },
      {
        user_id: 4,
        prod_id: 1,
        buy_amount: 2,
        bud_date: new Date(),
      },
      {
        user_id: 1,
        prod_id: 2,
        buy_amount: 3,
        bud_date: new Date(),
      },
      {
        user_id: 1,
        prod_id: 2,
        buy_amount: 1,
        bud_date: new Date(),
      },
      {
        user_id: 1,
        prod_id: 2,
        buy_amount: 2,
        bud_date: new Date(),
      },
      {
        user_id: 1,
        prod_id: 2,
        buy_amount: 2,
        bud_date: new Date(),
      },
      {
        user_id: 1,
        prod_id: 3,
        buy_amount: 4,
        bud_date: new Date(),
      },
      {
        user_id: 2,
        prod_id: 3,
        buy_amount: 3,
        bud_date: new Date(),
      },
      {
        user_id: 3,
        prod_id: 3,
        buy_amount: 4,
        bud_date: new Date(),
      },
      {
        user_id: 1,
        prod_id: 4,
        buy_amount: 1,
        bud_date: new Date(),
      },
      {
        user_id: 5,
        prod_id: 5,
        buy_amount: 1,
        bud_date: new Date(),
      },
      {
        user_id: 5,
        prod_id: 6,
        buy_amount: 2,
        bud_date: new Date(),
      },
      {
        user_id: 5,
        prod_id: 7,
        buy_amount: 2,
        bud_date: new Date(),
      },
      {
        user_id: 4,
        prod_id: 8,
        buy_amount: 1,
        bud_date: new Date(),
      },
      {
        user_id: 4,
        prod_id: 9,
        buy_amount: 1,
        bud_date: new Date(),
      },
      {
        user_id: 4,
        prod_id: 10,
        buy_amount: 3,
        bud_date: new Date(),
      },
      {
        user_id: 3,
        prod_id: 11,
        buy_amount: 5,
        bud_date: new Date(),
      },
      {
        user_id: 3,
        prod_id: 12,
        buy_amount: 3,
        bud_date: new Date(),
      },
      {
        user_id: 3,
        prod_id: 13,
        buy_amount: 2,
        bud_date: new Date(),
      },
      {
        user_id: 2,
        prod_id: 14,
        buy_amount: 2,
        bud_date: new Date(),
      },
      {
        user_id: 2,
        prod_id: 15,
        buy_amount: 6,
        bud_date: new Date(),
      },
    ];

    return queryInterface.bulkInsert("buys", datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("buys", null, {});
  },
};
