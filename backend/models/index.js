var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, "..", "config", "config.json"))[env];
var db = {};
var sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log("애가 먼저야?");
db.User = require("./users")(sequelize, Sequelize);

// console.log("db:", db);
module.exports = db;
