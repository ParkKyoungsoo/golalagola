"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [
      {
        coupon_select: 1,
        coupon_use: false,
        coupon_date: new Date(),
        user_id: 1,
        event_id: 1,
      },
      {
        coupon_select: 11,
        coupon_use: true,
        coupon_date: new Date(),
        user_id: 1,
        event_id: 2,
      },
      {
        coupon_select: 21,
        coupon_use: false,
        coupon_date: new Date(),
        user_id: 1,
        event_id: 3,
      },
    ];

    return queryInterface.bulkInsert("coupons", datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("coupons", null, {});
  },
};
