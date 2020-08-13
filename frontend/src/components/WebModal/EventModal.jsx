import React, { useState, useContext } from 'react';
import { Grid, Button, useMediaQuery } from '@material-ui/core';
import Wrapper from './styles';
import CheckBox from '../WebModal/CheckBox';
import { CommonContext } from '../../context/CommonContext';
import MultiCarousel from './MultiCarousel';
import Box from '@material-ui/core/Box';

import axios from 'axios';
import { ContactlessOutlined } from '@material-ui/icons';

const EventModal = modalNum => {
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const { currentEventDatas, setCurrentEventDatas } = useContext(CommonContext);
  const { user } = useContext(CommonContext);

  const { eventNum, setEventNum } = useContext(CommonContext);
  const { selectedEventItem, setSelectedEventItem } = useContext(CommonContext);
  const [tmpData, setTmpData] = useState();

  const { myCouponDatas, setMyCouponDatas } = useContext(CommonContext);

  const [userChoice, setUserChoice] = useState({
    coupon_select: '',
    coupon_use: '',
    coupon_date: '',
    event_id: '',
    user_id: '',
  });

  const RadioTest = num => {
    let today = new Date().toLocaleDateString();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월
    let date = today.getDate(); // 날짜

    setSelectedEventItem(num);
    setUserChoice({
      ...userChoice,
      coupon_select: num,
      coupon_use: false,
      coupon_date: year + '-' + month + '-' + date,
      event_id: currentEventDatas[eventNum].event_id,
      user_id: user.user_id,
    });

    console.log('userSelect', userChoice);
  };

  async function setMyCouponUpdate() {
    axios
      .post('https://i3b309.p.ssafy.io/api/coupon/', userChoice)
      .then(function(response) {
        console.log('axios', userChoice);
        console.log(response);

        setUserChoice({
          coupon_select: '',
          coupon_use: '',
          coupon_date: '',
          event_id: '',
          user_id: '',
        });

        modalNum.setModalNum(2);
      })
      .catch(error => {
        console.log('axios', userChoice);
        console.log('error : ', error.response);
      });
  }

  // 다음 모달창을 띄워주고 selectedEventItem에 선택한 제품을 넣어주기 위한 함수
  const EventTrigger = e => {
    setUserChoice({
      ...userChoice,
      coupon_select: selectedEventItem,
      coupon_use: false,
      coupon_date: '',
      event_id: currentEventDatas[eventNum].event_id,
      user_id: user.user_id,
    });

    console.log('userSelect', userChoice);

    setMyCouponUpdate();
  };

  const isMobile = useMediaQuery('(max-width:920px)');

  return (
    <>
      {isMobile ? (
        <Wrapper>
          <Grid container>
            <Grid item xs={12}>
              <h5 style={{ textAlign: 'center' }}>
                버튼을 눌러 <strong style={{ color: 'red' }}>할인</strong>을
                받으세요!
              </h5>
            </Grid>
          </Grid>
          <Grid
            className="EM"
            container
            direction="row"
            style={{ backgroundColor: '#f7f2f2', position: 'relative' }}
          >
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
                    display: 'flex',
                    maxWidth: '20vw',
                    borderRadius: '8px',
                    // maxHeight: '20vh',
                    marginTop: '2vh',
                    marginBottom: '2vh',
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
                    display: 'flex',
                    maxWidth: '20vw',
                    borderRadius: '8px',
                    // maxHeight: '20vh',
                    marginTop: '2vh',
                    marginBottom: '2vh',
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
                      Object(
                        productDatas[
                          currentEventDatas[eventNum].event_item['1'].prod_id -
                            1
                        ],
                      ).prod_id
                    }
                    onChange={() =>
                      RadioTest(
                        Object(
                          productDatas[
                            currentEventDatas[eventNum].event_item['1']
                              .prod_id - 1
                          ],
                        ).prod_id,
                      )
                    }
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
                      Object(
                        productDatas[
                          currentEventDatas[eventNum].event_item['2'].prod_id -
                            1
                        ],
                      ).prod_id
                    }
                    onChange={() =>
                      RadioTest(
                        Object(
                          productDatas[
                            currentEventDatas[eventNum].event_item['2']
                              .prod_id - 1
                          ],
                        ).prod_id,
                      )
                    }
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
          {/* <Grid container>
            <Grid item xs={12}>
              <MultiCarousel />
            </Grid>
          </Grid> */}
        </Wrapper>
      ) : (
        <Wrapper>
          <Grid container>
            <Grid item xs={12}>
              <h4 style={{ textAlign: 'center' }}>
                버튼을 눌러{' '}
                <strong style={{ color: 'red', textAlign: 'center' }}>
                  할인
                </strong>
                을 받으세요!
              </h4>
            </Grid>
          </Grid>
          <Grid
            className="EM"
            container
            direction="row"
            style={{ backgroundColor: '#f7f2f2', position: 'relative' }}
          >
            <Grid
              className="imgCss"
              item
              xs={5}
              style={{
                display: 'flex',
                justifyContent: 'center',
                // backgroundColor: '#f7f2f2',
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
                    maxWidth: '20vw',
                    borderRadius: '8px',
                    // maxHeight: '20vh',
                    marginTop: '2vh',
                    marginBottom: '2vh',
                  }}
                />
              </Box>
            </Grid>
            <Grid
              className="imgCss"
              item
              xs={5}
              style={{
                display: 'flex',
                justifyContent: 'center',
                // backgroundColor: '#f7f2f2',
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
                    // justifyContent: 'center',
                    maxWidth: '20vw',
                    // maxHeight: '20vh',
                    marginTop: '2vh',
                    marginBottom: '2vh',
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
                      Object(
                        productDatas[
                          currentEventDatas[eventNum].event_item['1'].prod_id -
                            1
                        ],
                      ).prod_id
                    }
                    onChange={() =>
                      RadioTest(
                        Object(
                          productDatas[
                            currentEventDatas[eventNum].event_item['1']
                              .prod_id - 1
                          ],
                        ).prod_id,
                      )
                    }
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
                      Object(
                        productDatas[
                          currentEventDatas[eventNum].event_item['2'].prod_id -
                            1
                        ],
                      ).prod_id
                    }
                    onChange={() =>
                      RadioTest(
                        Object(
                          productDatas[
                            currentEventDatas[eventNum].event_item['2']
                              .prod_id - 1
                          ],
                        ).prod_id,
                      )
                    }
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

          <Grid container className="BtnCss">
            <Grid
              item
              xs={4}
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={EventTrigger}
                disabled={selectedEventItem === undefined}
                style={{
                  width: '20vw',
                  height: '10vh',
                }}
              >
                Disable elevation
              </Button>
            </Grid>
          </Grid>
          {/* <Grid container>
            <Grid item xs={12}>
              <MultiCarousel />
            </Grid>
          </Grid> */}
        </Wrapper>
      )}
    </>
  );
};

export default EventModal;
