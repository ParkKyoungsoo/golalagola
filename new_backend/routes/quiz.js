const express = require("express");
const app = express.Router();
const db = require("../models");

// 진행되고 있는 퀴즈의 정보 조회 요청
app.get("/", async function (req, res) {
  db.Quiz.findAll()
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});

// req.headers.token 의 유무에 따라 비회원, 회원의 퀴즈 참여 요청
app.post("/", function (req, res) {
  console.log(req.headers);
  if (req.headers.token === undefined || req.headers.token === null) {
    res.json({ message: `unknown user quiz success` });
  } else {
    res.json({ message: `${req.headers.token} user quiz success` });
  }
});

module.exports = app;
