const express = require("express");
const app = express.Router();

// 카테고리의 구분 없이 모든 이벤트 조회 요청
app.get("/", async function (req, res) {
  res.json([
    {
      event_no: 1,
      event_category: 3,
      event_item: {
        "1": {
          prod_no: 3,
          prod_name: "안심",
          prod_image: "/images/1.jpg",
        },
        "2": {
          prod_no: 4,
          prod_name: "등심",
          prod_image: "/images/2.jpg",
        },
      },
    },
    {
      event_no: 2,
      event_category: 5,
      event_item: {
        "1": {
          prod_no: 1,
          prod_name: "새우깡",
          prod_image: "/images/1.jpg",
        },
        "2": {
          prod_no: 2,
          prod_name: "매운새우깡",
          prod_image: "/images/2.jpg",
        },
      },
    },
  ]);
});

// 사용자의 특정 이벤트 참여 요청
app.post("/", function (req, res) {
  console.log(req.body);
  res.json({
    message: `${req.headers.token} user ${req.body.event_no} event ${req.body.prod_no} prod pick`,
  });
});

module.exports = app;
