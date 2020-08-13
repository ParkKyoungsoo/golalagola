import React, { useState } from 'react';
import EventModal from './EventModal';
import CouponModal from './CouponModal';
import QuizModal from './QuizModal';

const ModalMain = () => {
  let modalContent = null;

  const [modalNum, setModalNum] = useState(1);

  if (modalNum === 1) {
    modalContent = <EventModal setModalNum={setModalNum} />;
  } else if (modalNum === 2) {
    modalContent = <CouponModal setModalNum={setModalNum} />;
  } else if (modalNum === 3) {
    modalContent = <QuizModal setModalNum={setModalNum} />;
  } else if (modalNum === 4) {
  }

  return <>{modalContent}</>;
};

export default ModalMain;
