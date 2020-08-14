import React, { useState, useEffect, useContext } from 'react';
import Test from '../../pages/Kiosk/KioskQuiz/dump.json';
import Wrapper from './styles';
import { Route, Link, useHistory } from 'react-router-dom';
import { Redirect, RedirectProps } from 'react-router';
import { Dialog, Grid, useMediaQuery, Box } from '@material-ui/core';
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
import HelpIcon from '@material-ui/icons/Help';
// ClickAwayListener

const SuccessModal = () => {
  const { user, setUser } = useContext(CommonContext);
  const { webQuizDialogOpen, setWebQuizDialogOpen } = useContext(CommonContext);

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
    history.push(`/mycoupon`);
  };

  const goToMain = () => {
    setWebQuizDialogOpen(false);
    history.push('/');
  };

  useEffect(userUpdate, []);
  const Mobile = useMediaQuery('(max-width:920px)');
  return (
    <>
      {Mobile ? (
        <Grid container direction="column">
          <Grid item style={{ fontSize: '2em', textAlign: 'center' }}>
            축하드립니다 ~~~
          </Grid>
          <Grid item>
            <Grid container direction="row">
              <Grid item xs={6}>
                <Button
                  onClick={goToMyCoupon}
                  style={{ width: '100%', height: '100%' }}
                >
                  마이 쿠폰함 바로가기
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={goToMain}
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'red',
                  }}
                >
                  Home
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          direction="column"
          style={{ width: '50vw', height: '20vh' }}
        >
          <Grid item style={{ fontSize: '2.3em', textAlign: 'center' }}>
            축하드립니다 ~~~
          </Grid>
          <Grid item style={{ height: '37%' }}>
            <Button
              onClick={goToMyCoupon}
              style={{ width: '100%', height: '100%' }}
            >
              마이 쿠폰함 바로가기
            </Button>
          </Grid>
          <Grid item style={{ height: '37%' }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={goToMain}
              style={{ width: '100%', height: '100%', backgroundColor: 'red' }}
            >
              Home
            </Button>
          </Grid>
        </Grid>
      )}
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
      {isMobile ? (
        <Wrapper>
          <Grid container direction="column" xs={12}>
            <Grid item className="quizCentering" style={{ fontSize: '1.2em' }}>
              {/* <h4
                style={{
                  textAlign: 'center',
                  marginBottom: '3vh',
                }}
              > */}
              <strong>오늘의 퀴즈</strong>
              {/* </h4> */}
            </Grid>
            <Grid
              item
              className="quizCentering"
              style={{
                textAlign: 'center',
                marginTop: '10px',
                marginBottom: '20px',
                fontSize: 'x-large',
              }}
            >
              {Object(quizDatas[number]).quiz_question}
            </Grid>
            <Grid
              style={{
                textAlign: 'center',
                marginTop: '10px',
                marginBottom: '2vh',
                fontSize: '2.5em',
              }}
            >
              <ClickAwayListener onClickAway={handleClickAway}>
                <Grid
                  className
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <NotListedLocationIcon
                    onClick={handleClick}
                    style={{ fontSize: '2.5em' }}
                  />
                  {open ? (
                    <Grid className="quizCss" style={{ fontSize: '1.5em' }}>
                      {Object(quizDatas[number]).quiz_hint}
                    </Grid>
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
            <Grid
              style={{
                fontSize: '1.5em',
                textAlign: 'center',
                marginTop: '2vh',
              }}
            >
              DESC
            </Grid>
          </Grid>
          {userAns ? (
            <Dialog
              open={successModalTrigger}
              onClose={modalHandler}
              modalNum={1}
              style={{ width: '100%', textAlign: 'center' }}
            >
              <SuccessModal />
            </Dialog>
          ) : (
            <Dialog open={failModalTrigger} onClose={modalHandler}>
              <Fail />
            </Dialog>
          )}
        </Wrapper>
      ) : (
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
                marginBottom: '2vh',
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
                <Grid
                  className
                  direction="column"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Grid item>
                    <HelpIcon
                      onClick={handleClick}
                      style={{ fontSize: '2.5em' }}
                    />
                  </Grid>
                  <Grid item>
                    {open ? (
                      <Grid>{Object(quizDatas[number]).quiz_hint}</Grid>
                    ) : (
                      '힌트'
                    )}
                  </Grid>
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
                <RadioButtonUncheckedIcon style={{ fontSize: '20vw' }} />
              </Button>
              <Button
                onClick={click(false)}
                style={userAns === false ? buttonStyle : null}
                color="secondary"
                style={{ backgroundColor: 'gray' }}
              >
                <ClearIcon style={{ fontSize: '20vw' }} />
              </Button>
            </Grid>
            <Grid
              style={{
                fontSize: '1.5em',
                textAlign: 'center',
                marginTop: '2vh',
              }}
            >
              DESC
            </Grid>
          </Grid>
          {userAns ? (
            <Dialog
              open={successModalTrigger}
              onClose={modalHandler}
              modalNum={1}
            >
              <SuccessModal />
            </Dialog>
          ) : (
            <Dialog open={failModalTrigger} onClose={modalHandler}>
              <Fail />
            </Dialog>
          )}
        </Wrapper>
      )}
      {/* {userAns ? (
        <Dialog open={successModalTrigger} onClose={modalHandler} modalNum={1}>
          <SuccessModal />
        </Dialog>
      ) : (
        <Dialog open={failModalTrigger} onClose={modalHandler}>
          <Fail />
        </Dialog>
      )} */}
    </>
  );
};

export default Quiz;
