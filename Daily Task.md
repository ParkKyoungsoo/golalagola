## Daily Task

#### 2020.07.20 (일)

1. Scrum 미팅
2. 명세 확인 및 개발환경 구축



#### 2020.07.20 (월)

1. Scrum 미팅
2. Git flow, Jira 사용법 숙달
3. Epic, Story 등록 후 1주차 Sprint 보드 생성
4. sub1 frontend pjt 이관
5. 기능개선 회의 및 와이어 프레임 수정



#### 2020.07.21 (화)

1. Scrum 미팅
2. Git commit 양식 도출
3. 강사, 코치 면담
4. Front-end: kioskpage 구축
   Back-end: 회원정보 CRUD 구축



#### 2020.07.22 (수)

1. Scrum 미팅

2. Front-end: 

   Kiosk Main 페이지 구축

   Kiosk Detail 페이지 구축



#### 2020.07.23(목)

1. Scrum 미팅

2. 깃 이미지 식별

3. Front-end: 프로젝트 맹점 회의, 전면 수정, 키오스크 로직 수정

   Back-end: 유저 모델 제작4

   ​					DB Sequelize

   

#### 2020.07.24(금)

1. Scrum 미팅

2. 라즈베리파이 OS 환경 설정 (2대)

3. Front-end: Quiz 창 만들기

   ​					Modal

   Back-end:



#### 2020.07.26(일)

1. Scrum 미팅
2. Front-end: Kiosk 기능 구현



#### 2020.07.27(월)

1. Scrum 미팅

2. 시퀀스 다이어그램 수정

3. README 수정

4. 지라 sub2 2주차 sprint 만들기 및 한주 계획

5. Front-end:  Kiosk Css

   ​					 Web Main 기능 구현

   ​					 Redux 공부

   Back-end:   데이터 모델링 회의



#### 2020.07.28(화)

1. Scrum 미팅

2. README 수정

3. Front-end: Web Main 기능 구현

   ​					Web ItemDetail 기능 구현
   
   Back-end: 로그인, 로그아웃 기능 구현



#### 2020.07.29(수)

1. Scrum 미팅

2. Front-end  데이터 추가

   ​					Web 기능 및 CSS 수정
   
   Back-end	데이터 modeling



#### 2020.07.30(목)

1. Scrum 미팅

2. 강사님 미팅

3. Front-end      Web 기능, CSS 수정

   ​				 	   Web 쿠폰 페이지

   ​					    Web Quiz 페이지 버튼 클릭, CSS 수정 

   ​						commonContext 있는 값 수정
   
   ​						dump.json
   
   Back-end	서버 배포
   
4. 발표 자료 제작



#### 2020.07.31(금)

1. Scrum 미팅

2. 발표 준비

3. Front-end    

   Back-end	Aws에 Api 요청 보내 Local 에서 사용할 수 있도록
   
   ​					Aws DataBase 사용

#### 2020.08.03(월)

1. Scrum 미팅

2. Back-end	http -> https

   ​					데이터 가공

#### 2020.08.04(화)

1. Scrum 미팅

2. Front-end  Web Navbar 수정

   ​					Web Detail 페이지 수정

   ​					관리자 Event (VS) 모아보기 페이지 제작 (CRUD)

   ​					Web 실시간 순위

   Back-end	이메일 인증

3. JIRA 정리



#### 2020.08.05(수)

1. Scrum 미팅

2. Front-end   Kiosk 페이지 CSS

   ​					Kiosk Timeout 에러 잡기

   ​					데이터 추가 (Product)

   ​					데이터 서버에서 받아오기 (캐로젤, ~~카테고리~~, Quiz)

   ​					관리자 이벤트 페이지

   ​					Path 조정 (뒤로가기)

   ​					이벤트 (VS) 페이지 C

   ​					디테일 페이지 틀 잡기

   ​					Main 리스트에 데이터 표시

   Back-end	서버 오류 잡기

3. JIRA 정리



#### 2020.08.06(목)

1. 발표 준비 (종례 이후)

   README 정리

   와이어프레임 정리

   PPT

   시연 영상

