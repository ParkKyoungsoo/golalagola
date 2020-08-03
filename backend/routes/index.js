var express = require("express");
var router = express.Router();
var { User } = require("../models");

/* GET home page. */
router.get("/index", function (req, res, next) {
  console.log("^^^", User);
  User.findOne({ where: { id: 5 } }).then((user) => {
    console.log();
    console.log(user.useremail);
  });
});
module.exports = router;
