import React, { useState, useEffect, useContext } from 'react';
import Wrapper from './styles';
import { useHistory } from 'react-router-dom';
import { Dialog, Grid, useMediaQuery } from '@material-ui/core';
import WebFailModal from './WebFailModal';
import { CommonContext } from '../../context/CommonContext';
import MultiCarousel from './MultiCarousel';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import HelpIcon from '@material-ui/icons/Help';
import { CenterFocusStrong } from '@material-ui/icons';

const SuccessModal = () => {
  const { user, setUser } = useContext(CommonContext);
  const { setWebQuizDialogOpen } = useContext(CommonContext);
  const { setItemDialogOpen } = useContext(CommonContext);
  const { quizDatas } = useContext(CommonContext);
  const userQuizState = {
    user_quiz: true,
  };
  const { number } = useContext(CommonContext);

  let history = useHistory();

  // 유저가 가지고 있는 Quiz 상태 바꿔줘야함
  const userUpdate = () => {
    axios
      .put(
        `https://i3b309.p.ssafy.io/api/auth/solveQuiz/${user.user_id}`,
        userQuizState,
      )
      .then(function(response) {
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
      {Mobile ? (
        <Grid
          container
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
          item
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
              <Grid
                item
                style={{
                  marginTop: '4vh',
                  fontWeight: '200',
                  fontSize: '2vw',
                }}
              >
                축하드립니다. &nbsp;&nbsp;
                {Object(quizDatas[number]).quiz_desc}
              </Grid>
              <Grid
                item
                style={{
                  marginTop: '4vh',
                  fontSize: '3vw',
                  fontWeight: '700',
                }}
              >
                모든 상품에 대한 30% 할인 쿠폰이 발급 되었습니다.
              </Grid>
            </Grid>
            <Grid
              item
              style={{ justifyContent: CenterFocusStrong, marginBottom: '5vh' }}
            >
              <Grid
                container
                style={{ justifyContent: 'space-evenly', paddingTop: '3vh' }}
                direction="row"
              >
                <Grid item>
                  <Button
                    onClick={goToMyCoupon}
                    style={{
                      width: '15vw',
                      height: '10vh',
                      fontSize: '2vw',
                      backgroundColor: '#4D48FB',
                    }}
                  >
                    쿠폰함 바로 가기
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={goToMain}
                    style={{
                      width: '15vw',
                      height: '10vh',
                      fontSize: '2vw',
                      backgroundColor: '#ff3b47',
                    }}
                  >
                    Home
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ height: '30vh', paddingTop: '4vh' }}>
              <MultiCarousel style={{ height: '30vh' }} />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
          item
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
              <Grid
                item
                style={{
                  marginTop: '4vh',
                  fontWeight: '200',
                  fontSize: '1.5rem',
                }}
              >
                축하드립니다. &nbsp;&nbsp;
                {Object(quizDatas[number]).quiz_desc}
              </Grid>
              <Grid
                item
                style={{
                  marginTop: '4vh',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                }}
              >
                모든 상품에 대한 30% 할인 쿠폰이 발급 되었습니다.
              </Grid>
            </Grid>
            <Grid
              item
              style={{ justifyContent: CenterFocusStrong, marginBottom: '5vh' }}
            >
              <Grid
                container
                style={{ justifyContent: 'space-evenly', paddingTop: '3vh' }}
                direction="row"
              >
                <Grid item>
                  <Button
                    onClick={goToMyCoupon}
                    style={{
                      width: '15vw',
                      height: '10vh',
                      fontSize: 'large',
                      backgroundColor: '#4D48FB',
                    }}
                  >
                    쿠폰함 바로 가기
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={goToMain}
                    style={{
                      width: '15vw',
                      height: '10vh',
                      fontSize: 'large',
                      backgroundColor: '#ff3b47',
                    }}
                  >
                    Home
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ height: '30vh', paddingTop: '4vh' }}>
              <MultiCarousel style={{ height: '30vh' }} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

const Quiz = modalNum => {
  const [userAns, setUserAns] = useState(3);
  const [failModalTrigger, setFailModalTrigger] = useState(false);
  const [successModalTrigger, setSuccessModalTrigger] = useState(false);
  const {
    number,
    serverImgUrl,
    setNumber,
    quizDatas,
    setWebQuizDialogOpen,
    setItemDialogOpen,
  } = useContext(CommonContext);

  const quizAns = Object(quizDatas[number]).quiz_answer;

  useEffect(() => setNumber(Math.floor(Math.random() * quizDatas.length)), []);

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

  const isMobile = useMediaQuery('(max-width:920px)');

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
          <Grid container direction="column" item xs={12}>
            <Grid
              item
              className="quizCentering"
              style={{ fontSize: '1.2em', fontWeight: '600' }}
            >
              오늘의 퀴즈
            </Grid>
            <Grid
              item
              className="quizCentering"
              style={{
                textAlign: 'center',
                marginTop: '10px',
                marginBottom: '20px',
                fontSize: '1.5em',
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
                    style={{ fontSize: '5vw' }}
                  />

                  {open ? (
                    <Grid style={{ fontSize: '3vw' }}>
                      {Object(quizDatas[number]).quiz_hint}
                    </Grid>
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
                  src={`${serverImgUrl}quiz_o.png`}
                  alt="O"
                />
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
                  src={`${serverImgUrl}quiz_x.png`}
                  alt="X"
                />
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
                  height: '80vh',
                  padding: '10px',
                  width: '68vw',
                  maxWidth: 'none',
                  overflowX: 'hidden',
                  overflowY: 'hidden',
                  position: 'inherit',
                  justifyContent: 'center',
                },
              }}
            >
              <SuccessModal />
            </Dialog>
          ) : (
            <Dialog open={failModalTrigger} onClose={modalHandler}>
              <WebFailModal />
            </Dialog>
          )}
        </Wrapper>
      ) : (
        <Wrapper>
          <Grid container direction="column" item xs={12}>
            <Grid
              item
              style={{
                textAlign: 'center',
                paddingBottom: '5vh',
                fontSize: '2em',
                fontWeight: '700',
              }}
            >
              오늘의 퀴즈
            </Grid>
            <Grid
              item
              style={{
                textAlign: 'center',
                fontSize: '1.8em',
                fontWeight: '300',
                marginBottom: '2vh',
              }}
            >
              {Object(quizDatas[number]).quiz_question}
            </Grid>
            <Grid
              style={{
                textAlign: 'center',
                marginTop: '10px',
                marginBottom: '50px',
                fontSize: '1.5em',
              }}
            >
              <ClickAwayListener onClickAway={handleClickAway}>
                <Grid
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Grid item>
                    <HelpIcon
                      onClick={handleClick}
                      style={{ fontSize: '1.5em' }}
                    />
                    &nbsp;
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
                    width: '13vw',
                    height: 'auto',
                    backgroundColor: '#FFFFFF',
                  }}
                  src={`${serverImgUrl}quiz_o.png`}
                  alt="O"
                ></img>
              </Button>
              <Button
                onClick={click(false)}
                style={userAns === false ? buttonStyle : null}
                style={{ backgroundColor: '#FFFFFF', border: 'none' }}
              >
                <img
                  style={{
                    width: '13vw',
                    height: 'auto',
                    backgroundColor: '#FFFFFF',
                  }}
                  src={`${serverImgUrl}quiz_x.png`}
                  alt="X"
                ></img>
              </Button>
            </Grid>
          </Grid>
          {userAns ? (
            <Dialog
              open={successModalTrigger}
              onClose={modalHandler}
              PaperProps={{
                style: {
                  height: '80vh',
                  padding: '10px',
                  width: '68vw',
                  maxWidth: 'none',
                  overflowX: 'hidden',
                  overflowY: 'hidden',
                  position: 'inherit',
                  justifyContent: 'center',
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
