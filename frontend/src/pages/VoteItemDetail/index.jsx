import React, { Component, useState, useContext, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import { PriorityHighSharp, CodeSharp } from '@material-ui/icons';
import Layout from '../../layout/';
import {
  Box,
  Grid,
  Card,
  Button,
  Dialog,
  useMediaQuery,
  DialogActions,
} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Wrapper from './styles';
import Axios from 'axios';
import WebDeatilModal from '../../components/WebModal/ModalMain';
import QuizModal from '../../components/WebModal/QuizModal';
import ClearIcon from '@material-ui/icons/Clear';
import { CommonContext } from '../../context/CommonContext';

const QuizDialog = () => {
  const { webQuizDialogOpen, setWebQuizDialogOpen } = useContext(CommonContext);
  const fullScreen = useMediaQuery(theme => theme.breakpoints.down('md'));

  const handleClose = () => {
    setWebQuizDialogOpen(false);
  };

  return (
    <Dialog
      open={webQuizDialogOpen}
      onClose={handleClose}
      // fullScreen={fullScreen}
      aria-labelledby="max-width-dialog-title"
      PaperProps={{
        style: {
          height: '10vh',
          padding: '10px',
          width: '90vw',
          maxWidth: 'none',
          overflowX: 'hidden',
          overflowY: 'auto',
          position: 'inherit',
          width: '80%',
          height: '80%',
          justifyContent: 'center',
        },
      }}
      BackdropProps={{
        style: {
          backgroundColor: 'rgba(0,0,0,0.85)',
        },
      }}
    >
      <DialogActions style={{ padding: 0 }}>
        {/* <Date>
              <span className="date on">{displayEndTime()}</span>
            </Date> */}
        <Grid className="go-back-btn" onClick={handleClose}>
          <ClearIcon
            size="medium"
            style={{ color: '#fff', cursor: 'pointer' }}
          />
        </Grid>
      </DialogActions>
      <QuizModal />
    </Dialog>
  );
};

const ItemDetail = ({ match }) => {
  const { user, productDatas, setProductDatas } = useContext(CommonContext);
  const { currentEventDatas, setCurrentEventDatas } = useContext(CommonContext);
  const { itemDialogOpen, setItemDialogOpen } = useContext(CommonContext);

  const [eventActivated, setEventActivated] = useState(false);
  const [userJoinedEvent, setUserJoinedEvent] = useState(false);
  const [userHasCoupon, setUserHasCoupon] = useState(false);

  const { eventNum, setEventNum } = useContext(CommonContext);
  const fullScreen = useMediaQuery(theme => theme.breakpoints.down('md'));
  const { myCouponDatas, setMyCouponDatas } = useContext(CommonContext);

  // 1000 단위마다 , 찍어주는 함수입니다. (퍼옴)
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  // 웹상에서 퀴즈모달을 띄우기 위해 선언했습니다.
  const { webQuizDialogOpen, setWebQuizDialogOpen } = useContext(CommonContext);

  // console.log(testimg.items[0].prod_image);

  const click1 = () => {
    setItemDialogOpen(itemDialogOpen => true);
  };

  const handleClose = () => {
    setItemDialogOpen(itemDialogOpen => false);
  };

  const QuizDialogOpen = () => {
    setWebQuizDialogOpen(true);
  };

  // vs이벤트가 진행중인지 판단하는 함수 입니다.
  // match.params.id 를 통해 해당 상품의 id를 조회 할 수 있습니다.
  // currentEventDatas.length 를 통해 행사중인 이벤트의 개수를 알 수 있습니다.
  const checkEvent = () => {
    for (var i = 0; i < currentEventDatas.length; i++) {
      if (
        Number(match.params.id) ===
          currentEventDatas[i].event_item['1'].prod_id ||
        Number(match.params.id) === currentEventDatas[i].event_item['2'].prod_id
      ) {
        setEventActivated(true);
        setEventNum(i);
      }
    }
  };

  const checkedUserHasCoupon = () => {
    for (var i = 0; i < myCouponDatas.length; i++) {
      if (Number(match.params.id) === myCouponDatas[i].coupon_select) {
        setUserHasCoupon(true);
      }
    }
  };

  const checkUser = () => {
    let eventNum = '';

    for (var i = 0; i < currentEventDatas.length; i++) {
      if (
        Number(match.params.id) ===
          Object(currentEventDatas[i]).event_item['1'].prod_id ||
        Number(match.params.id) ===
          Object(currentEventDatas[i]).event_item['2'].prod_id
      ) {
        eventNum = Object(currentEventDatas[i]).event_id;
      }
    }

    for (let j = 0; j < myCouponDatas.length; j++) {
      if (eventNum === Object(myCouponDatas[j]).event_id) {
        setUserJoinedEvent(true);
      }
    }
  };

  useEffect(checkEvent);
  useEffect(checkUser);
  useEffect(checkedUserHasCoupon);

  const product_id = match.params.id - 1;
  const isMobile = useMediaQuery('(max-width:920px)');

  const userNotLogin = () => {
    const confirmMessage = window.confirm('로그인 후 이용 가능합니다.');
    if (confirmMessage) {
      window.location.href = '/auth';
    }
  };

  return (
    <Wrapper>
      {eventActivated ? (
        <Grid>
          {isMobile ? (
            <Layout>
              <br />
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <Grid item xs={10}>
                  {productDatas.map((itemData, index) => {
                    if (
                      productDatas[match.params.id - 1].prod_id ===
                      itemData.prod_id
                    ) {
                      return (
                        <Card className="m_effect">
                          <img
                            src={`https://i3b309.p.ssafy.io/${itemData.prod_image}`}
                            alt="test"
                            style={{
                              width: '100%',
                              height: 'auto',
                              mr: '10px',
                            }}
                          />
                        </Card>
                      );
                    }
                  })}
                </Grid>
                <Grid item xs={12}>
                  {productDatas.map((itemData, index) => {
                    if (
                      productDatas[match.params.id - 1].prod_id ===
                      itemData.prod_id
                    )
                      return (
                        <Grid className="info">
                          <br />
                          <br />
                          <h2 className="center">
                            {productDatas[match.params.id - 1].prod_title}
                          </h2>
                          <br />
                          <div className="priceinfo">
                            <span className="m_price">
                              {numberWithCommas(
                                productDatas[match.params.id - 1].prod_price,
                              )}
                            </span>
                            <span className="m_unit">원</span>
                            <h5>
                              (총 용량 :{' '}
                              {productDatas[match.params.id - 1].prod_weight})
                            </h5>
                          </div>

                          <br />
                          <h3 className="select">
                            {productDatas[match.params.id - 1].prod_desc}
                          </h3>
                          <div className="button">
                            <Button
                              variant="contained"
                              color="primary"
                              disableElevation
                              onClick={
                                user.status === 'login'
                                  ? QuizDialogOpen
                                  : userNotLogin
                              }
                              // disabled={user.user_quiz}
                              style={{ marginLeft: '20px' }}
                            >
                              퀴즈 풀기
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              disableElevation
                              onClick={
                                user.status === 'login' ? click1 : userNotLogin
                              }
                              // disabled={!(eventActivated && !userJoinedEvent)}
                              style={{ marginLeft: '20px' }}
                            >
                              쿠폰 받기
                            </Button>
                          </div>

                          {/* 이벤트가 진행중인 상품일때만 이 버튼을 표시한다. */}
                          <hr />
                          <Grid
                            item
                            xs={12}
                            style={{
                              justifyContent: 'space-between',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <span className="w_DCT">
                              <input
                                type="checkBox"
                                className="quizChecked"
                                disabled={true}
                                checked={user.user_quiz}
                              />
                              &nbsp; 퀴즈 참여 적용 할인(
                              {productDatas[match.params.id - 1].prod_sale -
                                (productDatas[match.params.id - 1].prod_sale -
                                  30)}
                              %)
                            </span>{' '}
                            {user.user_quiz ? (
                              <span className="w_DCP">
                                -
                                {numberWithCommas(
                                  productDatas[match.params.id - 1].prod_price *
                                    0.3,
                                )}
                                원
                              </span>
                            ) : (
                              <span className="w_DCP">미적용</span>
                            )}
                          </Grid>
                          <Grid
                            style={{
                              justifyContent: 'space-between',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <span className="w_DCT">
                              <input
                                type="checkBox"
                                className="quizChecked"
                                disabled={true}
                                checked={
                                  !(eventActivated && !userJoinedEvent) &&
                                  userHasCoupon
                                }
                              />
                              {/* 이 텍스트 부분이 Grid 혹은 div 태그 안에 감싸졌으면 좋겠음. */}
                              &nbsp; 이벤트 참여 적용 할인(
                              {productDatas[match.params.id - 1].prod_sale - 30}
                              %)
                            </span>{' '}
                            {!(eventActivated && !userJoinedEvent) &&
                            userHasCoupon ? (
                              <span className="w_DCP">
                                -
                                {numberWithCommas(
                                  parseInt(
                                    productDatas[match.params.id - 1]
                                      .prod_price *
                                      ((productDatas[match.params.id - 1]
                                        .prod_sale -
                                        30) /
                                        100),
                                  ),
                                )}
                                원
                              </span>
                            ) : (
                              <span className="w_DCP">미적용</span>
                            )}
                          </Grid>
                          <hr />
                          <Grid
                            style={{
                              justifyContent: 'space-between',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <div className="loading1">
                              <span>실</span>
                              <span>구</span>
                              <span>매</span>
                              &nbsp; &nbsp;
                              <span>가</span>
                              <span>격</span>
                            </div>
                            <div className="loading2">
                              <span>
                                {numberWithCommas(
                                  parseInt(
                                    productDatas[match.params.id - 1]
                                      .prod_price -
                                      ((user.user_quiz
                                        ? productDatas[match.params.id - 1]
                                            .prod_price * 0.3
                                        : 0) +
                                        (userHasCoupon
                                          ? productDatas[match.params.id - 1]
                                              .prod_price *
                                            ((productDatas[match.params.id - 1]
                                              .prod_sale -
                                              30) /
                                              100)
                                          : 0)),
                                  ),
                                )}
                                원
                              </span>
                            </div>
                          </Grid>
                          <br />
                          <Box
                            style={{
                              border: '1px solid',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <span className="w_DCP">
                              총 &nbsp;
                              {numberWithCommas(
                                parseInt(
                                  0 +
                                    (user.user_quiz
                                      ? productDatas[match.params.id - 1]
                                          .prod_price * 0.3
                                      : 0) +
                                    (userHasCoupon
                                      ? productDatas[match.params.id - 1]
                                          .prod_price *
                                        ((productDatas[match.params.id - 1]
                                          .prod_sale -
                                          30) /
                                          100)
                                      : 0),
                                ),
                              )}
                              원
                            </span>
                            &nbsp;
                            <span style={{ fontSize: '20px' }}>
                              할인 혜택을 받으셨습니다.
                            </span>
                          </Box>
                        </Grid>
                      );
                  })}
                </Grid>
              </Grid>
              <Dialog
                open={itemDialogOpen}
                onClose={handleClose}
                fullScreen={fullScreen}
                aria-labelledby="max-width-dialog-title"
                PaperProps={{
                  style: {
                    height: '10vh',
                    padding: '10px',
                    width: '90vw',
                    maxWidth: 'none',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    position: 'inherit',
                    width: '80%',
                    height: '80%',
                    justifyContent: 'center',
                  },
                }}
                BackdropProps={{
                  style: {
                    backgroundColor: 'rgba(0,0,0,0.85)',
                  },
                }}
              >
                <DialogActions style={{ padding: 0 }}>
                  {/* <Date>
                <span className="date on">{displayEndTime()}</span>
              </Date> */}
                  <Grid className="go-back-btn" onClick={handleClose}>
                    <ClearIcon
                      size="medium"
                      style={{ color: '#fff', cursor: 'pointer' }}
                    />
                  </Grid>
                </DialogActions>
                <WebDeatilModal />
              </Dialog>
              <QuizDialog />
            </Layout>
          ) : (
            <Layout>
              <br />
              <Grid className="Centering">
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                  md={9}
                >
                  <Grid item xs={4}>
                    {productDatas.map((itemData, index) => {
                      if (
                        productDatas[match.params.id - 1].prod_id ===
                        itemData.prod_id
                      ) {
                        return (
                          <Card className="effect">
                            <img
                              src={`https://i3b309.p.ssafy.io/${itemData.prod_image}`}
                              // src={`../../${productDatas[match.params.id - 1].prod_image}`}
                              alt="test"
                              style={{
                                width: '100%',
                                height: 'auto',
                                mr: '10px',
                              }}
                            />
                          </Card>
                        );
                      }
                    })}
                  </Grid>

                  <Grid item xs={6}>
                    {/* <h2 style={{ textAlign: 'center' }}>{match.params.name}</h2>
                    <hr /> */}
                    {productDatas.map((itemData, index) => {
                      if (
                        productDatas[match.params.id - 1].prod_id ===
                        itemData.prod_id
                      )
                        return (
                          <Grid>
                            <br />
                            <br />
                            <br />
                            <br />
                            <h2>
                              <strong>
                                {productDatas[match.params.id - 1].prod_title}
                              </strong>
                            </h2>
                            <br />
                            <span className="price2">
                              {numberWithCommas(
                                productDatas[match.params.id - 1].prod_price,
                              )}
                            </span>
                            <span className="unit1">원</span>
                            <h5>
                              (총 용량 :{' '}
                              {productDatas[match.params.id - 1].prod_weight})
                            </h5>{' '}
                            <br />
                            <br />
                            <h3 className="select">
                              {productDatas[match.params.id - 1].prod_desc}
                            </h3>
                            <br />
                            <br />
                            <div className="button">
                              <Button
                                variant="contained"
                                color="primary"
                                disableElevation
                                onClick={
                                  user.status === 'login'
                                    ? QuizDialogOpen
                                    : userNotLogin
                                }
                                // disabled={user.user_quiz}
                                style={{ marginLeft: '20px' }}
                              >
                                퀴즈 풀기
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                disableElevation
                                onClick={
                                  user.status === 'login'
                                    ? click1
                                    : userNotLogin
                                }
                                // disabled={!(eventActivated && !userJoinedEvent)}
                                style={{ marginLeft: '20px' }}
                              >
                                쿠폰 받기
                              </Button>
                            </div>
                            {/* 이벤트가 진행중인 상품일때만 이 버튼을 표시한다. */}
                            <hr />
                            <Grid
                              style={{
                                justifyContent: 'space-between',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <span className="w_DCT">
                                {/* <FiberManualRecordIcon
                                style={{ fontSize: '15px' }}
                              /> */}
                                <input
                                  type="checkBox"
                                  className="quizChecked"
                                  disabled={true}
                                  checked={user.user_quiz}
                                />
                                &nbsp; 퀴즈 참여 적용 할인(
                                {productDatas[match.params.id - 1].prod_sale -
                                  (productDatas[match.params.id - 1].prod_sale -
                                    30)}
                                %)
                              </span>{' '}
                              {user.user_quiz ? (
                                <span className="w_DCP">
                                  -
                                  {numberWithCommas(
                                    productDatas[match.params.id - 1]
                                      .prod_price * 0.3,
                                  )}
                                  원
                                </span>
                              ) : (
                                <span className="w_DCP">미적용</span>
                              )}
                            </Grid>
                            <Grid
                              style={{
                                justifyContent: 'space-between',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <span className="w_DCT">
                                <input
                                  type="checkBox"
                                  className="quizChecked"
                                  disabled={true}
                                  checked={
                                    !(eventActivated && !userJoinedEvent) &&
                                    userHasCoupon
                                  }
                                />
                                {/* 이 텍스트 부분이 Grid 혹은 div 태그 안에 감싸졌으면 좋겠음. */}
                                &nbsp; 이벤트 참여 적용 할인(
                                {productDatas[match.params.id - 1].prod_sale -
                                  30}
                                %)
                              </span>{' '}
                              {!(eventActivated && !userJoinedEvent) &&
                              userHasCoupon ? (
                                <span className="w_DCP">
                                  -
                                  {numberWithCommas(
                                    parseInt(
                                      productDatas[match.params.id - 1]
                                        .prod_price *
                                        ((productDatas[match.params.id - 1]
                                          .prod_sale -
                                          30) /
                                          100),
                                    ),
                                  )}
                                  원
                                </span>
                              ) : (
                                <span className="w_DCP">미적용</span>
                              )}
                            </Grid>
                            <hr />
                            <Grid
                              style={{
                                justifyContent: 'space-between',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <div className="loading1">
                                <span>실</span>
                                <span>구</span>
                                <span>매</span>
                                &nbsp; &nbsp;
                                <span>가</span>
                                <span>격</span>
                              </div>
                              <div className="loading2">
                                <span>
                                  {numberWithCommas(
                                    parseInt(
                                      productDatas[match.params.id - 1]
                                        .prod_price -
                                        ((user.user_quiz
                                          ? productDatas[match.params.id - 1]
                                              .prod_price * 0.3
                                          : 0) +
                                          (userHasCoupon
                                            ? productDatas[match.params.id - 1]
                                                .prod_price *
                                              ((productDatas[
                                                match.params.id - 1
                                              ].prod_sale -
                                                30) /
                                                100)
                                            : 0)),
                                    ),
                                  )}
                                  원
                                </span>
                              </div>
                            </Grid>
                            <br />
                            <Box
                              style={{
                                border: '1px solid',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <span className="w_DCP">
                                총 &nbsp;
                                {numberWithCommas(
                                  parseInt(
                                    0 +
                                      (user.user_quiz
                                        ? productDatas[match.params.id - 1]
                                            .prod_price * 0.3
                                        : 0) +
                                      (userHasCoupon
                                        ? productDatas[match.params.id - 1]
                                            .prod_price *
                                          ((productDatas[match.params.id - 1]
                                            .prod_sale -
                                            30) /
                                            100)
                                        : 0),
                                  ),
                                )}
                                원
                              </span>
                              &nbsp;
                              <span style={{ fontSize: '20px' }}>
                                할인 혜택을 받으셨습니다.
                              </span>
                            </Box>
                          </Grid>
                        );
                    })}
                  </Grid>
                </Grid>
              </Grid>
              <Dialog
                open={itemDialogOpen}
                onClose={handleClose}
                fullScreen={fullScreen}
                aria-labelledby="max-width-dialog-title"
                PaperProps={{
                  style: {
                    height: '10vh',
                    padding: '10px',
                    width: '90vw',
                    maxWidth: 'none',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    position: 'inherit',
                    width: '80%',
                    height: '80%',
                    justifyContent: 'center',
                  },
                }}
                BackdropProps={{
                  style: {
                    backgroundColor: 'rgba(0,0,0,0.85)',
                  },
                }}
              >
                <DialogActions style={{ padding: 0 }}>
                  {/* <Date>
              <span className="date on">{displayEndTime()}</span>
            </Date> */}
                  <Grid className="go-back-btn" onClick={handleClose}>
                    <ClearIcon
                      size="medium"
                      style={{ color: '#fff', cursor: 'pointer' }}
                    />
                  </Grid>
                </DialogActions>
                <WebDeatilModal />
              </Dialog>
              <QuizDialog />
            </Layout>
          )}
        </Grid>
      ) : (
        <Grid>
          {isMobile ? (
            <Layout>
              <br />
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <Grid item xs={10}>
                  {productDatas.map((itemData, index) => {
                    if (
                      productDatas[match.params.id - 1].prod_id ===
                      itemData.prod_id
                    ) {
                      return (
                        <Card>
                          <img
                            src={`https://i3b309.p.ssafy.io/${itemData.prod_image}`}
                            alt="test"
                            style={{
                              width: '100%',
                              height: 'auto',
                              mr: '10px',
                            }}
                          />
                        </Card>
                      );
                    }
                  })}
                </Grid>
                <Grid item xs={12}>
                  {productDatas.map((itemData, index) => {
                    if (
                      productDatas[match.params.id - 1].prod_id ===
                      itemData.prod_id
                    )
                      return (
                        <Grid className="info">
                          <br />
                          <br />
                          <h2 className="center">
                            {productDatas[match.params.id - 1].prod_title}
                          </h2>
                          <br />
                          <div className="priceinfo">
                            <span className="m_price">
                              {numberWithCommas(
                                productDatas[match.params.id - 1].prod_price,
                              )}
                            </span>
                            <span className="m_unit">원</span>
                            <h5>
                              (총 용량 :{' '}
                              {productDatas[match.params.id - 1].prod_weight})
                            </h5>
                          </div>

                          <br />
                          <h3 className="select">
                            {productDatas[match.params.id - 1].prod_desc}
                          </h3>
                          <div className="button">
                            <Button
                              variant="contained"
                              color="primary"
                              disableElevation
                              onClick={
                                user.status === 'login'
                                  ? QuizDialogOpen
                                  : userNotLogin
                              }
                              // disabled={user.user_quiz}
                              style={{ marginLeft: '20px' }}
                            >
                              퀴즈 풀기
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              disableElevation
                              onClick={
                                user.status === 'login' ? click1 : userNotLogin
                              }
                              // disabled={!(eventActivated && !userJoinedEvent)}
                              style={{ marginLeft: '20px' }}
                            >
                              쿠폰 받기
                            </Button>
                          </div>

                          {/* 이벤트가 진행중인 상품일때만 이 버튼을 표시한다. */}
                          <hr />
                          <Grid
                            item
                            xs={12}
                            style={{
                              justifyContent: 'space-between',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <span className="w_DCT">
                              <input
                                type="checkBox"
                                className="quizChecked"
                                disabled={true}
                                checked={user.user_quiz}
                              />
                              &nbsp; 퀴즈 참여 적용 할인(
                              {productDatas[match.params.id - 1].prod_sale -
                                (productDatas[match.params.id - 1].prod_sale -
                                  30)}
                              %)
                            </span>{' '}
                            {user.user_quiz ? (
                              <span className="w_DCP">
                                -
                                {numberWithCommas(
                                  productDatas[match.params.id - 1].prod_price *
                                    0.3,
                                )}
                                원
                              </span>
                            ) : (
                              <span className="w_DCP">미적용</span>
                            )}
                          </Grid>
                          <Grid
                            style={{
                              justifyContent: 'space-between',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <span className="w_DCT">
                              <input
                                type="checkBox"
                                className="quizChecked"
                                disabled={true}
                                checked={
                                  !(eventActivated && !userJoinedEvent) &&
                                  userHasCoupon
                                }
                              />
                              {/* 이 텍스트 부분이 Grid 혹은 div 태그 안에 감싸졌으면 좋겠음. */}
                              &nbsp; 이벤트 참여 적용 할인(
                              {productDatas[match.params.id - 1].prod_sale - 30}
                              %)
                            </span>{' '}
                            {!(eventActivated && !userJoinedEvent) &&
                            userHasCoupon ? (
                              <span className="w_DCP">
                                -
                                {numberWithCommas(
                                  parseInt(
                                    productDatas[match.params.id - 1]
                                      .prod_price *
                                      ((productDatas[match.params.id - 1]
                                        .prod_sale -
                                        30) /
                                        100),
                                  ),
                                )}
                                원
                              </span>
                            ) : (
                              <span className="w_DCP">미적용</span>
                            )}
                          </Grid>
                          <hr />
                          <Grid
                            style={{
                              justifyContent: 'space-between',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <div className="loading1">
                              <span>실</span>
                              <span>구</span>
                              <span>매</span>
                              &nbsp; &nbsp;
                              <span>가</span>
                              <span>격</span>
                            </div>
                            <div className="loading2">
                              <span>
                                {numberWithCommas(
                                  parseInt(
                                    productDatas[match.params.id - 1]
                                      .prod_price -
                                      ((user.user_quiz
                                        ? productDatas[match.params.id - 1]
                                            .prod_price * 0.3
                                        : 0) +
                                        (userHasCoupon
                                          ? productDatas[match.params.id - 1]
                                              .prod_price *
                                            ((productDatas[match.params.id - 1]
                                              .prod_sale -
                                              30) /
                                              100)
                                          : 0)),
                                  ),
                                )}
                                원
                              </span>
                            </div>
                          </Grid>
                          <br />
                          <Box
                            style={{
                              border: '1px solid',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <span className="w_DCP">
                              총 &nbsp;
                              {numberWithCommas(
                                parseInt(
                                  0 +
                                    (user.user_quiz
                                      ? productDatas[match.params.id - 1]
                                          .prod_price * 0.3
                                      : 0) +
                                    (userHasCoupon
                                      ? productDatas[match.params.id - 1]
                                          .prod_price *
                                        ((productDatas[match.params.id - 1]
                                          .prod_sale -
                                          30) /
                                          100)
                                      : 0),
                                ),
                              )}
                              원
                            </span>
                            &nbsp;
                            <span style={{ fontSize: '20px' }}>
                              할인 혜택을 받으셨습니다.
                            </span>
                          </Box>
                        </Grid>
                      );
                  })}
                </Grid>
              </Grid>
              <Dialog
                open={itemDialogOpen}
                onClose={handleClose}
                fullScreen={fullScreen}
                aria-labelledby="max-width-dialog-title"
                PaperProps={{
                  style: {
                    height: '10vh',
                    padding: '10px',
                    width: '90vw',
                    maxWidth: 'none',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    position: 'inherit',
                    width: '80%',
                    height: '80%',
                    justifyContent: 'center',
                  },
                }}
                BackdropProps={{
                  style: {
                    backgroundColor: 'rgba(0,0,0,0.85)',
                  },
                }}
              >
                <DialogActions style={{ padding: 0 }}>
                  {/* <Date>
                <span className="date on">{displayEndTime()}</span>
              </Date> */}
                  <Grid className="go-back-btn" onClick={handleClose}>
                    <ClearIcon
                      size="medium"
                      style={{ color: '#fff', cursor: 'pointer' }}
                    />
                  </Grid>
                </DialogActions>
                <WebDeatilModal />
              </Dialog>
              <QuizDialog />
            </Layout>
          ) : (
            <Layout>
              <br />
              <Grid className="Centering">
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                  md={9}
                >
                  <Grid item xs={4}>
                    {productDatas.map((itemData, index) => {
                      if (
                        productDatas[match.params.id - 1].prod_id ===
                        itemData.prod_id
                      ) {
                        return (
                          <Card>
                            <img
                              src={`https://i3b309.p.ssafy.io/${itemData.prod_image}`}
                              // src={`../../${productDatas[match.params.id - 1].prod_image}`}
                              alt="test"
                              style={{
                                width: '100%',
                                height: 'auto',
                                mr: '10px',
                              }}
                            />
                          </Card>
                        );
                      }
                    })}
                  </Grid>

                  <Grid item xs={6}>
                    {/* <h2 style={{ textAlign: 'center' }}>{match.params.name}</h2>
                    <hr /> */}
                    {productDatas.map((itemData, index) => {
                      if (
                        productDatas[match.params.id - 1].prod_id ===
                        itemData.prod_id
                      )
                        return (
                          <Grid>
                            <br />
                            <br />
                            <br />
                            <br />
                            <h2>
                              <strong>
                                {productDatas[match.params.id - 1].prod_title}
                              </strong>
                            </h2>
                            <br />
                            <span className="price2">
                              {numberWithCommas(
                                productDatas[match.params.id - 1].prod_price,
                              )}
                            </span>
                            <span className="unit1">원</span>
                            <h5>
                              (총 용량 :{' '}
                              {productDatas[match.params.id - 1].prod_weight})
                            </h5>{' '}
                            <br />
                            <br />
                            <h3 className="select">
                              {productDatas[match.params.id - 1].prod_desc}
                            </h3>
                            <br />
                            <br />
                            <div className="button">
                              <Button
                                variant="contained"
                                color="primary"
                                disableElevation
                                onClick={
                                  user.status === 'login'
                                    ? QuizDialogOpen
                                    : userNotLogin
                                }
                                // disabled={user.user_quiz}
                                style={{ marginLeft: '20px' }}
                              >
                                퀴즈 풀기
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                disableElevation
                                onClick={
                                  user.status === 'login'
                                    ? click1
                                    : userNotLogin
                                }
                                // disabled={!(eventActivated && !userJoinedEvent)}
                                style={{ marginLeft: '20px' }}
                              >
                                쿠폰 받기
                              </Button>
                            </div>
                            {/* 이벤트가 진행중인 상품일때만 이 버튼을 표시한다. */}
                            <hr />
                            <Grid
                              style={{
                                justifyContent: 'space-between',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <span className="w_DCT">
                                {/* <FiberManualRecordIcon
                                style={{ fontSize: '15px' }}
                              /> */}
                                <input
                                  type="checkBox"
                                  className="quizChecked"
                                  disabled={true}
                                  checked={user.user_quiz}
                                />
                                &nbsp; 퀴즈 참여 적용 할인(
                                {productDatas[match.params.id - 1].prod_sale -
                                  (productDatas[match.params.id - 1].prod_sale -
                                    30)}
                                %)
                              </span>{' '}
                              {user.user_quiz ? (
                                <span className="w_DCP">
                                  -
                                  {numberWithCommas(
                                    productDatas[match.params.id - 1]
                                      .prod_price * 0.3,
                                  )}
                                  원
                                </span>
                              ) : (
                                <span className="w_DCP">미적용</span>
                              )}
                            </Grid>
                            <Grid
                              style={{
                                justifyContent: 'space-between',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <span className="w_DCT">
                                <input
                                  type="checkBox"
                                  className="quizChecked"
                                  disabled={true}
                                  checked={
                                    !(eventActivated && !userJoinedEvent) &&
                                    userHasCoupon
                                  }
                                />
                                {/* 이 텍스트 부분이 Grid 혹은 div 태그 안에 감싸졌으면 좋겠음. */}
                                &nbsp; 이벤트 참여 적용 할인(
                                {productDatas[match.params.id - 1].prod_sale -
                                  30}
                                %)
                              </span>{' '}
                              {!(eventActivated && !userJoinedEvent) &&
                              userHasCoupon ? (
                                <span className="w_DCP">
                                  -
                                  {numberWithCommas(
                                    parseInt(
                                      productDatas[match.params.id - 1]
                                        .prod_price *
                                        ((productDatas[match.params.id - 1]
                                          .prod_sale -
                                          30) /
                                          100),
                                    ),
                                  )}
                                  원
                                </span>
                              ) : (
                                <span className="w_DCP">미적용</span>
                              )}
                            </Grid>
                            <hr />
                            <Grid
                              style={{
                                justifyContent: 'space-between',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <div className="loading1">
                                <span>실</span>
                                <span>구</span>
                                <span>매</span>
                                &nbsp; &nbsp;
                                <span>가</span>
                                <span>격</span>
                              </div>
                              <div className="loading2">
                                <span>
                                  {numberWithCommas(
                                    parseInt(
                                      productDatas[match.params.id - 1]
                                        .prod_price -
                                        ((user.user_quiz
                                          ? productDatas[match.params.id - 1]
                                              .prod_price * 0.3
                                          : 0) +
                                          (userHasCoupon
                                            ? productDatas[match.params.id - 1]
                                                .prod_price *
                                              ((productDatas[
                                                match.params.id - 1
                                              ].prod_sale -
                                                30) /
                                                100)
                                            : 0)),
                                    ),
                                  )}
                                  원
                                </span>
                              </div>
                            </Grid>
                            <br />
                            <Box
                              style={{
                                border: '1px solid',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <span className="w_DCP">
                                총 &nbsp;
                                {numberWithCommas(
                                  parseInt(
                                    0 +
                                      (user.user_quiz
                                        ? productDatas[match.params.id - 1]
                                            .prod_price * 0.3
                                        : 0) +
                                      (userHasCoupon
                                        ? productDatas[match.params.id - 1]
                                            .prod_price *
                                          ((productDatas[match.params.id - 1]
                                            .prod_sale -
                                            30) /
                                            100)
                                        : 0),
                                  ),
                                )}
                                원
                              </span>
                              &nbsp;
                              <span style={{ fontSize: '20px' }}>
                                할인 혜택을 받으셨습니다.
                              </span>
                            </Box>
                          </Grid>
                        );
                    })}
                  </Grid>
                </Grid>
              </Grid>
              <Dialog
                open={itemDialogOpen}
                onClose={handleClose}
                fullScreen={fullScreen}
                aria-labelledby="max-width-dialog-title"
                PaperProps={{
                  style: {
                    height: '10vh',
                    padding: '10px',
                    width: '90vw',
                    maxWidth: 'none',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    position: 'inherit',
                    width: '80%',
                    height: '80%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                }}
                BackdropProps={{
                  style: {
                    backgroundColor: 'rgba(0,0,0,0.85)',
                  },
                }}
              >
                <DialogActions style={{ padding: 0 }}>
                  {/* <Date>
              <span className="date on">{displayEndTime()}</span>
            </Date> */}
                  <Grid className="go-back-btn" onClick={handleClose}>
                    <ClearIcon
                      size="medium"
                      style={{ color: '#fff', cursor: 'pointer' }}
                    />
                  </Grid>
                </DialogActions>
                <WebDeatilModal />
              </Dialog>
              <QuizDialog />
            </Layout>
          )}
        </Grid>
      )}
    </Wrapper>
  );
};
export default ItemDetail;
