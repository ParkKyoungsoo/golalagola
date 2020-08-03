const express = require("express");
const app = express.Router();

// 사용자가 소유한 모든 쿠폰의 정보를 조회 요청
app.get("/", async function (req, res) {
  if (req.headers.token !== undefined) {
    res.json([
      {
        event_no: "1",
        coupon_select: "3",
        coupon_use: false,
      },
      {
        event_no: "2",
        coupon_select: "7",
        coupon_use: true,
      },
    ]);
  } else {
    res.json({ message: "no token" });
  }
});

module.exports = app;
