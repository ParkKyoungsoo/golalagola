import React, { useState, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import { CommonContext } from '../../context/CommonContext';
import Layout from '../../layout';
import Axios from 'axios';

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
        <Grid container>
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
        <Grid container style={{ background: 'gray' }}>
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
      <Grid>
        {carouselDatas.map((tmpData, index) => eventGridRender(index, tmpData))}
      </Grid>
      <button onClick={submitCouponData}>쿠폰 데이터 넘기기</button>
    </Layout>
  );
};

export default EventAll;
