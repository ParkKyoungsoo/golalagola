var express = require("express");
var app = express.Router();

console.log("base.js");

app.get("/", async function (req, res) {
  res.redirect("https://www.google.com");
});

app.post("/", function (req, res) {
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

app.put("/", function (req, res) {
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.delete("/", function (req, res) {
  res.json({ success: "delete call succeed!", url: req.url });
});

app.get("/login_process", function (req, res) {
  console.log("req.body");
  res.json({ success: "success", url: req.url, body: req.body });
});

module.exports = app;
