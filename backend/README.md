# Backend README





### 폴더구조

```
/config

/middleware

/model
	- user.js
	- product.js
	- event.js
	- coupon.js
	- quiz.js
	- kiosk.js
	- buy(더미).js
	
/router
    - admin.js
        - 회원관리
        - 이벤트 CRUD
    - auth.js
        - 회원가입, 로그인, 로그아웃, 정보수정
    - coupon.js
        - 본인쿠폰 조회
    - event.js
        - 이벤트 참여
        - 이벤트 조회, 본인 참여 이벤트 조회
    - product.js
        - 전체 상품 조회
    - quiz.js
    	- quiz 조회
        - quiz 비회원 참여
        - quiz 회원 참여
        
- server.js
```







## mobx store 정보



#### 유저정보(user) 

```json
{
    "user_no": "int",
    "user_email": "email@email.com",
    "user_name": "varchar",
    "user_phone": "01012341234",
    "user_image": "url",
    "user_quiz": "boolean",
    "token": "auth-token",
}
```



#### 모든 상품 정보(product)

```json
[
    {
    	"prod_no": "int",				// 키
        "prod_name": "varchar",			// 상품 이름
        "prod_category": "varchar",		// 품목
        "prod_price": "int",			// 소비자 가격
        "prod_amount": "int",			// 남은 수량
        "prod_expiration": "date",		// 유통기한
        "prod_image": "url",			// 상품 이미지 경로
        "prod_desc": "text",			// 상품 설명
        "prod_sale": "int"				// 최대 할인율
    },
    { ... }
]
```



#### 전체 카테고리 정보(category)

```json
[
  {
    "cat_no": 3,
    "cat_title": "Food",
    "cat_image": "IMAGE-category-food.jpg"
  },
  {
    "cat_no": 14,
    "cat_title": "Movie",
    "cat_image": "IMAGE-category-movie.jpg"
  },
]
```



#### 전체 이벤트 정보(event)

```json
[ // 리스트 형태로 저장
  {
    "event_no": 1,
    "event_category": "Food",
    "event_item": {
      "1": {"prod_name": "안심", "prod_image": "/images/1.jpg"},
      "2": {"prod_name": "등심", "prod_image": "/images/2.jpg"}
    }
  },
  {
    "event_no": 2,
    "event_category": "Snack",
    "event_item": {
      "1": {"prod_name": "새우깡", "prod_image": "/images/A.jpg"},
      "2": {"prod_name": "매운새우깡", "prod_image": "/images/B.jpg"}
    }
  },
  {
    "event_no": 3,
    "event_category": "Snack",
    "event_item": {
      "1": {"prod_name": "새우깡", "prod_image": "/images/A.jpg"},
      "2": {"prod_name": "매운새우깡", "prod_image": "/images/B.jpg"}
    }
  }
]
```







## 서비스 REST API



### 회원 정보 관련 요청



##### 로그인: POST / http://localhost:5000/auth/signin

```json
// request
body: {
	"user_id": "email@email.com",
    "user_pwd": "hash(password)"
}

// 로그인 성공 시 response
body: {
    "message": "signin success",
    "token": "session_key"
}

// 로그인 실패 시 response
body: {
    "message": "아이디가 존재하지 않습니다. or 비밀번호가 다릅니다.",
}
```



##### 로그아웃: POST / http://localhost:5000/auth/signout

```json
// request
header: {
    "token": "session-key"
}

// response
body: {
    "message": "signout success"
}
```



##### 회원가입: POST / http://localhost:5000/auth/signup

```json
// request
body: {
    "user_id": "email@email.com",
    "username": "username",
    "password1": "password1",
    "password2": "password2",
    "연락처": "01012341234",
}

// response
body: {
    "message": "signup success",
    "token": "session_key"
}
```



##### 회원정보 수정: PUT / http://localhost:5000/auth/profile

```json
// request
header {
    "token": "session-key"
},
body: {
    "username": "username",
    "user_img_url": "url",
}

// response
body: {
    "message": "profile update success"
}
```