2. Front-end   실시간

   ​					Web Main 페이지 고치기 

   ​					Web Detail 페이지 고치기

   ​					Web Result 페이지 고치기

   ​					Kiosk Timeout & 새로고침 버튼 추가

   ​					Axios 요청

   ​					회원정보

   ​					관리자 페이지 퀴즈 CRUD

   ​					퀴즈 데이터  추가

   Back-end	REST API 정리

```js
import React, { useState, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import { CommonContext } from '../../context/CommonContext';
import Layout from '../../layout';
import Wrapper from './styles';

const EventAll = () => {
  const { carouselDatas, setCarouselDatas } = useContext(CommonContext);
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const { currentEventDatas, setCurrentEventDatas } = useContext(CommonContext);

  const [forceRender, setForceRender] = useState({});
  const [selectedEvent, setSelectedEvent] = useState({});
  const [couponData, setCouponData] = useState([]);

  function choiceProduct(tmpData, productNumber) {
    // 같은 event_id가 존재하지 않는다면 추가
    // 같은 event_id가 존재한다면 선택한 상품을 수정

    if (selectedEvent[tmpData.event] === undefined) {
      selectedEvent[tmpData.event_no] = productNumber;
    } else {
      if (selectedEvent[tmpData.event_no] === productNumber) {
        selectedEvent[tmpData.event_no] = null;
      } else {
        selectedEvent[tmpData.event_no] = productNumber;
      }
    }
    console.log(selectedEvent);
    setSelectedEvent(selectedEvent);
    setForceRender({});
  }

  useEffect(() => {
    console.log('couponData 받아오기');
    // axios로 coupon data 받아오기
    const couponData = [
      {
        event_no: '1',
        coupon_select: '3',
        coupon_use: false,
      },
      {
        event_no: '2',
        coupon_select: '7',
        coupon_use: true,
      },
    ];
    setCouponData(couponData);
  }, []);

  useEffect(() => {
    console.log('reRender');
  });

  const submitCouponData = () => {
    // console.log(carouselDatas);
    // data 가공해서 post 요청 보내기,
    // get 요청으로 데이터 받아서 다시 랜더링하기
    setForceRender({});
    console.log(selectedEvent);
  };

  function eventGridRender(index, tmpData) {
    const checkedStyle = {
      border: '3px solid red',
    };

    if (index === 2 || index === 4) {
      return (
        <Grid container className="Nav_bar">
          {console.log('tmpData', tmpData)}
          <Grid
            className="KisokCentering"
            onClick={() => choiceProduct(tmpData, 1)}
            style={selectedEvent[index + 1] === 1 ? checkedStyle : null}
          >
            <img
              className="tmp"
              src={`https://i3b309.p.ssafy.io/${
                Object(productDatas[tmpData.event_item['1'].prod_id - 1])
                  .prod_image
              }`}
              alt="image1"
              style={{ width: '150px', height: '150px' }}
            />
          </Grid>
          <Grid>
            <p>vs{JSON.stringify(selectedEvent)}</p>
          </Grid>
          <Grid
            className="KisokCentering"
            onClick={() => choiceProduct(tmpData, 2)}
            style={selectedEvent[index + 1] === 2 ? checkedStyle : null}
          >
            <img
              className="tmp"
              src={`https://i3b309.p.ssafy.io/${
                Object(productDatas[tmpData.event_item['2'].prod_id - 1])
                  .prod_image
              }`}
              alt="image2"
              style={{ width: '150px', height: '150px' }}
            />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container className="Nav_bar" style={{ background: 'gray' }}>
          <Grid className="KisokCentering">
            <img
              className="tmp"
              src={`https://i3b309.p.ssafy.io/${
                Object(productDatas[tmpData.event_item['1'].prod_id - 1])
                  .prod_image
              }`}
              alt="image1"
              style={{ width: '150px', height: '150px' }}
            />
          </Grid>
          <Grid>
            <p>선택할 수 없는 투표</p>
          </Grid>
          <Grid className="KisokCentering">
            <img
              className="tmp"
              src={`https://i3b309.p.ssafy.io/${
                Object(productDatas[tmpData.event_item['2'].prod_id - 1])
                  .prod_image
              }`}
              alt="image2"
              style={{ width: '150px', height: '150px' }}
            />
          </Grid>
        </Grid>
      );
    }
  }

  return (
    <Layout>
      <Wrapper>
        <Grid>
          {currentEventDatas.map((tmpData, index) =>
            eventGridRender(index, tmpData),
          )}
        </Grid>
        <button onClick={submitCouponData}>쿠폰 데이터 넘기기</button>
      </Wrapper>
    </Layout>
  );
};

export default EventAll;

```

