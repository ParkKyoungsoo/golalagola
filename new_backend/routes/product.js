const express = require("express");
const app = express.Router();
const db = require("../models");

const bodyParser = require("body-parser");
const Product = require("../models/Product");
app.use(bodyParser.urlencoded({ extended: false }));

console.log("product routes");
/*
get 조회
post 생성
put 갱신
delete 삭제
*/
// 카테고리의 구분 없이 모든 상품 조회 요청
app.get("/", async function (req, res) {
  // console.log("req", req);

  db.Product.findAll()
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
});

app.get("/selectOne/:input", async function (req, res) {
  console.log("req.params.input", req.params.input);
  db.Product.findOne({
    attributes: {
      exclude: ["id", "createdAt", "updatedAt"],
    },
    where: { prod_id: req.params.input },
  })
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
});

// 상품 등록하기
app.post("/insert", async (req, res) => {
  console.log("req.body:", req.body);
  try {
    // let product = await Product.findOne({
    //   attributes: {
    //     exclude: ["id", "createdAt", "updatedAt"],
    //   },
    //   where: { prod_name: req.params.name },
    // });
    // console.log("product:", product);

    const req_body = {
      prod_title: req.body.title,
      prod_name: req.body.name,
      prod_category: req.body.category,
      prod_expiration: req.body.expiration,
    };
    console.log("req_body", req_body);
    db.Product.create(req_body)
      .then((data) => res.json(data))
      .catch((err) => res.status(404).send(err));

    res.json({ msg: "상품등록 성공" });
  } catch (err) {
    res.json({ msg: "상품등록 실패" });
  }
});

app.delete("/delete");

module.exports = app;
