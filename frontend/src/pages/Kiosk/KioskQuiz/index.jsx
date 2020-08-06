import React, { useState, useEffect, useContext } from 'react';
import Test from './dump.json';
import Wrapper from './style';
import { Route, Link } from 'react-router-dom';
import { Redirect, RedirectProps } from 'react-router';
import { Dialog, Grid } from '@material-ui/core';
import Fail from '../KioskModal/KioskQuizFailModal';
import Navbar from '../KioskNavbar';
import { CommonContext } from '../../../context/CommonContext';

const KioskQuizSuccessModal = () => {
  const [moveToNext, setMoveToNext] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('timeout!!');
      setMoveToNext(true);
    }, 1500);
  });

  return (
    <>
      <h2> 정답입니다 ^^ </h2>
      {moveToNext ? <Redirect to="/KioskCoupons" /> : null}
    </>
  );
};

const Quiz = () => {
  const quizAns = Test.questions[0].correctAnswer; // 추후 데이터에서 가져올 문제의 정답.

  const [userAns, setUserAns] = useState(3);
  const [failModalTrigger, setFailModalTrigger] = useState(false);
  const [successModalTrigger, setSuccessModalTrigger] = useState(false);
  const { quizDatas, setQuizDatas } = useContext(CommonContext);
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

  const randomNumber = Math.random();
  const num = Math.floor(randomNumber * quizDatas.length);
  return (
    <>
      <Wrapper>
        <Navbar />
        <Grid className="quizCentering">
          <h1>오늘의 퀴즈</h1>
        </Grid>
        <Grid className="quizCentering">
          {console.log(quizDatas[num])}

          <h3>{Object(quizDatas[num]).quiz_question}</h3>
        </Grid>
        <Grid className="quizCentering">
          <button
            className="button1"
            onClick={click(true)}
            style={userAns === true ? buttonStyle : null}
          >
            <img className="tmp" src={Test.answers[0]} alt="quiz" />
          </button>
          <button
            className="button2"
            onClick={click(false)}
            style={userAns === false ? buttonStyle : null}
          >
            <img className="tmp" src={Test.answers[1]} alt="quiz" />
          </button>
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
