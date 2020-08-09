const express = require("express");
const app = express.Router();
const db = require("../models");
const crypto = require("crypto");
const { response } = require("express");
const config = require("../config/config.json");
const nodemailer = require("nodemailer");
const smtpTransporter = require("nodemailer-smtp-transport");

// jwt middleware
const authMiddleware = require("../middleware/auth");
const authAdminMiddleware = require("../middleware/authAdmin");

// jwt
const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt");
const { rejects } = require("assert");

// 로그인
app.post("/signin", async (req, res) => {
  // 이미 로그인이 되어있다면 이미 되어있다고 알리기
  if (req.headers.token) {
    res.status(403).json({ message: "이미 로그인 되어있습니다." });
  } else {
    const reqeustData = req.body;
    //이메일 값으로 아이디가 존재하는지 확인
    await db.User.findOne({
      where: {
        user_email: reqeustData.user_email,
      },
    })
      .then((user) => {
        const userData = user.dataValues;

        const encrypted = crypto
          .createHmac("sha1", config.secret)
          .update(reqeustData.user_pwd)
          .digest("base64");
        // console.log("login", encrypted);
        // 비밀번호 일치 여부 확인
        if (userData.user_pwd !== encrypted) {
          res.status(403).send({ message: "비밀번호가 일치하지 않습니다." });
        } else {
          // 아아디, 비밀번호 일치
          // console.log("id/pwd", userData);
          const token = jwt.sign(
            {
              // 첫번째 인자: 로그인을 위한 정보
              user_email: userData.user_email,
              user_pwd: encrypted,
              isAdmin: userData.isAdmin,
            },
            // 두번째 인자: 비밀 키
            secretObj.secret,
            // 세번째 인자:  유효 시간
            { expiresIn: "1h" },

            // 네번째 인자: 콜백함수
            function (err, token) {
              if (err) {
                res.send(err);
              } else {
                res.json({
                  message: "로그인에 성공하여 토큰이 발급되었습니다.",
                  token: token,
                });
                res.json({
                  message: "로그인에 성공하여 토큰이 발급되었습니다.",
                });
              }
            }
          );
        }
      })
      .catch((err) => {
        res.status(403).send({ message: "존재하지 않는 아이디 입니다." });
      });
  }
});

// 이메일 보내는 주체
var smtpTransport = nodemailer.createTransport(
  smtpTransporter({
    service: "Gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "gusangbuck@gmail.com",
      pass: "728q728q@",
    },
  })
);

//회원가입
app.post("/signup", async (req, res) => {
  // 이미 로그인이 되어있다면 이미 되어있다고 알리기
  console.log("로긍니 시도", req.body);
  if (req.headers.token) {
    res.status(403).json({ message: "이미 로그인 되어있습니다." });
  } else {
    const reqeustData = req.body;

    // email 중복 확인
    await db.User.findOne({
      where: { user_email: reqeustData.user_email },
    }).then((user) => {
      // 중복이면 중복 메세지 보내기
      if (user) {
        res.status(403).send({ message: "이미 존재하는 아이디입니다." });
      } else {
        // 비밀번호 확인하기
        if (reqeustData.password_1 !== reqeustData.password_2) {
          res.status(403).send({ message: "비밀번호 확인이 잘못되었습니다." });
        } else {
          // 인증코드 생성하기
          var key_one = crypto.randomBytes(256).toString("hex").substr(100, 5);
          var key_two = crypto
            .randomBytes(256)
            .toString("base64")
            .substr(50, 5);
          var key_for_verify = key_one + key_two;

          // 비밀번호 암호화
          const encrypted = crypto
            .createHmac("sha1", config.secret)
            .update(reqeustData.password_1)
            .digest("base64");

          db.User.create({
            user_email: reqeustData.user_email,
            user_pwd: encrypted,
            user_name: reqeustData.user_name,
            user_phone: reqeustData.user_phone,
            key_verify: key_for_verify,
            // isAdmin: reqeustData.isAdmin,
          }).then(() => {
            //옵션
            var mailOpt = {
              from: "Gola la Gola",
              to: reqeustData.user_email,
              subject: "Gola la Gola [회원가입] 인증 메일입니다.",
              html:
                "<div align='center' style='border:1px solid black; font-family:verdana'>" +
                "<h3 style='color: blue;'>" +
                reqeustData.user_email +
                "님 회원가입을 환영합니다.</h3>" +
                "<h1>이메일 인증을 위해 인증버튼을 클릭해주세요.</h1><br>" +
                "<form method='post' action='https://i3b309.p.ssafy.io/api/auth/approval'>" +
                "<input type='hidden' name='user_email' value='" +
                reqeustData.user_email +
                "'>" +
                "<input type='hidden' name='key_verify' value='" +
                key_for_verify +
                "'>" +
                "<input type='submit' value='인증'></form><br/></div>",
            };
            //전송
            smtpTransport.sendMail(mailOpt, function (err, res) {
              if (err) {
                res.json({ message: err });
              } else {
                // res.send({ message: "email has been sent." });
                console.log("이메일 전송");
              }
              smtpTransport.close();
            });
            res.send(
              '<script type="text/javascript">alert("이메일을 확인하세요."); window.location="/"; </script>'
            );
          });

          res.status(200).send({
            message: "이메일 인증 후 사용해주세요.",
            user_email: reqeustData.user_email,
          });
        }
      }
    });
  }
});

