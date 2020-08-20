import React, { useState, useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  useMediaQuery,
  Divider,
  List,
  ListItem,
  ListItemIcon,
} from '@material-ui/core';
import { CommonContext } from '../../context/CommonContext';
import Layout from '../../layout';
import Wrapper from './styles';
import Axios from 'axios';

import SendIcon from '@material-ui/icons/Send';
import CheckIcon from '@material-ui/icons/Check';

//EventAll
const EventAll = () => {
  const {
    user,
    productDatas,
    currentEventDatas,
    userEvent,
    setUserEvent,
    userCoupon,
    setUserCoupon,
    setMyCouponDatas,
    serverImgUrl,
  } = useContext(CommonContext);

  const [forceRender, setForceRender] = useState({});
  const [selectedEvent, setSelectedEvent] = useState({});

  let flag = false;

  const isMobile = useMediaQuery('(max-width:960px)');
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
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

  // 쿠폰 데이터를 보내고 다시 받아오는 요청
  const submitCouponData = async () => {
    for (let event_id in selectedEvent) {
      if (selectedEvent[event_id] !== null) {
        flag = true;
      }
    }

    if (flag) {
      // data 가공해서 post 요청 보내기,
      for (let event_id in selectedEvent) {
        if (selectedEvent[event_id] !== null) {
          await Axios.post('https://i3b309.p.ssafy.io/api/coupon/', {
            user_id: user.user_id,
            event_id: event_id,
            coupon_select: selectedEvent[event_id],
            coupon_date: new Date(),
            coupon_use: false,
          })
            .then()
            .catch();
        }
      }

      // get 요청으로 데이터 받아서 다시 랜더링하기
      await Axios.get(
        `https://i3b309.p.ssafy.io/api/coupon/${user.user_id}`,
      ).then(function(res) {
        // myCouponDatas 만들기
        setMyCouponDatas(res.data);

        // userCoupom, userEvent 만들기
        const tmpCoupon = [];
        const tmpEvent = [];
        res.data.forEach(element => {
          tmpCoupon.push(element.coupon_select);
          tmpEvent.push(element.event_id);
        });
        setUserCoupon(tmpCoupon);
        setUserEvent(tmpEvent);
      });
      setSelectedEvent({});
      setForceRender({});

      // myCoupon으로 이동할 것인지 물어보기
      const confirmMessage = window.confirm(
        '쿠폰을 담았습니다. 마이쿠폰함으로 이동하시겠습니까?',
      );
      if (confirmMessage) {
        window.location.href = '/mycoupon';
      }
    } else {
      alert('하나 이상의 상품을 골라주세요.');
    }
  };

  const userNotLogin = () => {
    const confirmMessage = window.confirm('로그인 후 이용 가능합니다.');
    if (confirmMessage) {
      window.location.href = '/auth';
    }
  };

  function eventGridRender(index, tmpData) {
    // const checkedStyle = {
    //   opacity: '0.5',
    //   border: '2px solid black',
    // };

    if (!userEvent.includes(tmpData.event_id)) {
      return (
        <Fragment key={tmpData.event_id}>
          <Grid
            item
            xs={12}
            className={isMobile ? 'mobileEventall__item' : 'eventall__item'}
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Grid
              item
              xs={4}
              container
              direction="row"
              justify="center"
              alignItems="center"
              onClick={() => choiceProduct(tmpData, 1)}
              className={
                selectedEvent[tmpData.event_id] ===
                tmpData.event_item['1'].prod_id
                  ? 'eventall__item--check_item eventitemHeight'
                  : 'eventitemHeight'
              }
            >
              <Grid
                className={
                  selectedEvent[tmpData.event_id] ===
                  tmpData.event_item['1'].prod_id
                    ? 'eventall__check_box'
                    : 'eventall__check_box--none'
                }
              >
                <CheckIcon className="eventall__check_icon" />
              </Grid>
              <Grid item xs={12} md={5} className="Centering">
                <img
                  className={isMobile ? 'mobiletmp' : 'tmp'}
                  src={`${serverImgUrl}${
                    Object(productDatas[tmpData.event_item['1'].prod_id - 1])
                      .prod_image
                  }`}
                  alt={`${serverImgUrl}${
                    Object(productDatas[tmpData.event_item['1'].prod_id - 1])
                      .prod_name
                  }`}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={7}
                container
                direction="column"
                justify="space-between"
                alignItems="flex-end"
              >
                <div
                  className={
                    isMobile
                      ? 'mobileEventall__item--title'
                      : 'eventall__item--title'
                  }
                >
                  {
                    Object(productDatas[tmpData.event_item['1'].prod_id - 1])
                      .prod_title
                  }
                </div>
                <div>
                  <span
                    className={
                      isMobile
                        ? 'mobileEventall__item--sale_p'
                        : 'eventall__item--sale_p'
                    }
                  >
                    최대&nbsp;
                  </span>
                  <span
                    className={
                      isMobile
                        ? 'mobileEventall__item--sale'
                        : 'eventall__item--sale'
                    }
                  >
                    {
                      Object(productDatas[tmpData.event_item['1'].prod_id - 1])
                        .prod_sale
                    }
                    %
                  </span>
                </div>
                <div>
                  <span
                    className={
                      isMobile
                        ? 'mobileEventall__item--price_line'
                        : 'eventall__item--price_line'
                    }
                  >
                    {numberWithCommas(
                      Object(productDatas[tmpData.event_item['1'].prod_id - 1])
                        .prod_price,
                    )}
                    원
                  </span>
                  <span
                    className={
                      isMobile
                        ? 'mobileEventall__item--price'
                        : 'eventall__item--price'
                    }
                  >
                    &nbsp;
                    {numberWithCommas(
                      parseInt(
                        Object(
                          productDatas[tmpData.event_item['1'].prod_id - 1],
                        ).prod_price *
                          (100 -
                            Object(
                              productDatas[tmpData.event_item['1'].prod_id - 1],
                            ).prod_sale) *
                          0.01,
                      ),
                    )}
                    원
                  </span>
                </div>
              </Grid>
            </Grid>

            <Grid item xs={1}>
              <p className="eventall__item--vs">VS</p>
            </Grid>

            <Grid
              item
              xs={4}
              container
              direction="row"
              justify="center"
              alignItems="center"
              onClick={() => choiceProduct(tmpData, 2)}
              className={
                selectedEvent[tmpData.event_id] ===
                tmpData.event_item['2'].prod_id
                  ? 'eventall__item--check_item '
                  : 'eventitemHeight'
              }
            >
              <Grid
                className={
                  selectedEvent[tmpData.event_id] ===
                  tmpData.event_item['2'].prod_id
                    ? 'eventall__check_box'
                    : 'eventall__check_box--none'
                }
              >
                <CheckIcon className="eventall__check_icon" />
              </Grid>
              <Grid item xs={12} md={5} className="Centering">
                <img
                  className={isMobile ? 'mobiletmp' : 'tmp'}
                  src={`${serverImgUrl}${
                    Object(productDatas[tmpData.event_item['2'].prod_id - 1])
                      .prod_image
                  }`}
                  alt={`${serverImgUrl}${
                    Object(productDatas[tmpData.event_item['2'].prod_id - 1])
                      .prod_name
                  }`}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={7}
                container
                direction="column"
                justify="space-between"
                alignItems="flex-end"
              >
                <div
                  className={
                    isMobile
                      ? 'mobileEventall__item--title'
                      : 'eventall__item--title'
                  }
                >
                  {
                    Object(productDatas[tmpData.event_item['2'].prod_id - 1])
                      .prod_title
                  }
                </div>
                <div>
                  <span
                    className={
                      isMobile
                        ? 'mobileEventall__item--sale_p'
                        : 'eventall__item--sale_p'
                    }
                  >
                    최대&nbsp;
                  </span>
                  <span
                    className={
                      isMobile
                        ? 'mobileEventall__item--sale'
                        : 'eventall__item--sale'
                    }
                  >
                    {
                      Object(productDatas[tmpData.event_item['2'].prod_id - 1])
                        .prod_sale
                    }
                    %
                  </span>
                </div>
                <div>
                  <span
                    className={
                      isMobile
                        ? 'mobileEventall__item--price_line'
                        : 'eventall__item--price_line'
                    }
                  >
                    {numberWithCommas(
                      Object(productDatas[tmpData.event_item['2'].prod_id - 1])
                        .prod_price,
                    )}
                    원
                  </span>
                  <span
                    className={
                      isMobile
                        ? 'mobileEventall__item--price'
                        : 'eventall__item--price'
                    }
                  >
                    &nbsp;
                    {numberWithCommas(
                      parseInt(
                        Object(
                          productDatas[tmpData.event_item['2'].prod_id - 1],
                        ).prod_price *
                          (100 -
                            Object(
                              productDatas[tmpData.event_item['2'].prod_id - 1],
                            ).prod_sale) *
                          0.01,
                      ),
                    )}
                    원
                  </span>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={1} md={2} className="Centering eventitemHeight">
              <List>
                <ListItem
                  button
                  onClick={
                    user.status === 'login' ? submitCouponData : userNotLogin
                  }
                  className={
                    isMobile
                      ? 'mobileEventall__button--column'
                      : 'eventall__button--column'
                  }
                >
                  <ListItemIcon className="eventall__button--icon">
                    <SendIcon />
                  </ListItemIcon>
                  <span>쿠폰담기</span>
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Divider style={{ margin: '0px 0 0px 0' }} />
        </Fragment>
      );
    } else {
      return (
        <Fragment key={tmpData.event_id}>
          <Grid
            item
            xs={12}
            className={
              isMobile
                ? 'mobile_eventall__item--part_event'
                : 'eventall__item--part_event'
            }
          >
            <p className="eventall__item--part_mention">
              이미 참여한 이벤트 입니다.
            </p>
          </Grid>
          <Grid
            className={isMobile ? 'mobileEventall__item' : 'eventall__item'}
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Grid
              xs={4}
              item
              container
              direction="row"
              justify="center"
              alignItems="center"
              onClick={() => choiceProduct(tmpData, 1)}
              className={
                userCoupon.includes(tmpData.event_item['1'].prod_id)
                  ? 'eventall__item--check_item eventitemHeight'
                  : 'eventitemHeight'
              }
            >
              <Grid
                className={
                  userCoupon.includes(tmpData.event_item['1'].prod_id)
                    ? 'eventall__check_box'
                    : 'eventall__check_box--none'
                }
              >
                <CheckIcon className="eventall__check_icon" />
              </Grid>
              <Grid item xs={12} md={5} className="Centering">
                <img
                  className={isMobile ? 'mobiletmp' : 'tmp'}
                  src={`${serverImgUrl}${
                    Object(productDatas[tmpData.event_item['1'].prod_id - 1])
                      .prod_image
                  }`}
                  alt={`${serverImgUrl}${
                    Object(productDatas[tmpData.event_item['1'].prod_id - 1])
                      .prod_name
                  }`}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={7}
                container
                direction="column"
                justify="space-between"
                alignItems="flex-end"
              >
                <div
                  className={
                    isMobile
                      ? 'mobileEventall__item--title'
                      : 'eventall__item--title'
                  }
                >
                  {
                    Object(productDatas[tmpData.event_item['1'].prod_id - 1])
                      .prod_title
                  }
                </div>
                <div>
                  <span
                    className={
                      isMobile
                        ? 'mobileEventall__item--sale_p'
                        : 'eventall__item--sale_p'
                    }
                  >
                    최대&nbsp;
                  </span>
                  <span
                    className={
                      isMobile
                        ? 'mobileEventall__item--sale'
                        : 'eventall__item--sale'
                    }
                  >
                    {
                      Object(productDatas[tmpData.event_item['1'].prod_id - 1])
                        .prod_sale
                    }
                    %
                  </span>
                </div>
                <div>
                  <span
                    className={
                      isMobile
                        ? 'mobileEventall__item--price_line'
                        : 'eventall__item--price_line'
                    }
                  >
                    {numberWithCommas(
                      Object(productDatas[tmpData.event_item['1'].prod_id - 1])
                        .prod_price,
                    )}
                    원
                  </span>
                  <span
                    className={
                      isMobile
                        ? 'mobileEventall__item--price'
                        : 'eventall__item--price'
                    }
                  >
                    &nbsp;
                    {numberWithCommas(
                      parseInt(
                        Object(
                          productDatas[tmpData.event_item['1'].prod_id - 1],
                        ).prod_price *
                          (100 -
                            Object(
                              productDatas[tmpData.event_item['1'].prod_id - 1],
                            ).prod_sale) *
                          0.01,
                      ),
                    )}
                    원
                  </span>
                </div>
              </Grid>
            </Grid>

            <Grid item md={1}>
              <p className="eventall__item--vs">VS</p>
            </Grid>

            <Grid
              item
              xs={4}
              container
              direction="row"
              justify="center"
              alignItems="center"
              onClick={() => choiceProduct(tmpData, 2)}
              className={
                userCoupon.includes(tmpData.event_item['2'].prod_id)
                  ? 'eventall__item--check_item eventitemHeight'
                  : 'eventitemHeight'
              }
            >
              <Grid
                className={
                  userCoupon.includes(tmpData.event_item['2'].prod_id)
                    ? 'eventall__check_box'
                    : 'eventall__check_box--none'
                }
              >
                <CheckIcon className="eventall__check_icon" />
              </Grid>
              <Grid item xs={12} md={5} className="Centering">
                <img
                  className={isMobile ? 'mobiletmp' : 'tmp'}
                  src={`${serverImgUrl}${
                    Object(productDatas[tmpData.event_item['2'].prod_id - 1])
                      .prod_image
                  }`}
                  alt={`${serverImgUrl}${
                    Object(productDatas[tmpData.event_item['2'].prod_id - 1])
                      .prod_name
                  }`}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={7}
                container
                direction="column"
                justify="space-between"
                alignItems="flex-end"
              >
                <div
                  className={
                    isMobile
                      ? 'mobileEventall__item--title'
                      : 'eventall__item--title'
                  }
                >
                  {
                    Object(productDatas[tmpData.event_item['2'].prod_id - 1])
                      .prod_title
                  }
                </div>
                <div>
                  <span
                    className={
                      isMobile
                        ? 'mobileEventall__item--sale_p'
                        : 'eventall__item--sale_p'
                    }
                  >
                    최대&nbsp;
                  </span>
                  <span
                    className={
                      isMobile
                        ? 'mobileEventall__item--sale'
                        : 'eventall__item--sale'
                    }
                  >
                    {
                      Object(productDatas[tmpData.event_item['2'].prod_id - 1])
                        .prod_sale
                    }
                    %
                  </span>
                </div>
                <div>
                  <span
                    className={
                      isMobile
                        ? 'mobileEventall__item--price_line'
                        : 'eventall__item--price_line'
                    }
                  >
                    {numberWithCommas(
                      Object(productDatas[tmpData.event_item['2'].prod_id - 1])
                        .prod_price,
                    )}
                    원
                  </span>
                  <span
                    className={
                      isMobile
                        ? 'mobileEventall__item--price'
                        : 'eventall__item--price'
                    }
                  >
                    &nbsp;
                    {numberWithCommas(
                      parseInt(
                        Object(
                          productDatas[tmpData.event_item['2'].prod_id - 1],
                        ).prod_price *
                          (100 -
                            Object(
                              productDatas[tmpData.event_item['2'].prod_id - 1],
                            ).prod_sale) *
                          0.01,
                      ),
                    )}
                    원
                  </span>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={1} md={2} className="Centering eventitemHeight">
              <List>
                <ListItem
                  button
                  onClick={
                    user.status === 'login' ? submitCouponData : userNotLogin
                  }
                  className={
                    isMobile
                      ? 'mobileEventall__button--column'
                      : 'eventall__button--column'
                  }
                >
                  <ListItemIcon className="eventall__button--icon">
                    <SendIcon />
                  </ListItemIcon>
                  <span>쿠폰담기</span>
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Divider style={{ margin: '0px 0 0px 0' }} />
        </Fragment>
      );
    }
  }

  return (
    <Wrapper>
      <Layout>
        <Grid style={{ display: 'flex', flexDirection: 'column' }}>
          {isMobile ? (
            <>
              <img
                // src="https://i3b309.p.ssafy.io/images/eventall.jpg"
                src={`${serverImgUrl}eventall.jpg`}
                alt="이벤트 소개 이미지"
                // style={{ width: 'auto' }}
              />
              {/* <Grid>
                <NestedList />
              </Grid> */}
              <Grid>
                {currentEventDatas.map((tmpData, index) =>
                  eventGridRender(index, tmpData),
                )}
              </Grid>
            </>
          ) : (
            <>
              <Grid className="eventall__layout--container" container>
                <Grid item md={9} container>
                  {/* <Grid item xs={2}>
                    <NestedList className="eventall__layout--coupon_button" />
                  </Grid> */}
                  <Grid item xs={12}>
                    <Grid className="eventall__layout--container">
                      <img
                        // src="https://i3b309.p.ssafy.io/images/배너3.jpg"
                        src={`${serverImgUrl}배너3.jpg`}
                        alt="이벤트 소개 이미지"
                      />
                    </Grid>
                    {currentEventDatas.map((tmpData, index) =>
                      eventGridRender(index, tmpData),
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Layout>
    </Wrapper>
  );
};

export default EventAll;
