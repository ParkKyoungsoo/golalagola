const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt");

const authMiddleware = (req, res, next) => {
  // read the token from header or url
  const token = req.headers.token;

  // token does not exist
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "로그인 되어있지 않습니다.",
    });
  }

  // create a promise that decodes the token
  const p = new Promise((resolve, reject) => {
    jwt.verify(token, secretObj.secret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });

  // if it has failed to verify, it will return an error message
  const onError = (error) => {
    res.status(403).json({
      success: false,
      message: error.message,
    });
  };

  // process the promise
  p.then((decoded) => {
    if (decoded.user_email != req.headers.user_email) {
      res.status(403).send({ message: "인증된 사용자가 아닙니다." });
    } else {
      next();
    }
  }).catch(onError);
};

module.exports = authMiddleware;