// 회원가입 후 이메일 인증
app.post("/approval", async (req, res) => {
  await db.User.update(
    { email_verify: true },
    {
      where: { key_verify: req.body.key_verify },
    }
  )
    .then(() =>
      res.send(
        '<script type="text/javascript">alert("인증이 완료되었습니다. 로그인 후 이용하세요."); window.location="https://i3b309.p.ssafy.io/"; </script>'
      )
    )
    .catch((err) =>
      res.send(
        '<script type="text/javascript">alert("Not ??"); window.location="/"; </script>'
      )
    );
});

// 비밀번호 찾기
app.post("/find_pwd", async (req, res) => {
  if (req.headers.token) {
    res.status(403).json({ message: "이미 로그인 되어있습니다." });
  } else {
    const reqeustData = req.body;
    //이메일 값으로 아이디가 존재하는지 확인
    await db.User.findOne({
      where: {
        user_email: reqeustData.user_email,
      },
    })
      .then((user) => {
        // 인증코드 생성하기
        var key_one = crypto.randomBytes(256).toString("hex").substr(100, 5);
        var key_two = crypto.randomBytes(256).toString("base64").substr(50, 5);
        var key_for_verify = key_one + key_two;

        db.User.update(
          {
            user_pwd: key_for_verify, // 현재 비밀번호를 임시비밀번호로 바꾸기
          },
          {
            where: { user_email: user.user_email },
          }
        )
          .then((data) => {
            //옵션
            var mailOpt = {
              from: "Gola la Gola",
              to: reqeustData.user_email,
              subject: "Gola la Gola [비밀번호 찾기] 인증 메일입니다.",
              html:
                "<div align='center' style='border:1px solid black; font-family:verdana'>" +
                "<h3 style='color: blue;'>" +
                reqeustData.user_email +
                "님 임시 비밀번호를 발급해드립니다.</h3>" +
                "<h1>홈페이지로 이동하셔서 비밀번호를 변경하시길 바랍니다</h1><br>" +
                "임시 비밀번호는 " +
                key_for_verify +
                "입니다." +
                "</div>",
            };
            //전송
            smtpTransport.sendMail(mailOpt, function (err, res) {
              if (err) {
                res.json({ message: err });
              } else {
                res.json({ message: "email has been sent." });
              }
              smtpTransport.close();
            });

            res.json({ message: "임시 비밀번호가 메일로 발급되었습니다." });
          })
          .catch((err) => res.json(err));
      })
      .catch((err) => {
        res.json({ message: "존재하지 않는 이메일입니다." });
      });
  }
}); // post

// const token = req.headers["token"] || req.query.token;
// jwt.verify(token, secretObj.secret, function (err, decoded) {
//   console(err);
//   console(docoded);
// });

// 회원정보 수정
// app.put("/update", authMiddleware);
app.put("/update", async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    res.status(403).send({ message: "로그인 되어있지 않습니다." });
  } else {
    // 사용자 검증
    jwt.verify(token, secretObj.secret, function (err, decoded) {
      if (err) {
        res.status(403).send({ message: "로그인이 만료되었습니다." });
      } else {
        // 수정을 요청하는 사용자와 로그인 되어있는 사용자의 정보가 같아야함
        if (decoded.user_email !== req.headers.user_email) {
          res.status(403).send({ message: "인증된 사용자가 아닙니다." });
        } else {
          db.User.update(
            {
              user_pwd: req.body.user_pwd,
              user_name: req.body.user_name,
              user_phone: req.body.user_phone,
              user_image: req.body.user_image,
            },
            {
              where: { user_email: decoded.user_email },
            }
          );
          res.status(200).send({ message: "회원정보가 수정되었습니다." });
        }
      }
    });
  }
});

// User 전체 조회
// app.get("/", authAdminMiddleware);
app.get("/", async function (req, res) {
  db.User.findAll()
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
});

// User 한개 조회
// app.get("/:input_id", authAdminMiddleware);
app.get("/:input_id", async function (req, res) {
  db.User.findOne({
    where: {
      user_id: req.params.input_id,
      event_id: req.params.input_id,
    },
  })
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
});

// User 삭제
// app.delete("/", authAdminMiddleware);
app.delete("/", async function (req, res) {
  await db.User.destroy({
    where: { user_id: req.body.user_id },
  })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

module.exports = app;
