import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import { CommonContext } from '../../context/CommonContext';
import Layout from '../../layout';
import Wrapper from './styles';
import Axios from 'axios';

const EventAll = () => {
  const {
    productDatas,
    setProductDatas,
    currentEventDatas,
    setCurrentEventDatas,
    userEvent,
    setUserEvent,
    userCoupon,
    setUserCoupon,
  } = useContext(CommonContext);

  const [forceRender, setForceRender] = useState({});
  const [selectedEvent, setSelectedEvent] = useState({});
  const [couponData, setCouponData] = useState([]);

  const history = useHistory();

  function choiceProduct(tmpData, productNumber) {
    // 같은 event_id가 존재하지 않는다면 추가
    // 같은 event_id가 존재한다면 선택한 상품을 수정

    const selectedProductId = tmpData.event_item[productNumber].prod_id;
    if (selectedEvent[tmpData.event_id] === undefined) {
      selectedEvent[tmpData.event_id] = selectedProductId;
    } else {
      if (selectedEvent[tmpData.event_id] === selectedProductId) {
        selectedEvent[tmpData.event_id] = null;
      } else {
        selectedEvent[tmpData.event_id] = selectedProductId;
      }
    }
    // console.log('selectedEvent', selectedEvent);
    setSelectedEvent(selectedEvent);
    setForceRender({});
  }

  // 최초 1회 couponData 받아오기
  const userId = 1; // user Data 필요
  const getUserCouponData = async () => {
    console.log('couponData 받아오기');
    await Axios.get(`https://i3b309.p.ssafy.io/api/coupon/${userId}`)
      .then(res => {
        console.log(res);
        setUserCoupon([res.data.event_id]);
      })
      .catch(err => console.log(err));
  };

  useEffect(async () => {
    getUserCouponData();
  }, []);

  // 쿠폰 데이터를 보내고 다시 받아오는 요청
  const submitCouponData = async () => {
    // data 가공해서 post 요청 보내기,
    console.log(selectedEvent);
    for (let event_id in selectedEvent) {
      console.log(event_id, selectedEvent[event_id]);
      if (selectedEvent[event_id] !== null) {
        await Axios.post('https://i3b309.p.ssafy.io/api/coupon/', {
          user_id: userId,
          event_id: event_id,
          coupon_select: selectedEvent[event_id],
          coupon_date: new Date(),
          coupon_use: false,
        })
          .then(res => console.log(res))
          .catch(err => console.log(err));
      }
    }

    // get 요청으로 데이터 받아서 다시 랜더링하기
    getUserCouponData();
    setForceRender({});

    // myCoupon으로 이동할 것인지 물어보기
    const confirmMessage = window.confirm('마이쿠폰으로 이동하시겠습니까?');
    if (confirmMessage) {
      window.location.href = '/MyCoupon';
    }
  };

  console.log('Coupon DATA', userCoupon);

  function eventGridRender(index, tmpData) {
    const checkedStyle = {
      // border: '1px solid red',
      opacity: '0.5',
      border: '2px solid black',
    };

    if (!userCoupon.includes(tmpData.event_id)) {
      return (
        <Grid container className="Nav_bar">
          <Grid
            className="KisokCentering"
            onClick={() => choiceProduct(tmpData, 1)}
          >
            {/* {console.log(tmpData)} */}
            <img
              className="tmp"
              src={`https://i3b309.p.ssafy.io/${
                Object(productDatas[tmpData.event_item['1'].prod_id - 1])
                  .prod_image
              }`}
              style={
                selectedEvent[tmpData.event_id] ===
                tmpData.event_item['1'].prod_id
                  ? checkedStyle
                  : null
              }
              alt="image1"
            />
          </Grid>
          <Grid
            style={{
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
          >
            <h3>VS</h3>
            {/* <p>vs{JSON.stringify(selectedEvent)}</p> */}
          </Grid>
          <Grid
            className="KisokCentering"
            onClick={() => choiceProduct(tmpData, 2)}
          >
            <img
              className="tmp"
              src={`https://i3b309.p.ssafy.io/${
                Object(productDatas[tmpData.event_item['2'].prod_id - 1])
                  .prod_image
              }`}
              style={
                selectedEvent[tmpData.event_id] ===
                tmpData.event_item['2'].prod_id
                  ? checkedStyle
                  : null
              }
              alt="image2"
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

  console.log(currentEventDatas);
  return (
    <Wrapper>
      <Layout>
        <Grid>
          <Grid style={{ position: 'fixed' }}>
            <button onClick={submitCouponData}>쿠폰 담기</button>
            <br />
            <button>쿠폰함</button>
          </Grid>
          {currentEventDatas.map((tmpData, index) =>
            eventGridRender(index, tmpData),
          )}
        </Grid>
      </Layout>
    </Wrapper>
  );
};

export default EventAll;
