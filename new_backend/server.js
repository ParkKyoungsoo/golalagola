//----------------------------------
// lib
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");

const { Sequelize } = require("sequelize");
const session = require("express-session");
const { userInfo } = require("os");

// --------------------------------------------
// env
const envJson = require(`${__dirname}/env/env.json`);
const uploadFilePath = envJson.uploadFilePath;

//----------------------------------
// middleware

var app = express();

// 보안
app.use(helmet());

// cors
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));

// bodyParser: parse request application/json x-www-form-urlencode
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// models
const models = require("./models/index");

models.sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.log("DB 연결 실패");
    console.log(err);
  });

//----------------------------------
// routes
app.use(uploadFilePath, express.static(path.join(__dirname + uploadFilePath)));
app.use("/api/", require(`${__dirname}/routes/base`));
app.use("/api/auth", require(`${__dirname}/routes/auth`));
app.use("/api/quiz", require(`${__dirname}/routes/quiz`));
app.use("/api/event", require(`${__dirname}/routes/event`));
app.use("/api/coupon", require(`${__dirname}/routes/coupon`));
app.use("/api/product", require(`${__dirname}/routes/product`));
app.use("/api/category", require(`${__dirname}/routes/category`));
app.use("/api/buy", require(`${__dirname}/routes/buy`));
app.use("/api/payment", require(`${__dirname}/routes/payment`));
// app.use("/api/admin/product", require(`${__dirname}/routes/admin/product`));

//----------------------------------
// port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`{init : ${port}}`);
});
