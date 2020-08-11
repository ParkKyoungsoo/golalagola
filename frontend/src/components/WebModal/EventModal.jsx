import React, { useState, useContext } from 'react';
import { Grid, Button, useMediaQuery } from '@material-ui/core';
import Wrapper from './styles';
import CheckBox from '../WebModal/CheckBox';
import { CommonContext } from '../../context/CommonContext';
import MultiCarousel from './MultiCarousel';
import Box from '@material-ui/core/Box';

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

  const isMobile = useMediaQuery('(max-width:920px)');
  return (
    <>
      {isMobile ? (
        <Wrapper>
          <Grid container>
            <Grid item xs={12}>
              선택 할인!!
            </Grid>
          </Grid>
          <Grid className="EM" container direction="row">
            <Grid item xs={5}>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
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
                    width: '80%',
                    height: 'auto',
                    borderRadius: '8px',
                    border: 'none',
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
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
                    width: '80%',
                    height: 'auto',
                    borderRadius: '8px',
                  }}
                />
              </Box>
            </Grid>
            <strong style={{ position: 'absolute' }}>VS</strong>
          </Grid>
          <Grid className="inputCss" container direction="row">
            <Grid item item xs={5}>
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
                            currentEventDatas[eventNum].event_item['1']
                              .prod_id - 1
                          ],
                        ).prod_title
                      }
                    </h5>
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}>
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
                            currentEventDatas[eventNum].event_item['2']
                              .prod_id - 1
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
          <Grid container>
            <Grid item xs={12}>
              <MultiCarousel />
            </Grid>
          </Grid>
        </Wrapper>
      ) : (
        <Wrapper>
          <Grid container>
            <Grid item xs={12}>
              선택 할인!!
            </Grid>
          </Grid>
          <Grid
            className="EM"
            container
            direction="row"
            style={{ backgroundColor: '#f7f2f2' }}
          >
            <Grid
              className="imgCss"
              item
              xs={5}
              style={{
                display: 'flex',
                justifyContent: 'center',
                // backgroundColor: '#f7f2f2',
                justifyContent: 'center',
              }}
            >
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
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
                    display: 'flex',
                    // justifyContent: 'center',
                    width: '80%',
                    height: '80%',
                    borderRadius: '8px',
                  }}
                />
                {/* <span style={{ textAlign: 'right', marginLeft: '1px' }}>V</span> */}
              </Box>
            </Grid>
            {/* <h5 className="textCss"> */}
            {/* <strong>VS</strong> */}
            {/* </h5> */}
            <Grid
              className="imgCss"
              item
              xs={5}
              style={{
                display: 'flex',
                justifyContent: 'center',
                // backgroundColor: '#f7f2f2',
                justifyContent: 'center',
              }}
            >
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
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
                    display: 'flex',
                    justifyContent: 'center',
                    width: '80%',
                    height: '80%',
                    borderRadius: '8px',
                  }}
                />
              </Box>
            </Grid>
            <h3 style={{ position: 'absolute' }}>
              <strong>VS</strong>
            </h3>
          </Grid>
          <Grid className="inputCss" container direction="row">
            <Grid item item xs={5}>
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
                            currentEventDatas[eventNum].event_item['1']
                              .prod_id - 1
                          ],
                        ).prod_title
                      }
                    </h5>
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}>
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
                            currentEventDatas[eventNum].event_item['2']
                              .prod_id - 1
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
              onClick={EventTrigger}
              disabled={selectedEventItem === undefined}
              style={{
                width: '20vw',
                height: '5vh',
              }}
            >
              Disable elevation
            </Button>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <MultiCarousel />
            </Grid>
          </Grid>
        </Wrapper>
      )}
    </>
  );
};

export default EventModal;
