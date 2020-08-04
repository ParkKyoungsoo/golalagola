import React, { useState, useContext } from 'react';
import SelectEventCategory from './selectEventCategory';
import SelectItemA from './selectItemA';
import SelectItemB from './selectItemB';
import { CommonContext } from '../../context/CommonContext';

const ModalMain = props => {
  const { newEventData, setNewEventData } = useContext(CommonContext);
  let modalContent = null;

  const [modalNum, setModalNum] = useState(1);

  if (modalNum === 1) {
    modalContent = <SelectEventCategory setModalNum={setModalNum} />;
  } else if (modalNum === 2) {
    modalContent = <SelectItemA setModalNum={setModalNum} />;
  } else if (modalNum === 3) {
    modalContent = <SelectItemB setModalNum={setModalNum} />;
  }

  return (
    <>
      {console.log('newEventdata', newEventData)}
      {modalContent}
    </>
  );
};

export default ModalMain;
