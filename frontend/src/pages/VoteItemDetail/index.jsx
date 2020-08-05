import React, { Component, useState, useContext, useEffect } from 'react';
import { PriorityHighSharp, CodeSharp } from '@material-ui/icons';
import Header from '../../layout/Header/';
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
  const { carouselDatas, setCarouselDatas } = useContext(CommonContext);
  const { itemDialogOpen, setItemDialogOpen } = useContext(CommonContext);
  const [eventActivated, setEventActivated] = useState(false);
  const { eventNum, setEventNum } = useContext(CommonContext);

  const { productDatas, setProductDatas } = useContext(CommonContext);

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
  // carouselDatas.length 를 통해 행사중인 이벤트의 개수를 알 수 있습니다.
  const CheckEvent = () => {
    for (var i = 0; i < carouselDatas.length; i++) {
      if (
        Number(match.params.id) === carouselDatas[i].event_item['1'].prod_id ||
        Number(match.params.id) === carouselDatas[i].event_item['2'].prod_id
      ) {
        setEventActivated(eventActivated => true);
        setEventNum(carouselDatas[i].event_no - 1);
      }
    }
  };
  useEffect(CheckEvent, []);
  const product_id = match.params.id - 1;

  return (
    <Wrapper>
      {/* <h2>{match.params.name}</h2> */}
      <Header />
      {/* {testImg.map((testI, index) => ( */}

      <br />
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item xs={4}>
          <Card>
            <p>{`https://i3b309.p.ssafy.io/${productDatas[product_id].prod_id}`}</p>
            <img
              src={`https://i3b309.p.ssafy.io/${productDatas[product_id].prod_image}`}
              // src={`../../${productDatas[match.params.id - 1].prod_image}`}
              alt="test"
              style={{ width: '100%', height: 'auto', mr: '10px' }}
            />
          </Card>
        </Grid>

        <Grid item>
          <h2 style={{ textAlign: 'center' }}>{match.params.name}</h2>
          <hr />
          <div>
            <p>여기는 간단한 설명 작성을 하면 됩니다.</p>
            {/* <p>{productDatas[match.params.id - 1].prod_desc}</p> */}
          </div>
          <hr />

          {/* 이벤트가 진행중인 상품일때만 이 버튼을 표시한다. */}
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={click1}
            disabled={!eventActivated}
          >
            쿠폰 받기
          </Button>
          {/* 유저가 OX 퀴즈를 풀지 않았다면 활성화 시킬 버튼입니다. */}
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={QuizDialogOpen}
          >
            퀴즈 풀기
          </Button>
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
    </Wrapper>
  );
};

export default ItemDetail;
