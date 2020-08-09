const express = require("express");
const app = express.Router();
const db = require("../models");

const authMiddleware = require("../middleware/auth");
const authAdminMiddleware = require("../middleware/authAdmin");

// Coupon 전체 조회
app.get("/", async function (req, res) {
  db.Coupon.findAll()
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
});

// Coupon 한개 조회
app.get("/:input_user_id", async function (req, res) {
  db.Coupon.findOne({
    where: {
      user_id: req.params.input_user_id,
    },
  })
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
});

// Coupon 등록하기
// app.post("/", authMiddleware);
app.post("/", async (req, res) => {
  // ** 중복된 데이터 있는지 검사
  await db.Coupon.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
});

// Coupon 수정
// app.put("/", authAdminMiddleware);
app.put("/", async function (req, res) {
  await db.Coupon.update(req.body, {
    where: { coupon_id: req.body.coupon_id },
  })
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
});

// Coupon 삭제
// app.delete("/", authAdminMiddleware);
app.delete("/", async function (req, res) {
  await db.Coupon.destroy({
    where: { coupon_id: req.body.coupon_id },
  })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

// 이벤트 상품 겹치면 곤란해....
app.get("/realtime", async (req, res) => {
  var eventProd = new Array(); // 이벤트 등록 상품 id
  var productName = new Array();
  var couponSelect = new Array(); // 사용자들이 이벤트 참여해서 클릭한(원하는) 상품의 개수

  // 이벤트 등록 상품 모두 가져오기
  await db.Event.findAll()
    .then((eventData) => {
      for (var i = 0; i < eventData.length; i++) {
        eventProd.push(eventData[i].dataValues.event_prod_A);
        eventProd.push(eventData[i].dataValues.event_prod_B);
        couponSelect[i * 2] = 0;
        couponSelect[i * 2 + 1] = 0;
      }
      console.log("obj", obj);
      console.log("eventProd", eventProd); // 이벤트에 등록한 상품 prod_id 모음

      db.Product.findAll()
        .then((productData) => {
          for (var i = 0; eventProd.length; i++) {
            for (var j = 0; j < productData.length; j++) {
              if (eventProd[i] == productData[j].dataValues.prod_id) {
                productName.push(productData[j].dataValues.prod_name);
                break;
              }
            }
            if (productName.length == eventProd.length) break;
          }

          db.Coupon.findAll()
            .then((couponData) => {
              for (var i = 0; i < couponData.length; i++) {
                for (var j = 0; j < eventProd.length; j++) {
                  if (eventProd[j] == couponData[i].dataValues.coupon_select) {
                    couponSelect[j] += 1;
                    break;
                  }
                  if (eventProd.length - 1 === j) {
                    couponSelect[j] = 0;
                  }
                }
              }

              // 객체로 바꾸기
              var objList = new Array();
              for (var i = 0; i < eventProd.length; i++) {
                var obj = new Object();
                obj.event_prod = eventProd[i];
                obj.coupon_select = couponSelect[i];
                obj.prod_name = productName[i];
                objList.push(obj);
              }

              // 오름차순 정렬
              var sortingField = "coupon_select";
              objList.sort(function (a, b) {
                return b[sortingField] - a[sortingField];
              });

              console.log(objList);

              res.json(objList);
            })
            .catch((err) =>
              res.json({ msg: "쿠폰에 등록된 상품이 이벤트 상품에 없습니다." })
            );
        })
        .catch((err) => res.json("Product에 등록된 상품이 없습니다."));
    })
    .catch((err) => res.json({ meg: "Event에 등록된 상품이 없습니다." }));
});

module.exports = app;
