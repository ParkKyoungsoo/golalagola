import React, { useState, useContext } from 'react';
import { Grid, Button, useMediaQuery } from '@material-ui/core';
import Wrapper from './styles';
import { CommonContext } from '../../context/CommonContext';
import MultiCarousel from './MultiCarousel';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { ContactlessOutlined } from '@material-ui/icons';

const EventModal = modalNum => {
  const {
    user,
    eventNum,
    serverImgUrl,
    productDatas,
    currentEventDatas,
    selectedEventItem,
    setSelectedEventItem,
    setEventListener,
  } = useContext(CommonContext);

  const [userChoice, setUserChoice] = useState({
    coupon_select: '',
    coupon_use: '',
    coupon_date: '',
    event_id: '',
    user_id: '',
  });

  const RadioTest = num => {
    let today = new Date();
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
  };

  async function setMyCouponUpdate() {
    axios
      .post('https://i3b309.p.ssafy.io/api/coupon/', userChoice)
      .then(function(response) {
        setUserChoice({
          coupon_select: '',
          coupon_use: '',
          coupon_date: '',
          event_id: '',
          user_id: '',
        });
        modalNum.setModalNum(2);
        setEventListener(eventListener => eventListener + 1);
      })
      .catch(error => {});
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
    setMyCouponUpdate();
  };

  const isMobile = useMediaQuery('(max-width:920px)');

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <>
      {isMobile ? (
        <Wrapper>
          <Grid container style={{ textAlign: 'center' }}>
            <Grid item xs={12}>
              버튼을 눌러 <strong style={{ color: 'red' }}>할인</strong>을
              받으세요!
            </Grid>
          </Grid>
          <Grid
            className="EM"
            container
            direction="row"
            style={{ backgroundColor: '#f2f2f2', position: 'relative' }}
          >
            <Grid
              // className="imgCss"
              item
              xs={5}
              style={{
                display: 'flex',
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
                  src={`${serverImgUrl}${
                    Object(
                      productDatas[
                        currentEventDatas[eventNum].event_item['1'].prod_id - 1
                      ],
                    ).prod_image
                  }`}
                  alt={
                    Object(
                      productDatas[
                        currentEventDatas[eventNum].event_item['1'].prod_id - 1
                      ],
                    ).prod_title
                  }
                  style={{
                    display: 'flex',
                    maxWidth: '15vw',
                    borderRadius: '8px',
                    marginTop: '2vh',
                    marginBottom: '2vh',
                    marginRight: '10px',
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
              <Grid
                className="imgDiv"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  className="eventImg"
                  src={`${serverImgUrl}${
                    Object(
                      productDatas[
                        currentEventDatas[eventNum].event_item['2'].prod_id - 1
                      ],
                    ).prod_image
                  }`}
                  alt={
                    Object(
                      productDatas[
                        currentEventDatas[eventNum].event_item['2'].prod_id - 1
                      ],
                    ).prod_title
                  }
                  style={{
                    display: 'flex',
                    maxWidth: '15vw',
                    marginTop: '2vh',
                    marginBottom: '2vh',
                    borderRadius: '8px',
                    marginLeft: '10px',
                  }}
                />
              </Grid>
            </Grid>
            <h3 style={{ position: 'absolute' }}>
              <strong>VS</strong>
            </h3>
          </Grid>
          <Grid className="inputCss" container direction="row">
            <Grid item item xs={5}>
              <Grid
                container
                direction="column"
                style={{ alignItems: 'center' }}
              >
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
                <Grid item className="desCss">
                  {
                    Object(
                      productDatas[
                        currentEventDatas[eventNum].event_item['1'].prod_id - 1
                      ],
                    ).prod_title
                  }
                </Grid>
                <Grid item>
                  <Grid container style={{ justifyContent: 'space-evenly' }}>
                    <Grid item className="discount">
                      최대&nbsp;&nbsp;
                      <strong>
                        {
                          Object(
                            productDatas[
                              currentEventDatas[eventNum].event_item['1']
                                .prod_id - 1
                            ],
                          ).prod_sale
                        }
                      </strong>
                      %
                    </Grid>
                    <Grid item>
                      <span className="price">
                        {numberWithCommas(
                          Object(
                            productDatas[
                              currentEventDatas[eventNum].event_item['1']
                                .prod_id - 1
                            ],
                          ).prod_price,
                        )}
                      </span>
                      &nbsp;&nbsp;
                      <span>
                        <strong>
                          {numberWithCommas(
                            parseInt(
                              Object(
                                productDatas[
                                  currentEventDatas[eventNum].event_item['1']
                                    .prod_id - 1
                                ],
                              ).prod_price *
                                (100 -
                                  Object(
                                    productDatas[
                                      currentEventDatas[eventNum].event_item[
                                        '1'
                                      ].prod_id - 1
                                    ],
                                  ).prod_sale) *
                                0.01,
                            ),
                          )}
                          원
                        </strong>
                      </span>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid
                container
                direction="column"
                style={{ alignItems: 'center' }}
              >
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
                <Grid item className="desCss">
                  {
                    Object(
                      productDatas[
                        currentEventDatas[eventNum].event_item['2'].prod_id - 1
                      ],
                    ).prod_title
                  }
                </Grid>
                <Grid item>
                  <Grid container style={{ justifyContent: 'space-evenly' }}>
                    <Grid item className="discount">
                      최대&nbsp;&nbsp;
                      <strong>
                        {
                          Object(
                            productDatas[
                              currentEventDatas[eventNum].event_item['2']
                                .prod_id - 1
                            ],
                          ).prod_sale
                        }
                      </strong>
                      %
                    </Grid>
                    <Grid item>
                      <span className="price">
                        {numberWithCommas(
                          Object(
                            productDatas[
                              currentEventDatas[eventNum].event_item['2']
                                .prod_id - 1
                            ],
                          ).prod_price,
                        )}
                      </span>
                      &nbsp;&nbsp;
                      <span>
                        <strong>
                          {numberWithCommas(
                            parseInt(
                              Object(
                                productDatas[
                                  currentEventDatas[eventNum].event_item['2']
                                    .prod_id - 1
                                ],
                              ).prod_price *
                                (100 -
                                  Object(
                                    productDatas[
                                      currentEventDatas[eventNum].event_item[
                                        '2'
                                      ].prod_id - 1
                                    ],
                                  ).prod_sale) *
                                0.01,
                            ),
                          )}
                          원
                        </strong>
                      </span>
                    </Grid>
                  </Grid>
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
                  width: '15vw',
                  height: '8vh',
                }}
              >
                쿠폰 받기
              </Button>
            </Grid>
          </Grid>
        </Wrapper>
      ) : (
        <Wrapper>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{
                textAlign: 'center',
                marginBottom: '2vh',
                fontSize: '2.5vw',
              }}
            >
              버튼을 눌러&nbsp;
              <strong style={{ color: 'red', textAlign: 'center' }}>
                할인
              </strong>
              을 받으세요!
            </Grid>
          </Grid>
          <Grid
            className="EM"
            container
            direction="row"
            style={{ backgroundColor: '#f2f2f2', position: 'relative' }}
          >
            <Grid
              // className="imgCss"
              item
              xs={5}
              style={{
                display: 'flex',
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
                  src={`${serverImgUrl}${
                    Object(
                      productDatas[
                        currentEventDatas[eventNum].event_item['1'].prod_id - 1
                      ],
                    ).prod_image
                  }`}
                  alt={
                    Object(
                      productDatas[
                        currentEventDatas[eventNum].event_item['1'].prod_id - 1
                      ],
                    ).prod_title
                  }
                  style={{
                    display: 'flex',
                    maxWidth: '15vw',
                    borderRadius: '8px',
                    marginTop: '2vh',
                    marginBottom: '2vh',
                    marginRight: '10px',
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
              <Grid
                className="imgDiv"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  className="eventImg"
                  src={`${serverImgUrl}${
                    Object(
                      productDatas[
                        currentEventDatas[eventNum].event_item['2'].prod_id - 1
                      ],
                    ).prod_image
                  }`}
                  alt={
                    Object(
                      productDatas[
                        currentEventDatas[eventNum].event_item['2'].prod_id - 1
                      ],
                    ).prod_title
                  }
                  style={{
                    display: 'flex',
                    maxWidth: '15vw',
                    marginTop: '2vh',
                    marginBottom: '2vh',
                    borderRadius: '8px',
                    marginLeft: '10px',
                  }}
                />
              </Grid>
            </Grid>
            <Grid style={{ position: 'absolute', fontSize: '2.5vw' }}>
              <strong>VS</strong>
            </Grid>
          </Grid>
          <Grid className="inputCss" container direction="row">
            <Grid item item xs={5}>
              <Grid
                container
                direction="column"
                style={{ alignItems: 'center' }}
              >
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
                <Grid item className="desCss">
                  {
                    Object(
                      productDatas[
                        currentEventDatas[eventNum].event_item['1'].prod_id - 1
                      ],
                    ).prod_title
                  }
                </Grid>
                <Grid item>
                  <Grid container style={{ justifyContent: 'space-evenly' }}>
                    <Grid item className="discount">
                      최대&nbsp;&nbsp;
                      <strong style={{ fontSize: '2vw' }}>
                        {
                          Object(
                            productDatas[
                              currentEventDatas[eventNum].event_item['1']
                                .prod_id - 1
                            ],
                          ).prod_sale
                        }
                      </strong>
                      % &nbsp;&nbsp;
                      <span className="price">
                        {numberWithCommas(
                          Object(
                            productDatas[
                              currentEventDatas[eventNum].event_item['1']
                                .prod_id - 1
                            ],
                          ).prod_price,
                        )}
                      </span>
                      &nbsp;&nbsp;
                      <span>
                        <strong className="price2">
                          {numberWithCommas(
                            parseInt(
                              Object(
                                productDatas[
                                  currentEventDatas[eventNum].event_item['1']
                                    .prod_id - 1
                                ],
                              ).prod_price *
                                (100 -
                                  Object(
                                    productDatas[
                                      currentEventDatas[eventNum].event_item[
                                        '1'
                                      ].prod_id - 1
                                    ],
                                  ).prod_sale) *
                                0.01,
                            ),
                          )}
                          원
                        </strong>
                      </span>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid
                container
                direction="column"
                style={{ alignItems: 'center' }}
              >
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
                <Grid item className="desCss">
                  {
                    Object(
                      productDatas[
                        currentEventDatas[eventNum].event_item['2'].prod_id - 1
                      ],
                    ).prod_title
                  }
                </Grid>
                <Grid item>
                  <Grid container style={{ justifyContent: 'space-evenly' }}>
                    <Grid item className="discount">
                      최대&nbsp;&nbsp;
                      <strong style={{ fontSize: '2vw' }}>
                        {
                          Object(
                            productDatas[
                              currentEventDatas[eventNum].event_item['2']
                                .prod_id - 1
                            ],
                          ).prod_sale
                        }
                      </strong>
                      % &nbsp;&nbsp;
                      <span className="price">
                        {numberWithCommas(
                          Object(
                            productDatas[
                              currentEventDatas[eventNum].event_item['2']
                                .prod_id - 1
                            ],
                          ).prod_price,
                        )}
                      </span>
                      &nbsp;&nbsp;
                      <span>
                        <strong className="price2">
                          {numberWithCommas(
                            parseInt(
                              Object(
                                productDatas[
                                  currentEventDatas[eventNum].event_item['2']
                                    .prod_id - 1
                                ],
                              ).prod_price *
                                (100 -
                                  Object(
                                    productDatas[
                                      currentEventDatas[eventNum].event_item[
                                        '1'
                                      ].prod_id - 1
                                    ],
                                  ).prod_sale) *
                                0.01,
                            ),
                          )}
                          원
                        </strong>
                      </span>
                    </Grid>
                  </Grid>
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
                  width: '15vw',
                  height: '8vh',
                }}
              >
                쿠폰 받기
              </Button>
            </Grid>
          </Grid>
        </Wrapper>
      )}
    </>
  );
};

export default EventModal;
