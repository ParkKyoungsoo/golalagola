const express = require("express");
const app = express.Router();
const db = require("../models");

// 바코드 리더기 찍을 시, 쿠폰 사용
app.put("/:input_userId", async (req, res) => {
  console.log("req", req.data);
  console.log("input", req.params.input_userId);
  await db.Coupon.update(
    { coupon_use: true },
    {
      where: { user_id: req.params.input_userId },
    }
  )
    .then(async (data) => {
      console.log("data", data);
      res.status(200).send({ message: "결제 완료" });
    })
    .catch((err) => {
      res.status(404).send({ message: "결제 실패" });
    });
});

module.exports = app;
