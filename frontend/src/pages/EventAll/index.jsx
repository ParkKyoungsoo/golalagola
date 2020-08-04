import React, { useState, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import { CommonContext } from '../../context/CommonContext';
import Layout from '../../layout';

// import useDeepCompareEffect from 'use-deep-compare-effect';

const EventAll = () => {
  const { carouselDatas, setCarouselDatas } = useContext(CommonContext);
  console.log(carouselDatas);

  // const selectedEvent = carouselDatas.map()

  // const selectedEvent = Array.from(Array(carouselDatas.length), () =>
  //   Array(1).fill(null),
  // );

  // const [selectedEvent, setSelectedEvent] = useState(
  //   Array.from(Array(carouselDatas.length), () => Array(1).fill(null)),
  // );

  // const choiceProduct = (index, productNumber) => {
  //   // 다른 product값이 있다면 본인으로 바꾸기
  //   // 같은 productNumber가 있다면 null로 바꿔주기
  //   console.log(selectedEvent[index][0] === productNumber);
  //   if (selectedEvent[index][0] !== productNumber) {
  //     selectedEvent[index][0] = productNumber;
  //   } else {
  //     selectedEvent[index][0] = null;
  //   }
  //   console.log(JSON.stringify(selectedEvent));

  //   setSelectedEvent(selectedEvent);
  // };

  const [selectedEvent, setSelectedEvent] = useState({});

  function choiceProduct(tmpData, productNumber) {
    // 같은 event_id가 존재하지 않는다면 추가
    // 같은 event_id가 존재한다면 선택한 상품을 수정
    console.log(selectedEvent[tmpData.event_no]);

    if (selectedEvent[tmpData.event_no] === undefined) {
      selectedEvent[tmpData.event_no] = productNumber,
      };
    } else {
      if (selectedEvent[tmpData.event_no] === productNumber) {
        selectedEvent[tmpData.event_no] = {
          event_no: tmpData.event_no,
          coupon_select: null,
        };
      } else {
        selectedEvent[tmpData.event_no] = {
          event_no: tmpData.event_no,
          coupon_select: productNumber,
        };
      }
    }
    console.log(selectedEvent);
    console.log(JSON.stringify(selectedEvent));
    console.log(setSelectedEvent(selectedEvent));
    setSelectedEvent(selectedEvent);
  }

  useEffect(() => {
    console.log('useEffect 작동');
  });

  const checkedStyle = {
    border: '3px solid red',
  };

  return (
    <Layout>
      <Grid>
        {carouselDatas.map((tmpData, index) => (
          <Grid container>
            <Grid
              className="KisokCentering"
              onClick={() => choiceProduct(tmpData, 1)}
              // style={selectedEvent[index][0] === 1 ? checkedStyle : null}
            >
              <img
                className="tmp"
                src={tmpData.event_item['1'].prod_image}
                alt="image1"
                style={{ width: '150px', height: '150px' }}
              />
              {/* <button onClick={() => setSelectedEvent(choiceProduct(index, 1))}>[{index}][1]</button> */}
            </Grid>
            <Grid>
              <p>vs{JSON.stringify(selectedEvent)}</p>

              {/* <input
                type="text"
                value={selectedEvent}
                onChange={setSelectedEvent}
              /> */}
            </Grid>
            <Grid
              className="KisokCentering"
              onClick={() => choiceProduct(index, 2)}
              // style={selectedEvent[index][0] === 2 ? checkedStyle : null}
            >
              <img
                className="tmp"
                src={tmpData.event_item['2'].prod_image}
                alt="image2"
                style={{ width: '150px', height: '150px' }}
              />
              {/* <button onClick={() => setSelectedEvent(choiceProduct(index, 2))}>[{index}][2]</button> */}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default EventAll;