```js
import React, { useState, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import { CommonContext } from '../../context/CommonContext';
import Layout from '../../layout';
import Wrapper from './styles';

const EventAll = () => {
  const { carouselDatas, setCarouselDatas } = useContext(CommonContext);
  // console.log(carouselDatas);

  const [forceRender, setForceRender] = useState({});
  const [selectedEvent, setSelectedEvent] = useState({});
  const [couponData, setCouponData] = useState([]);

  function choiceProduct(tmpData, productNumber) {
    // 같은 event_id가 존재하지 않는다면 추가
    // 같은 event_id가 존재한다면 선택한 상품을 수정

    if (selectedEvent[tmpData.event_no] === undefined) {
      selectedEvent[tmpData.event_no] = productNumber;
    } else {
      if (selectedEvent[tmpData.event_no] === productNumber) {
        selectedEvent[tmpData.event_no] = null;
      } else {
        selectedEvent[tmpData.event_no] = productNumber;
      }
    }
    console.log(selectedEvent);
    setSelectedEvent(selectedEvent);
    setForceRender({});
  }

  useEffect(() => {
    console.log('couponData 받아오기');
    // axios로 coupon data 받아오기
    const couponData = [
      {
        event_no: '1',
        coupon_select: '3',
        coupon_use: false,
      },
      {
        event_no: '2',
        coupon_select: '7',
        coupon_use: true,
      },
    ];
    setCouponData(couponData);
  }, []);

  useEffect(() => {
    console.log('reRender');
  });

  const submitCouponData = () => {
    console.log(carouselDatas);
    // data 가공해서 post 요청 보내기,
    // get 요청으로 데이터 받아서 다시 랜더링하기
    setForceRender({});
    console.log(selectedEvent);
  };

  function eventGridRender(index, tmpData) {
    const checkedStyle = {
      border: '3px solid red',
    };

    if (index === 2 || index === 4) {
      return (
        <Grid container className="Nav_bar">
          <Grid
            className="KisokCentering"
            onClick={() => choiceProduct(tmpData, 1)}
            style={selectedEvent[index + 1] === 1 ? checkedStyle : null}
          >
            <img
              className="tmp"
              src={tmpData.event_item['1'].prod_image}
              alt="image1"
              style={{ width: '150px', height: '150px' }}
            />
          </Grid>
          <Grid>
            <p>vs{JSON.stringify(selectedEvent)}</p>
          </Grid>
          <Grid
            className="KisokCentering"
            onClick={() => choiceProduct(tmpData, 2)}
            style={selectedEvent[index + 1] === 2 ? checkedStyle : null}
          >
            <img
              className="tmp"
              src={tmpData.event_item['2'].prod_image}
              alt="image2"
              style={{ width: '150px', height: '150px' }}
            />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container className="Nav_bar" style={{ background: 'gray' }}>
          <Grid className="KisokCentering">
            <img
              className="tmp"
              src={tmpData.event_item['1'].prod_image}
              alt="image1"
              style={{ width: '150px', height: '150px' }}
            />
          </Grid>
          <Grid>
            <p>선택할 수 없는 투표</p>
          </Grid>
          <Grid className="KisokCentering">
            <img
              className="tmp"
              src={tmpData.event_item['2'].prod_image}
              alt="image2"
              style={{ width: '150px', height: '150px' }}
            />
          </Grid>
        </Grid>
      );
    }
  }

  return (
    <Layout>
      <Wrapper>
        <Grid>
          {carouselDatas.map((tmpData, index) =>
            eventGridRender(index, tmpData),
          )}
        </Grid>
        <button onClick={submitCouponData}>쿠폰 데이터 넘기기</button>
      </Wrapper>
    </Layout>
  );
};

export default EventAll;

```

