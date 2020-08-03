const express = require("express");
const app = express.Router();

// 페이지 리로드 시 업데이트될 정보들을 반환하는 요청이 들어올 공간입니다.
app.get("/", async function (req, res) {
  res.json({ msg: "commonContext 갱신이 필요합니다." });
});

module.exports = app;
