const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");
const cors = require("cors");
var helmet = require("helmet");

const { Sequelize } = require("sequelize");
var session = require("express-session");
const { userInfo } = require("os");
var FileStore = require("session-file-store")(session);

// var indexRouter = require("./routes/index");
// var sequelize = require("./models").sequelize;
var app = express();
// sequelize.sync();
console.log("server.js");

// 보안
app.use(helmet()); // 이거 한줄 적어놓기만 하면 됨.

const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
// app.use("/", indexRouter);
// app.use(uploadFilePath, express.static(path.join(__dirname + uploadFilePath)));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   session({
//     // session()이라는 함수를 실행하면 session이 시작하고 미들웨어가 개입해서 app이 session을 사용할 수 있도록 처리해준다.
//     secret: "asadlfkj!@#!@#dfgasdg",
//     resave: false, // session데이터가 바뀌기 전까지 다시 저장하지 않는다. true면 값이 안 바뀌어도 store에 계속 저장한다. 그냥 false로 해
//     saveUninitialized: true, // session이 필요하기 전까지 session을 구동시키지 않는다.
//     store: new FileStore(), // session 미들웨어는 store(메모리)에 저장한다. -> 어디에 저장할지 설정, sessions폴더에 파일이 생성된다. file이 아니라 mysql로도 가능
//   })
// );

app.use("/base/base", require(`${__dirname}/routes/base/base`));
app.use("/base/auth", require(`${__dirname}/routes/base/auth`));
app.use("/index", require(`${__dirname}/routes/index`));

app.get("/test", function (req, res) {
  res.send("Hello node.js");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
