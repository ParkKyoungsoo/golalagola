const express = require("express");
const app = express.Router();
const db = require("../models");

// Coupon 전체 조회
app.get("/", async function (req, res) {
  db.Coupon.findAll()
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
});

// Coupon 한개 조회
app.get("/selectOne/:input_user_id/:input_event_id", async function (req, res) {
  db.Coupon.findOne({
    where: {
      user_id: req.params.input_user_id,
      event_id: req.params.input_event_id,
    },
  })
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
});

// Coupon 등록하기
app.post("/insert", async (req, res) => {
  // ** 중복된 데이터 있는지 검사
  await db.Coupon.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
});

// Coupon 수정
app.put("/update", async function (req, res) {
  await db.Coupon.update(req.body, {
    where: { coupon_id: req.body.coupon_id },
  })
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
});

// Coupon 삭제
app.delete("/delete", async function (req, res) {
  await db.Coupon.destroy({
    where: { coupon_id: req.body.coupon_id },
  })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

module.exports = app;
