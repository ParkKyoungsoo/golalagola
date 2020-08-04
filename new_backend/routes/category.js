const express = require("express");
const app = express.Router();
const db = require("../models");

// 모든 카테고리 정보 요청
app.get("/", async function (req, res) {
  db.Category.findAll()
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
});

module.exports = app;
