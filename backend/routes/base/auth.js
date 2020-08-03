var express = require("express");
var app = express.Router();
var { User } = require("../../models");
const crypto = require("crypto");
const { response } = require("express");

console.log("auth.js");

app.get("/users/:id", async (req, res) => {
  if (!req.params || !req.params.id) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }

  var selectParams = {
    id: req.params.id,
  };

  var selectQuery = req.mybatisMapper.getStatement(
    "BASE",
    "AUTH.SELECT.TB_VU.001",
    selectParams,
    { language: "sql", indent: "  " }
  );

  let data = [];
  try {
    data = await req.sequelize.query(selectQuery, {
      type: req.sequelize.QueryTypes.SELECT,
    });
    console.log("TCL: data", data);
  } catch (error) {
    res.status(403).send({ msg: "rdb select에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.status(403).send({ msg: "정보가 없습니다." });
    return;
  }

  res.json({
    msg: "RDB에서 정보 꺼내오기",
    user: data.map((x) => {
      x.vu_password = "";
      return x;
    })[0],
  });
});

app.post("/login_process", async (req, res) => {
  try {
    // console.log("login_process try:", req.body.useremail);
    //이메일 값으로 아이디가 존재하는지 확인
    let user = await User.findOne({ where: { useremail: req.body.useremail } });
    // console.log("여긴가?");
    if (user) {
      const obj = {
        useremail: req.body.useremail,
        password: req.body.password,
      };
      console.log(obj);

      const user2 = await User.findOne({ where: { useremail: obj.useremail } });
      if (user2) {
        // 있으면 로그인 처리
        console.log("로그인 처리", user2.useremail);
        console.log("로그인 처리", user2.name);

        res.json({
          message: "로그인 되었습니다!",
          name: user2.name,
          useremail: user2.useremail,
          status: "login",
        });

        // 세션에 저장
        // req.session.save(function () {
        //   response.redirect("/");
        // });
        // req.session.useremail = user2.useremail;

        console.log("res.json", res.json.name);
      } else {
        alert("이메일/패스워드 틀림");
      }
    } else {
      console.log("에러");
    }
  } catch (err) {
    console.log(err);
    res.json({ message: "로그인 실패" });
  }
});

//회원가입
app.post("/join", async (req, res) => {
  console.log("routes/ ... /auth: join");
  try {
    let obj = { useremail: req.body.id };
    console.log("obj:", obj);
    // console.log("req:", req);

    let user = await User.findOne({ where: { useremail: obj.useremail } });
    console.log("user::", user);

    if (user) {
      res.json({
        message: "이메일이 중복되었습니다. 새로운 이메일을 입력해주세요.",
        dupYn: "1",
      });
    } else {
      console.log("in");

      obj = {
        useremail: req.body.id,
        password: req.body.pwd,
        name: req.body.name,
        // salt: buf.toString("base64"),
      };
      user = new User(obj);
      console.log(user);
      await user.save();
      console.log("회원가입 성공");
      res.json({ message: "회원가입 되었습니다!", dupYn: "0" });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// 로그아웃
app.get("/logout_process", (req, res) => {
  console.log("/logout" + req.sessionID);
  req.session.destroy(() => {
    res.json({ message: true });
  });
});

app.post("/update", async (req, res) => {
  try {
    await User.update({
      _id: req.body._id,
      name: req.body.name,
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

app.post("/add", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

app.post("/getAllMember", async (req, res) => {
  try {
    const user = await User.find({});
    res.json({ message: user });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

module.exports = app;
