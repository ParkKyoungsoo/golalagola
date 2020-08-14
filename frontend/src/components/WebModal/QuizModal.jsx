import React, { useState, useEffect, useContext } from 'react';
import Wrapper from './styles';
import { Route, Link, useHistory } from 'react-router-dom';
import { Redirect, RedirectProps } from 'react-router';
import { Dialog, Grid, useMediaQuery } from '@material-ui/core';
import Fail from '../../pages/Kiosk/KioskModal/KioskQuizFailModal';
import { CommonContext } from '../../context/CommonContext';
import { Carousel } from 'react-bootstrap';
import MultiCarousel from './MultiCarousel';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
// import MultiCarousel from './MultiCarousel';
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

// ClickAwayListener

const SuccessModal = () => {
  const { user, setUser } = useContext(CommonContext);
  const { webQuizDialogOpen, setWebQuizDialogOpen } = useContext(CommonContext);
  const { itemDialogOpen, setItemDialogOpen } = useContext(CommonContext);

  const userQuizState = {
    user_quiz: true,
  };

  let history = useHistory();

  // 유저가 가지고 있는 Quiz 상태 바꿔줘야함
  const userUpdate = () => {
    axios
      .put(
        `https://i3b309.p.ssafy.io/api/auth/solveQuiz/${user.user_id}`,
        userQuizState,
      )
      .then(function(response) {
        console.log(response);
        setUser({
          ...user,
          user_quiz: true,
        });
      })
      .catch(error => {});
  };

  const goToMyCoupon = () => {
    setWebQuizDialogOpen(false);
    setItemDialogOpen(false);
    // window.location.href = '/mycoupon';
    history.push('/mycoupon');
  };

  const goToMain = () => {
    setWebQuizDialogOpen(false);
    setItemDialogOpen(false);
    history.push('/');
  };

  useEffect(userUpdate, []);

  return (
    <>
      <h2> 정답입니다 ^^ </h2>
      <Button onClick={goToMyCoupon}>마이 쿠폰함 바로가기</Button>
      <Button onClick={goToMain}>쇼핑 계속하기</Button>
    </>
  );
};

const Quiz = modalNum => {
  const [number, setNumber] = useState();

  const [userAns, setUserAns] = useState(3);
  const [failModalTrigger, setFailModalTrigger] = useState(false);
  const [successModalTrigger, setSuccessModalTrigger] = useState(false);
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const { quizDatas, setQuizDatas } = useContext(CommonContext);
  const quizAns = Object(quizDatas[number]).quiz_answer;

  useEffect(() => setNumber(Math.floor(Math.random() * quizDatas.length)), []);

  // const pp = () => {
  //   const randomNumber = Math.random();
  //   number = Math.floor(randomNumber * quizDatas.length);
  //   console.log('in pp number', number);
  // };

  // const number = Math.random();
  // const num = Math.floor(number * quizDatas.length);

  const click = choiceAns => event => {
    if (choiceAns === quizAns) {
      setUserAns(userAns => true);
      setSuccessModalTrigger(successModalTrigger => true);
    } else {
      setUserAns(userAns => false);
      setFailModalTrigger(failModalTrigger => true);
    }
    // pp();
  };

  const modalHandler = () => {
    setSuccessModalTrigger(false);
    setFailModalTrigger(failModalTrigger => false);
  };

  const buttonStyle = {
    border: '6px solid green',
  };

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const isMobile = useMediaQuery('(max-width:920px)');
  // console.log('aaa', quizDatas.length);

  // ClickAwayListener

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  return (
    <>
      <Wrapper>
        <Grid container direction="column" xs={12}>
          <Grid item className="quizCentering">
            <h3
              style={{
                textAlign: 'center',
                marginBottom: '3vh',
              }}
            >
              오늘의 퀴즈
            </h3>
          </Grid>
          <Grid
            item
            className="quizCentering"
            style={{
              textAlign: 'center',
              marginTop: '10px',
              marginBottom: '50px',
              fontSize: 'xx-large',
            }}
          >
            {Object(quizDatas[number]).quiz_question}
          </Grid>
          <Grid
            style={{
              textAlign: 'center',
              marginTop: '10px',
              marginBottom: '50px',
              fontSize: 'x-large',
            }}
          >
            <ClickAwayListener onClickAway={handleClickAway}>
              <Grid className style={{ display: 'flex' }}>
                <NotListedLocationIcon
                  onClick={handleClick}
                  style={{ fontSize: '10vh' }}
                />
                {open ? (
                  <Grid className>{Object(quizDatas[number]).quiz_hint}</Grid>
                ) : null}
              </Grid>
            </ClickAwayListener>
          </Grid>
          <Grid
            item
            className="quizCentering"
            style={{ justifyContent: 'space-evenly' }}
          >
            <Button
              onClick={click(true)}
              style={userAns === true ? buttonStyle : null}
              color="primary"
              style={{ backgroundColor: 'black' }}
            >
              <RadioButtonUncheckedIcon style={{ fontSize: '10vw' }} />
            </Button>
            <Button
              onClick={click(false)}
              style={userAns === false ? buttonStyle : null}
              color="secondary"
              style={{ backgroundColor: 'gray' }}
            >
              <ClearIcon style={{ fontSize: '10vw' }} />
            </Button>
          </Grid>
        </Grid>
      </Wrapper>
      {userAns ? (
        <Dialog open={successModalTrigger} onClose={modalHandler} modalNum={1}>
          <SuccessModal />
        </Dialog>
      ) : (
        <Dialog open={failModalTrigger} onClose={modalHandler}>
          <Fail />
        </Dialog>
      )}
    </>
  );
};

export default Quiz;
