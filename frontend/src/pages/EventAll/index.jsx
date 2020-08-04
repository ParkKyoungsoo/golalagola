import React, { useState, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import { CommonContext } from '../../context/CommonContext';
import Layout from '../../layout';

const EventAll = () => {
  const { carouselDatas, setCarouselDatas } = useContext(CommonContext);
  // console.log(carouselDatas);

  const [forceRender, setForceRender] = useState({});
  const [selectedEvent, setSelectedEvent] = useState({});

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
        ))}
      </Grid>
    </Layout>
  );
};

export default EventAll;
