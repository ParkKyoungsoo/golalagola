"use strict";
const fs = require("fs");
var moment = require("moment"); // npm install moment
require("moment-timezone"); // npm install moment-timezone
moment.tz.setDefault("Asia/Seoul");
const { json } = require("body-parser");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dataBuffer = fs.readFileSync(`${__dirname}/\dump-Product.json`);
    const dataJSON = dataBuffer.toString();
    const datas = JSON.parse(dataJSON);

    for (var i = 0; i < datas.items.length; i++) {
      datas.items[i].prod_amount = Math.random() * (1000 - 100) + 100;
      datas.items[i].prod_expiration = moment().format("YYYY-MM-DD HH:mm:ss");
      datas.items[i].prod_sale = Math.random() * (70 - 50) + 50;
    }

    return queryInterface.bulkInsert("products", datas.items, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("products", null, {});
  },
};
