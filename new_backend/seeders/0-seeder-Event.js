"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [
      {
        event_prod_A: 1,
        event_prod_B: 2,
        event_date: new Date(),
        event_expire: new Date(),
        event_category: 1,
      },
      {
        event_prod_A: 11,
        event_prod_B: 12,
        event_date: new Date(),
        event_expire: new Date(),
        event_category: 2,
      },
      {
        event_prod_A: 21,
        event_prod_B: 22,
        event_date: new Date(),
        event_expire: new Date(),
        event_category: 3,
      },
    ];

    return queryInterface.bulkInsert("events", datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("events", null, {});
  },
};
