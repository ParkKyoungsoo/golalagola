import React, { useState, useEffect, useContext } from 'react';
import Test from '../../pages/Kiosk/KioskQuiz/dump.json';
import Wrapper from './styles';
import { Route, Link } from 'react-router-dom';
import { Redirect, RedirectProps } from 'react-router';
import { Dialog, Grid } from '@material-ui/core';
import Fail from '../../pages/Kiosk/KioskModal/KioskQuizFailModal';
import { CommonContext } from '../../context/CommonContext';
import { Carousel } from 'react-bootstrap';
import MultiCarousel from './MultiCarousel';

// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';

const SuccessModal = () => {
  const [moveToNext, setMoveToNext] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     console.log('timeout!!');
  //     setMoveToNext(true);
  //   }, 1500);
  // });

  return (
    <>
      <h2> 정답입니다 ^^ </h2>
    </>
  );
};

const Quiz = () => {
  const quizAns = Test.questions[0].correctAnswer; // 추후 데이터에서 가져올 문제의 정답.

  const [userAns, setUserAns] = useState(3);
  const [failModalTrigger, setFailModalTrigger] = useState(false);
  const [successModalTrigger, setSuccessModalTrigger] = useState(false);
  const { productDatas, setProductDatas } = useContext(CommonContext);

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
    setSuccessModalTrigger(false)
    setFailModalTrigger(failModalTrigger => false);
  };

  const buttonStyle = {
    border: '6px solid green',
  };

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Wrapper>
        <MultiCarousel />
        <Grid className="quizCentering">
          <h3
            style={{
              textAlign: 'center',
              marginTop: '70px',
              marginBottom: '10px',
            }}
          >
            오늘의 퀴즈
          </h3>
        </Grid>
        <Grid className="quizCentering">
          <h2
            style={{
              textAlign: 'center',
              marginTop: '10px',
              marginBottom: '50px',
            }}
          >
            {Test.questions[0].question}
          </h2>
        </Grid>
        <Grid className="quizCentering">
          <button
            onClick={click(true)}
            style={userAns === true ? buttonStyle : null}
          >
            <img src={Test.answers[0]} alt="quiz" />
          </button>
          <button
            onClick={click(false)}
            style={userAns === false ? buttonStyle : null}
          >
            <img src={Test.answers[1]} alt="quiz" />
          </button>
        </Grid>
      </Wrapper>
      {userAns ? (
        <Dialog open={successModalTrigger} onClose={modalHandler}>
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
