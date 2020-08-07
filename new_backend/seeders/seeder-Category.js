"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [
      {
        cat_id: 100,
        cat_title: "전체",
        cat_image: "images/bono.jpg",
      },
      {
        cat_id: 1,
        cat_title: "냉장 / 냉동 / 간편식",
        cat_image: "images/Simple.jpg",
      },
      {
        cat_id: 2,
        cat_title: "과일/채소",
        cat_image: "images/Fruit_Veg.jpg",
      },
      {
        cat_id: 3,
        cat_title: "쌀/잡곡/견과",
        cat_image: "images/Rice.jpg",
      },
      {
        cat_id: 4,
        cat_title: "정육/계란",
        cat_image: "images/Meat.jpg",
      },
      {
        cat_id: 5,
        cat_title: "수산물/건해산",
        cat_image: "images/Fish.png",
      },
      {
        cat_id: 6,
        cat_title: "우유/유제품",
        cat_image: "images/Milk.jpg",
      },
      {
        cat_id: 7,
        cat_title: "김치/반찬",
        cat_image: "images/Kimchi.jpg",
      },

      {
        cat_id: 8,
        cat_title: "라면 / 면류 /  즉석식품",
        cat_image: "images/Ramen.jpg",
      },
      {
        cat_id: 9,
        cat_title: "생수 / 음료 / 주류",
        cat_image: "images/water.jpg",
      },
      {
        cat_id: 10,
        cat_title: "장류 / 양념 / 가루 / 오일",
        cat_image: "images/Source.jpg",
      },
      {
        cat_id: 11,
        cat_title: "과자 / 간식 / 시리얼 / 빙과",
        cat_image: "images/Cookie.jpg",
      },
      {
        cat_id: 12,
        cat_title: "베이커리 / 잼 / 샐러드",
        cat_image: "images/Bread.jpg",
      },
      {
        cat_id: 13,
        cat_title: "세제 / 제지 / 위생용품",
        cat_image: "images/Detergent.jpg",
      },
    ];

    return queryInterface.bulkInsert("categories", datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
