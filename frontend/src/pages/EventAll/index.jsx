import React, { useState, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import { CommonContext } from '../../context/CommonContext';
import Layout from '../../layout';
import Wrapper from './styles';

const EventAll = () => {
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const { currentEventDatas, setCurrentEventDatas } = useContext(CommonContext);
  const [forceRender, setForceRender] = useState({});
  const [selectedEvent, setSelectedEvent] = useState({});
  const [couponData, setCouponData] = useState([]);

  function choiceProduct(tmpData, productNumber) {
    // 같은 event_id가 존재하지 않는다면 추가
    // 같은 event_id가 존재한다면 선택한 상품을 수정

    if (selectedEvent[tmpData.event_id] === undefined) {
      selectedEvent[tmpData.event_id] = productNumber;
    } else {
      if (selectedEvent[tmpData.event_id] === productNumber) {
        selectedEvent[tmpData.event_id] = null;
      } else {
        selectedEvent[tmpData.event_id] = productNumber;
      }
    }
    // console.log('selectedEvent', selectedEvent);
    setSelectedEvent(selectedEvent);
    setForceRender({});
  }

  useEffect(() => {
    // console.log('couponData 받아오기');
    // axios로 coupon data 받아오기
    const couponData = [
      {
        event_id: '1',
        coupon_select: '3',
        coupon_use: false,
      },
      {
        event_id: '2',
        coupon_select: '7',
        coupon_use: true,
      },
    ];
    setCouponData(couponData);
  }, []);

  useEffect(() => {
    // console.log('reRender');
  });

  const submitCouponData = () => {
    // data 가공해서 post 요청 보내기,
    // get 요청으로 데이터 받아서 다시 랜더링하기
    setForceRender({});
    // console.log('selectedEvent', selectedEvent);
  };

  function eventGridRender(index, tmpData) {
    const checkedStyle = {
      // border: '1px solid red',
      opacity: '0.5',
      border: '2px solid black',
    };

    // if (index === 2 || index === 4) {
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
            style={selectedEvent[tmpData.event_id] === 1 ? checkedStyle : null}
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
            style={selectedEvent[tmpData.event_id] === 2 ? checkedStyle : null}
            alt="image2"
          />
        </Grid>
      </Grid>
    );
    // } else {
    //   return (
    //     <Grid container className="Nav_bar" style={{ background: 'gray' }}>
    //       <Grid className="KisokCentering">
    //         <img
    //           className="tmp"
    //           src={`https://i3b309.p.ssafy.io/${
    //             Object(productDatas[tmpData.event_item['1'].prod_id - 1])
    //               .prod_image
    //           }`}
    //           alt="image1"
    //           style={{ width: '150px', height: '150px' }}
    //         />
    //       </Grid>
    //       <Grid>
    //         <p>선택할 수 없는 투표</p>
    //       </Grid>
    //       <Grid className="KisokCentering">
    //         <img
    //           className="tmp"
    //           src={`https://i3b309.p.ssafy.io/${
    //             Object(productDatas[tmpData.event_item['2'].prod_id - 1])
    //               .prod_image
    //           }`}
    //           alt="image2"
    //           style={{ width: '150px', height: '150px' }}
    //         />
    //       </Grid>
    //     </Grid>
    //   );
    // }
  }

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
