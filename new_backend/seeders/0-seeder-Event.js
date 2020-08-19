"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [
      {
        event_prod_A: 51,
        event_prod_B: 52,
        event_date: new Date(),
        event_expire: new Date(),
        event_category: 1,
      },
      {
        event_prod_A: 1,
        event_prod_B: 2,
        event_date: new Date(),
        event_expire: new Date(),
        event_category: 2,
      },
      {
        event_prod_A: 11,
        event_prod_B: 12,
        event_date: new Date(),
        event_expire: new Date(),
        event_category: 3,
      },
      {
        event_prod_A: 21,
        event_prod_B: 22,
        event_date: new Date(),
        event_expire: new Date(),
        event_category: 4,
      },
      {
        event_prod_A: 31,
        event_prod_B: 32,
        event_date: new Date(),
        event_expire: new Date(),
        event_category: 5,
      },
      {
        event_prod_A: 41,
        event_prod_B: 42,
        event_date: new Date(),
        event_expire: new Date(),
        event_category: 6,
      },
      {
        event_prod_A: 64,
        event_prod_B: 65,
        event_date: new Date(),
        event_expire: new Date(),
        event_category: 7,
      },
      {
        event_prod_A: 71,
        event_prod_B: 72,
        event_date: new Date(),
        event_expire: new Date(),
        event_category: 8,
      },
      {
        event_prod_A: 82,
        event_prod_B: 84,
        event_date: new Date(),
        event_expire: new Date(),
        event_category: 9,
      },
    ];

    return queryInterface.bulkInsert("events", datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("events", null, {});
  },
};
