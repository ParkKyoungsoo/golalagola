const express = require("express");
const app = express.Router();
const db = require("../models");

const authMiddleware = require("../middleware/auth");
const authAdminMiddleware = require("../middleware/authAdmin");

// 상품 전체 조회
app.get("/", async function (req, res) {
  db.Product.findAll()
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
});

// 상품 한개 조회
app.get("/:input", async function (req, res) {
  db.Product.findOne({
    where: { prod_id: req.params.input },
  })
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
});

// 상품 등록하기
// app.post("/", authAdminMiddleware);
app.post("/", async (req, res) => {
  // ** 관리자인지 확인하기

  // ** 중복된 데이터 있는지 검사

  await db.Product.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
});

// 상품 수정
// app.put("/", authAdminMiddleware);
app.put("/", async function (req, res) {
  // const course = update.find((c) => c.id === parseInt(req.params.id));
  // if (!course) res.status(404).send(`ID was not found`);

  await db.Product.update(req.body, {
    where: { prod_id: req.body.prod_id },
  })
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
});

// 상품 삭제
// app.delete("/", authAdminMiddleware);
app.delete("/", async function (req, res) {
  await db.Product.destroy({
    where: { prod_id: req.body.prod_id },
  })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

module.exports = app;
