const express = require("express");
const app = express.Router();
const db = require("../models");

const authMiddleware = require("../middleware/auth");
const authAdminMiddleware = require("../middleware/authAdmin");

// 퀴즈 전체 조회
app.get("/", async function (req, res) {
  // ** 관리자인지 검사하기
  db.Quiz.findAll()
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
});

// 퀴즈 한개 조회
// app.get("/selectOne/:input", async function (req, res) {
//   // ** 관리자인지 검사하기
//   db.Quiz.findOne({
//     where: { quiz_id: req.params.input },
//   })
//     .then((data) => res.json(data))
//     .catch((err) => res.status(404).send(err));
// });

// 퀴즈 등록하기
// app.post("/", authAdminMiddleware);
app.post("/", async function (req, res) {
  // ** 관리자인지 검사하기
  await db.Quiz.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

// 퀴즈 수정
// app.put("/", authAdminMiddleware);
app.put("/", async function (req, res) {
  // ** 관리자인지 검사하기
  await db.Quiz.update(req.body, {
    where: { quiz_id: req.body.quiz_id },
  })
    .then((data) => res.send({ message: "성공" }))
    .catch((err) => res.status(404).send(err));
});

// 상품 삭제
// app.delete("/", authAdminMiddleware);
app.delete("/", async function (req, res) {
  await db.Quiz.destroy({
    where: { quiz_id: req.body.quiz_id },
  })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

// req.headers.token 의 유무에 따라 비회원, 회원의 퀴즈 참여 요청
// 퀴즈 참여하는 요청
app.post("/part", function (req, res) {
  console.log(req.headers);
  if (req.headers.token === undefined || req.headers.token === null) {
    res.json({ message: `unknown user quiz success` });
  } else {
    res.json({ message: `${req.headers.token} user quiz success` });
  }
});

module.exports = app;
