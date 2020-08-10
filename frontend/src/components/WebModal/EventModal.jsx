import React, { useState, useContext } from 'react';
import { Grid, Button } from '@material-ui/core';
import Wrapper from './styles';
import CheckBox from '../WebModal/CheckBox';
import { CommonContext } from '../../context/CommonContext';
import MultiCarousel from './MultiCarousel';

const EventModal = modalNum => {
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const { currentEventDatas, setCurrentEventDatas } = useContext(CommonContext);

  const { eventNum, setEventNum } = useContext(CommonContext);
  const { selectedEventItem, setSelectedEventItem } = useContext(CommonContext);
  const [tmpData, setTmpData] = useState();

  const RadioTest = e => {
    setSelectedEventItem(e.target.value);
    // console.log(selectedEventItem);
  };

  // 다음 모달창을 띄워주고 selectedEventItem에 선택한 제품을 넣어주기 위한 함수
  const EventTrigger = () => {
    modalNum.setModalNum(2);
  };

  return (
    <>
      <Wrapper>
        <MultiCarousel />
        {/* {console.log('mainValue', eventNum)} */}
        <Grid className="EM" container direction="row">
          <Grid item xs={4}>
            <img
              className="eventImg"
              src={`https://i3b309.p.ssafy.io/${
                Object(
                  productDatas[
                    currentEventDatas[eventNum].event_item['1'].prod_id - 1
                  ],
                ).prod_image
              }`}
              alt="nature"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                border: 'none',
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <h4 className="textCss">
              <strong>VS</strong>
            </h4>
          </Grid>
          <Grid item xs={4}>
            <img
              className="tmp"
              src={`https://i3b309.p.ssafy.io/${
                Object(
                  productDatas[
                    currentEventDatas[eventNum].event_item['2'].prod_id - 1
                  ],
                ).prod_image
              }`}
              alt="people"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          </Grid>
        </Grid>
        <Grid className="inputCss" container direction="row">
          <Grid item item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <input
                  className="butt"
                  type="radio"
                  name="event"
                  value={
                    currentEventDatas[eventNum].event_item['1'].prod_id - 1
                  }
                  onChange={RadioTest}
                ></input>
              </Grid>
              <Grid item>
                <p>
                  <h5 className="desCss">
                    {
                      Object(
                        productDatas[
                          currentEventDatas[eventNum].event_item['1'].prod_id -
                            1
                        ],
                      ).prod_title
                    }
                  </h5>
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <input
                  className="butt"
                  type="radio"
                  name="event"
                  value={
                    currentEventDatas[eventNum].event_item['2'].prod_id - 1
                  }
                  onChange={RadioTest}
                ></input>
              </Grid>
              <Grid item>
                <p>
                  <h5 className="desCss">
                    {
                      Object(
                        productDatas[
                          currentEventDatas[eventNum].event_item['2'].prod_id -
                            1
                        ],
                      ).prod_title
                    }
                  </h5>
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid className="BtnCss">
          <Button
            variant="contained"
            color="primary"
            disableElevation
            // style={{ alignItems: 'center' }}
            onClick={EventTrigger}
            disabled={selectedEventItem === undefined}
          >
            Disable elevation
          </Button>
        </Grid>
      </Wrapper>
    </>
  );
};

export default EventModal;
