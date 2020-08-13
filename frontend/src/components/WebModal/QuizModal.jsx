import React, { useState, useEffect, useContext } from 'react';
import Test from '../../pages/Kiosk/KioskQuiz/dump.json';
import Wrapper from './styles';
import { Route, Link, useHistory } from 'react-router-dom';
import { Redirect, RedirectProps } from 'react-router';
import { Dialog, Grid, useMediaQuery } from '@material-ui/core';
import Fail from '../../pages/Kiosk/KioskModal/KioskQuizFailModal';
import { CommonContext } from '../../context/CommonContext';
import { Carousel } from 'react-bootstrap';
import MultiCarousel from './MultiCarousel';
import Button from 'react-bootstrap/Button';

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
            {Object(quizDatas[number]).quiz_question}
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
