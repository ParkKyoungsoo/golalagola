import React, { useState, useEffect, useContext } from 'react';
import Test from '../../pages/Kiosk/KioskQuiz/dump.json';
import Wrapper from './styles';
import { Route, Link, useHistory } from 'react-router-dom';
import { Redirect, RedirectProps } from 'react-router';
import { Dialog, Grid, useMediaQuery, Button } from '@material-ui/core';
import Fail from '../../pages/Kiosk/KioskModal/KioskQuizFailModal';
import { CommonContext } from '../../context/CommonContext';
import { Carousel } from 'react-bootstrap';
// import MultiCarousel from './MultiCarousel';
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

// ClickAwayListener

const SuccessModal = () => {
  const { user } = useContext(CommonContext);
  let history = useHistory();

  // 유저가 가지고 있는 Quiz 상태 바꿔줘야함

  return (
    <>
      <h2> 정답입니다 ^^ </h2>
      <Button onClick={() => history.push(`/mycoupon`)}>
        마이 쿠폰함 바로가기
      </Button>
      <Button onClick={() => history.push('/')}>쇼핑 계속하기</Button>
    </>
  );
};

const Quiz = modalNum => {
  const quizAns = Test.questions[0].correctAnswer; // 추후 데이터에서 가져올 문제의 정답.
  const [number, setNumber] = useState();

  const [userAns, setUserAns] = useState(3);
  const [failModalTrigger, setFailModalTrigger] = useState(false);
  const [successModalTrigger, setSuccessModalTrigger] = useState(false);
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const { quizDatas, setQuizDatas } = useContext(CommonContext);

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
              {/* <img
                src={Test.answers[0]}
                alt="quiz"
                style={{ width: '30vw', height: '27vh' }}
              /> */}
            </Button>
            <Button
              onClick={click(false)}
              style={userAns === false ? buttonStyle : null}
              color="secondary"
              style={{ backgroundColor: 'gray' }}
            >
              <ClearIcon style={{ fontSize: '10vw' }} />
              {/* <img
                src={Test.answers[1]}
                alt="quiz"
                style={{ width: '30vw', height: '27vh' }}
              /> */}
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
