import React, { useState, useEffect, useContext } from 'react';
import Wrapper from './styles';
import { useHistory } from 'react-router-dom';
import { Dialog, Grid, useMediaQuery } from '@material-ui/core';
import WebFailModal from './WebFailModal';
import { CommonContext } from '../../context/CommonContext';
import MultiCarousel from './MultiCarousel';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import HelpIcon from '@material-ui/icons/Help';
import { CenterFocusStrong } from '@material-ui/icons';

const SuccessModal = () => {
  const { user, setUser } = useContext(CommonContext);
  const { webQuizDialogOpen, setWebQuizDialogOpen } = useContext(CommonContext);
  const { itemDialogOpen, setItemDialogOpen } = useContext(CommonContext);
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const { currentEventDatas, setCurrentEventDatas } = useContext(CommonContext);
  const { eventNum, setEventNum } = useContext(CommonContext);
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
  const Mobile = useMediaQuery('(max-width:920px)');
  return (
    <>
      <Grid
        container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
        xs={12}
      >
        <Grid
          item
          style={{
            margin: 'auto',
            textAlign: 'center',
          }}
          xs={12}
        >
          <Grid container direction="column" style={{ marginBottom: '4vh' }}>
            <Grid item style={{ marginTop: '4vh' }}>
              축하드립니다. &nbsp;&nbsp; 이곳은 설명
            </Grid>
            <Grid item style={{ marginTop: '4vh' }}>
              모든 상품에 대한 30% 할인 쿠폰이 발급 되었습니다.
            </Grid>
          </Grid>
          <Grid
            item
            style={{ justifyContent: CenterFocusStrong, marginBottom: '5vh' }}
          >
            <Grid
              container
              style={{ justifyContent: 'space-evenly' }}
              direction="row"
            >
              <Grid item>
                <Button
                  style={{
                    width: '15vw',
                    height: '10vh',
                    fontSize: 'larger',
                    backgroundColor: '#4D48FB',
                  }}
                >
                  마이 쿠폰 바로 가기
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    width: '15vw',
                    height: '10vh',
                    fontSize: 'larger',
                    backgroundColor: '#ff3b47',
                  }}
                >
                  홈으로 가기 또는 지도
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ height: '30vh' }}>
            <MultiCarousel style={{ height: '30vh' }} />
          </Grid>
        </Grid>
      </Grid>
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
  const { webQuizDialogOpen, setWebQuizDialogOpen } = useContext(CommonContext);
  const { itemDialogOpen, setItemDialogOpen } = useContext(CommonContext);
  const quizAns = Object(quizDatas[number]).quiz_answer;

  useEffect(() => setNumber(Math.floor(Math.random() * quizDatas.length)), []);

  let history = useHistory();

  const click = choiceAns => event => {
    if (choiceAns === quizAns) {
      setUserAns(userAns => true);
      setSuccessModalTrigger(successModalTrigger => true);
    } else {
      setUserAns(userAns => false);
      setFailModalTrigger(failModalTrigger => true);
    }
  };

  const modalHandler = () => {
    setSuccessModalTrigger(false);
    setWebQuizDialogOpen(false);
    setItemDialogOpen(false);
  };

  const failModalHandler = () => {
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
                fontSize: '1.5em',
              }}
            >
              <ClickAwayListener onClickAway={handleClickAway}>
                <Grid
                  direction="column"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <NotListedLocationIcon
                    onClick={handleClick}
                    style={{ fontSize: '1.5em' }}
                  />

                  {open ? (
                    <Grid>{Object(quizDatas[number]).quiz_hint}</Grid>
                  ) : (
                    '힌트'
                  )}
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
                style={{ backgroundColor: '#FFFFFF', border: 'none' }}
              >
                <img
                  style={{
                    width: '15vw',
                    height: 'auto',
                    backgroundColor: '#FFFFFF',
                  }}
                  src="https://i3b309.p.ssafy.io/images/quiz_o.png"
                ></img>
              </Button>
              <Button
                onClick={click(false)}
                style={userAns === false ? buttonStyle : null}
                style={{ backgroundColor: '#FFFFFF', border: 'none' }}
              >
                <img
                  style={{
                    width: '15vw',
                    height: 'auto',
                    backgroundColor: '#FFFFFF',
                  }}
                  src="https://i3b309.p.ssafy.io/images/quiz_x.png"
                ></img>
              </Button>
            </Grid>
          </Grid>
          {userAns ? (
            <Dialog
              open={successModalTrigger}
              onClose={modalHandler}
              modalNum={1}
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
                  textAlign: 'center',
                },
              }}
            >
              <SuccessModal />
            </Dialog>
          ) : (
            <Dialog
              open={failModalTrigger}
              onClose={failModalHandler}
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
                  textAlign: 'center',
                },
              }}
            >
              <WebFailModal />
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
                style={{ backgroundColor: '#FFFFFF', border: 'none' }}
              >
                <img
                  style={{
                    width: '15vw',
                    height: 'auto',
                    backgroundColor: '#FFFFFF',
                  }}
                  src="https://i3b309.p.ssafy.io/images/quiz_o.png"
                ></img>
              </Button>
              <Button
                onClick={click(false)}
                style={userAns === false ? buttonStyle : null}
                style={{ backgroundColor: '#FFFFFF', border: 'none' }}
              >
                <img
                  style={{
                    width: '15vw',
                    height: 'auto',
                    backgroundColor: '#FFFFFF',
                  }}
                  src="https://i3b309.p.ssafy.io/images/quiz_x.png"
                ></img>
              </Button>
            </Grid>
          </Grid>
          {userAns ? (
            <Dialog
              open={successModalTrigger}
              onClose={modalHandler}
              modalNum={1}
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
                  textAlign: 'center',
                },
              }}
            >
              <SuccessModal />
            </Dialog>
          ) : (
            <Dialog open={failModalTrigger} onClose={failModalHandler}>
              <WebFailModal />
            </Dialog>
          )}
        </Wrapper>
      )}
    </>
  );
};

export default Quiz;
