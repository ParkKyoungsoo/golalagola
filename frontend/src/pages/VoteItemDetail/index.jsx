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
import Wrapper from './styles';
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
      fullScreen={fullScreen}
      aria-labelledby="max-width-dialog-title"
      PaperProps={{
        style: {
          height: '90vh',
          padding: '10px',
          width: '1280px',
          maxWidth: 'none',
          overflowX: 'hidden',
          overflowY: 'auto',
          position: 'inherit',
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
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const { currentEventDatas, setCurrentEventDatas } = useContext(CommonContext);
  const { itemDialogOpen, setItemDialogOpen } = useContext(CommonContext);
  const [eventActivated, setEventActivated] = useState(false);
  const { eventNum, setEventNum } = useContext(CommonContext);
  const fullScreen = useMediaQuery(theme => theme.breakpoints.down('md'));

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
  const CheckEvent = () => {
    for (var i = 0; i < currentEventDatas.length; i++) {
      if (
        Number(match.params.id) ===
          currentEventDatas[i].event_item['1'].prod_id ||
        Number(match.params.id) === currentEventDatas[i].event_item['2'].prod_id
      ) {
        setEventActivated(eventActivated => true);
        setEventNum(i);
      }
    }
  };
  useEffect(CheckEvent, []);
  const product_id = match.params.id - 1;

  return (
    <Wrapper>
      {/* <h2>{match.params.name}</h2> */}
      <Layout>
        {/* {testImg.map((testI, index) => ( */}

        <br />
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item xs={4}>
            {productDatas.map((product, index) => {
              if (
                productDatas[match.params.id - 1].prod_id === product.prod_id
              ) {
                return (
                  <Card>
                    <img
                      src={`https://i3b309.p.ssafy.io/${product.prod_image}`}
                      // src={`../../${productDatas[match.params.id - 1].prod_image}`}
                      alt="test"
                      style={{ width: '100%', height: 'auto', mr: '10px' }}
                    />
                  </Card>
                );
              }
            })}
          </Grid>

          <Grid item xs={6}>
            {/* <h2 style={{ textAlign: 'center' }}>{match.params.name}</h2>
          <hr /> */}
            {productDatas.map((product, index) => {
              if (productDatas[match.params.id - 1].prod_id === product.prod_id)
                return (
                  <Grid>
                    <h2>
                      <Badge variant="success">Event</Badge>
                    </h2>
                    <br />
                    <br />
                    <h2>
                      <strong>
                        {productDatas[match.params.id - 1].prod_title}
                      </strong>
                    </h2>
                    <br />
                    <span className="price">
                      {productDatas[match.params.id - 1].prod_price}
                    </span>
                    <span className="unit1">원</span>
                    <h5>
                      (총 용량 : {productDatas[match.params.id - 1].prod_weight}
                      )
                    </h5>{' '}
                    <br />
                    <h3 className="select">
                      {productDatas[match.params.id - 1].prod_desc}
                    </h3>
                    <br />
                    {/* 이벤트가 진행중인 상품일때만 이 버튼을 표시한다. */}
                    <hr />
                    <span className="cate">할인가</span>
                    <span className="thro">
                      {productDatas[match.params.id - 1].prod_price}원
                    </span>
                    <span className="unit2">원</span>
                    <span className="sale">
                      {parseInt(
                        (productDatas[match.params.id - 1].prod_price *
                          (100 -
                            (productDatas[match.params.id - 1].prod_sale -
                              10))) /
                          100,
                      )}
                    </span>
                    <span className="unit2">원</span>
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={click1}
                      disabled={!eventActivated}
                      style={{ marginLeft: '20px' }}
                    >
                      쿠폰 받기
                    </Button>
                    <br />
                    <br />
                    {/* 유저가 OX 퀴즈를 풀지 않았다면 활성화 시킬 버튼입니다. */}
                    <Grid>
                      <span className="cate">할인가</span>
                      <span className="thro">
                        {productDatas[match.params.id - 1].prod_price}원
                      </span>
                      <span className="sale">
                        {productDatas[match.params.id - 1].prod_price * 0.9}
                      </span>
                      <span className="unit2">원</span>
                      <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={QuizDialogOpen}
                        style={{ marginLeft: '20px' }}
                      >
                        퀴즈 풀기
                      </Button>
                      <hr />
                    </Grid>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </Grid>
                );
            })}
            <hr />
          </Grid>
        </Grid>
        <Dialog
          open={itemDialogOpen}
          onClose={handleClose}
          fullScreen={fullScreen}
          aria-labelledby="max-width-dialog-title"
          PaperProps={{
            style: {
              height: '90vh',
              padding: '10px',
              width: '1280px',
              maxWidth: 'none',
              overflowX: 'hidden',
              overflowY: 'auto',
              position: 'inherit',
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
    </Wrapper>
  );
};

export default ItemDetail;
