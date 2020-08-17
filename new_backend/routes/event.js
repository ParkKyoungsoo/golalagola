const express = require("express");
const app = express.Router();
const db = require("../models");

const authMiddleware = require("../middleware/auth");
const authAdminMiddleware = require("../middleware/authAdmin");

// Event 전체 조회
app.get("/eventProd", async function (req, res) {
  let arr = [];
  db.Event.findAll().then((data) => {
    for (var i = 0; i < data.length; i++) {
      arr.push(data[i].dataValues.event_prod_A);
      arr.push(data[i].dataValues.event_prod_B);
    }
    res.send(arr);
  });
});
app.get("/eventId", async function (req, res) {
  let arr = [];
  db.Event.findAll().then((data) => {
    for (var i = 0; i < data.length; i++) {
      arr.push(data[i].dataValues.event_id);
    }
    res.send(arr);
  });
});

app.get("/", async function (req, res) {
  var resList = new Array();

  // json 가공
  db.Event.findAll()
    .then((data) => {
      for (var i = 0; i < data.length; i++) {
        var obj = new Object();
        obj.event_id = data[i].dataValues.event_id;
        obj.event_category = data[i].dataValues.event_category;

        obj.event_item = {
          1: { prod_id: data[i].dataValues.event_prod_A },
          2: { prod_id: data[i].dataValues.event_prod_B },
        };

        resList.push(obj);
      }

      res.json(resList);
    })
    .catch((err) => res.status(404).send(err));

  console.log(resList);

  // for(var i=0 ; i<db.Product.length;i++){
  //   db.Product.findOne({
  //     where:{prod_}
  //   })
  // .then((data) => {

  // })
  // }
});

// Event 한개 조회
// app.get("/selectOne/:input_id", async function (req, res) {
//   db.Event.findOne({
//     where: { event_id: req.params.input_id },
//   })
//     .then((data) => res.json(data))
//     .catch((err) => res.status(404).send(err));
// });

// Event 등록하기
// app.post("/", authAdminMiddleware);
app.post("/", async (req, res) => {
  // ** 중복된 데이터 있는지 검사
  await db.Event.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
});

// Event 수정
// app.put("/", authAdminMiddleware);
app.put("/", async function (req, res) {
  await db.Event.update(req.body, {
    where: { event_id: req.body.event_id },
  })
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
});

// Event 삭제
// app.delete("/", authAdminMiddleware);
app.delete("/", async function (req, res) {
  await db.Event.destroy({
    where: { event_id: req.body.event_id },
  })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

// 사용자의 특정 이벤트 참여 요청
// app.post("/", function (req, res) {
//   console.log(req.body);
//   res.json({
//     message: `${req.headers.token} user ${req.body.event_no} event ${req.body.prod_no} prod pick`,
//   });
// });

module.exports = app;
