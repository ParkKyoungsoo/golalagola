import React, { useState, useEffect, useContext } from 'react';
import Wrapper from './style';
import { Route, Link } from 'react-router-dom';
import { Redirect, RedirectProps } from 'react-router';
import { Dialog, Grid, Button } from '@material-ui/core';
import Navbar from '../KioskNavbar';
import { CommonContext } from '../../../context/CommonContext';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import HelpIcon from '@material-ui/icons/Help';

const Fail = () => {
  const { setFailModalTrigger } = useContext(CommonContext);

  useEffect(() => {
    setTimeout(() => {
      setFailModalTrigger(false);
    }, 1200);
  });

  return (
    <>
      <h2> 틀렸어요ㅠㅠㅠ 다시해보세요.</h2>
    </>
  );
};

const KioskQuizSuccessModal = () => {
  const [moveToNext, setMoveToNext] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMoveToNext(true);
    }, 500);
  });

  return <>{moveToNext ? <Redirect to="/KioskCoupons" /> : null}</>;
};

const Quiz = () => {
  const [userAns, setUserAns] = useState(3);
  const [successModalTrigger, setSuccessModalTrigger] = useState(false);
  const {
    failModalTrigger,
    setFailModalTrigger,
    quizDatas,
    serverImgUrl,
  } = useContext(CommonContext);
  const [number, setNumber] = useState();
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
    setFailModalTrigger(failModalTrigger => false);
  };

  const buttonStyle = {
    border: '6px solid green',
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  let hint = open ? Object(quizDatas[number]).quiz_hint : '힌트';

  // const randomNumber = Math.random();
  // const num = Math.floor(randomNumber * quizDatas.length);
  return (
    <>
      <Wrapper>
        <Navbar />
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
                <Grid item onClick={handleClick}>
                  <HelpIcon style={{ fontSize: '1.5em' }} />
                  &nbsp;
                  {hint}
                </Grid>
                {/* <Grid item>
                  {open ? (
                    <Grid>{Object(quizDatas[number]).quiz_hint}</Grid>
                  ) : (
                    '힌트'
                  )}
                </Grid> */}
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
                // src="https://i3b309.p.ssafy.io/images/quiz_o.png"
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
                // src="https://i3b309.p.ssafy.io/images/quiz_x.png"
                src={`${serverImgUrl}quiz_x.png`}
                alt="X"
              ></img>
            </Button>
          </Grid>
        </Grid>
      </Wrapper>

      {userAns ? (
        <Dialog open={successModalTrigger}>
          <KioskQuizSuccessModal />
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