### 상품 & 카테고리 정보조회 요청



##### 카테고라 정보: GET / http://localhost:5000/category

```json
// response
body: {
    [
        {
            "cat_no": 0,
            "cat_type": "과일/채소",
            "cat_title": "과일/채소",
            "cat_img_url": "images/Fruit_Veg.jpg"
        },
        {
            "cat_no": 1,
            "cat_type": "쌀/잡곡/견과",
            "cat_title": "쌀/잡곡/견과",
            "cat_img_url": "images/Rice.jpg"
        }, 
    	...
    ]
}
```



##### 전체 상품 정보: GET / http://localhost:5000/product

```json
// request
없음

// response
body: {
    [
        {
            "prod_no": "int",				// 키
            "prod_name": "varchar",			// 상품 이름
            "prod_category": "varchar",		// 품목
            "prod_price": "int",			// 소비자 가격
            "prod_amount": "int",			// 남은 수량
            "prod_expiration": "date",		// 유통기한
            "prod_image": "url",			// 상품 이미지 경로
            "prod_desc": "text",			// 상품 설명
            "prod_sale": "int"				// 최대 할인율
        },
        { ... }
    ]
}
```





### 이벤트 & 퀴즈 관련 요청



#### Kiosk(비회원 서비스)

##### 진행되고 있는 퀴즈 정보: GET / http://localhost:5000/quiz

```json
// request
없음

// response
body: {
  	[
    	{
            "quiz_question": "찬석이는 잘생겼나요?",
            "quiz_answer": true,
            "quiz_hint": "힌트 : 찬석이는 아주 인기가 좋습니다."
    	},
    	{
            "quiz_question": "재경이는 잘생겼나요?",
            "quiz_answer": true,
            "quiz_hint": "힌트 : 재경이는 아주 인기가 좋습니다."
    	}
  	]
}
```



##### (비회원) 퀴즈 참여: POST / http://localhost:5000/quiz/

```json
// request
header {
    "token": "null"
},

// response
body: {
    "message": "non-user quiz success"
}
```







#### WEB(회원 서비스)



##### (회원) 퀴즈 참여: POST / http://localhost:5000/quiz/

```json
// request
header {
    "token": "session-key"
},

// response
body: {
    "message": "${user_no}user quiz success"
}
```



##### 진행되고 있는 이벤트 정보: GET / http://localhost:5000/event

```json
// request
header: {
    "token": "null"
},

// response
[
  {
    "event_no": 1,
    "event_category": "Food",
    "event_item": {
      "1": {"prod_name": "안심", "prod_image": "/images/1.jpg"},
      "2": {"prod_name": "등심", "prod_image": "/images/2.jpg"}
    }
  },
  ...
]
```



##### 이벤트 참여: POST / http://localhost:5000/event/

```json
// request
header {
    "token": "session-key"
},
body: {
    "event_no": "event_no",
    "prod_no": "prod_no"
}

// response
body: {
    "message": "${user_no}user ${event_no}event ${prod_no}prod pick"
}
```



##### 소유 쿠폰 정보(행사 페이지, 마이쿠폰 페이지): GET / http://localhost:5000/coupon/

```json
// request
header {
    "token": "session-key"
},

// response
body: {
    [
        {
            "event_no": "1",
            "coupon_select": "3",
            "coupon_use": false
        },
        {
 			"event_no": "2",
            "coupon_select": "7",
            "coupon_use": true
        }
    ]
}

```





### 관리자 페이지 관련 요청



#### 상품 & 카테고리 CUD 요청





통계 부분은 모두 common context로 관리해야 할 듯



행사 등록: POST / 

```json
// request


// response

```



행사 취소: DELETE / 

```json
// request


// response

```



행사 수정: PUT / 

```json
//request


// response

```



유저 삭제

```json
// request


// response

```



유저 정보 조회

```json
// request


// response

```



유저 정보 수정

````json
// request


// response

```