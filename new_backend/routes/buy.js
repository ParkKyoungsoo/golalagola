const express = require("express");
const app = express.Router();
const db = require("../models");

// 일별 판매량
app.get("/dailySale", async function (req, res) {
  var obj = new Object();
  await db.Buy.findAll()
    .then(async (buyData) => {
      for (var i = 0; i < buyData.length; i++) {
        await db.Product.findOne({
          where: { prod_id: buyData[i].dataValues.prod_id },
        })
          .then((prodData) => {
            var dateSlice = buyData[i].dataValues.buy_date + "";
            var dateArr = dateSlice.split(" ");
            if (dateArr[1] == "Jan") dateArr[1] = "01";
            else if (dateArr[1] == "Feb") dateArr[1] = "02";
            else if (dateArr[1] == "Mar") dateArr[1] = "03";
            else if (dateArr[1] == "Apr") dateArr[1] = "04";
            else if (dateArr[1] == "May") dateArr[1] = "05";
            else if (dateArr[1] == "Jun") dateArr[1] = "06";
            else if (dateArr[1] == "Jul") dateArr[1] = "07";
            else if (dateArr[1] == "Aug") dateArr[1] = "08";
            else if (dateArr[1] == "Sep") dateArr[1] = "09";
            else if (dateArr[1] == "Oct") dateArr[1] = "10";
            else if (dateArr[1] == "Nov") dateArr[1] = "11";
            else if (dateArr[1] == "Dev") dateArr[1] = "12";
            if (obj[dateArr[3] + "-" + dateArr[1] + "-" + dateArr[2]]) {
              obj[dateArr[3] + "-" + dateArr[1] + "-" + dateArr[2]] +=
                buyData[i].dataValues.buy_amount *
                prodData.dataValues.prod_price;
            } else {
              obj[dateArr[3] + "-" + dateArr[1] + "-" + dateArr[2]] =
                buyData[i].dataValues.buy_amount *
                prodData.dataValues.prod_price;
            }
          })
          .catch((err) => res.send(err)); // prodData then
      }

      res.json(obj);
    }) // buyData then
    .catch((err) => res.status(404).send(err));
});

// 제품별 구매현황
app.get("/buyAmount", async function (req, res) {
  var obj = new Object();
  db.Buy.findAll().then((buyData) => {
    buyData.forEach((element) => {
      if (obj[element.dataValues.prod_id]) {
        obj[element.dataValues.prod_id] += element.dataValues.buy_amount;
      } else {
        obj[element.dataValues.prod_id] = element.dataValues.buy_amount;
      }
    });
    res.json(obj);
  });
});

// 이 부분 now()로 받으면 위에 처럼 빈칸으로 바꿔야되ㅣ!!!!!!! 나중에 바코드 리더기 오면 이부분  위에처럼 고쳐야되!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get("/couponUseSale", async function (req, res) {
  var obj = new Object();
  await db.Coupon.findAll()
    .then(async (couponData) => {
      for (var i = 0; i < couponData.length; i++) {
        if (couponData[i].dataValues.coupon_useDate != null) {
          await db.Product.findOne({
            where: { prod_id: couponData[i].dataValues.coupon_select },
          })
            .then((prodData) => {
              var dateSlice = couponData[i].dataValues.coupon_useDate + "";
              var dateArr = dateSlice.split("-");
              // if (dateArr[1] == "Jan") dateArr[1] = "01";
              // else if (dateArr[1] == "Feb") dateArr[1] = "02";
              // else if (dateArr[1] == "Mar") dateArr[1] = "03";
              // else if (dateArr[1] == "Apr") dateArr[1] = "04";
              // else if (dateArr[1] == "May") dateArr[1] = "05";
              // else if (dateArr[1] == "Jun") dateArr[1] = "06";
              // else if (dateArr[1] == "Jul") dateArr[1] = "07";
              // else if (dateArr[1] == "Aug") dateArr[1] = "08";
              // else if (dateArr[1] == "Sep") dateArr[1] = "09";
              // else if (dateArr[1] == "Oct") dateArr[1] = "10";
              // else if (dateArr[1] == "Nov") dateArr[1] = "11";
              // else if (dateArr[1] == "Dev") dateArr[1] = "12";
              if (obj[dateArr[0] + "-" + dateArr[1] + "-" + dateArr[2]]) {
                obj[dateArr[0] + "-" + dateArr[1] + "-" + dateArr[2]] +=
                  prodData.dataValues.prod_price;
              } else {
                obj[dateArr[0] + "-" + dateArr[1] + "-" + dateArr[2]] =
                  prodData.dataValues.prod_price;
              }
            })
            .catch((err) => res.send(err)); // prodData then
        } else {
          continue;
        }
      }

      res.json(obj);
      //   res.json(obj);
    }) // buyData then
    .catch((err) => res.status(404).send(err));
});

module.exports = app;
