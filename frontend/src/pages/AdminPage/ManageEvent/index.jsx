import React, { useState, useContext, useEffect } from 'react';
import { CommonContext } from '../../../context/CommonContext';
import Layout from '../../../layout/';
import { Dialog, Grid } from '@material-ui/core';

const selectEventCategory = () => {
  return (
    <>
      <Grid>
        <h2>카테고리를 선택해 주세요.</h2>
      </Grid>
      <Grid></Grid>
    </>
  );
};

const selectItemA = () => {};

const selectItemB = () => {};

const ModalManage = () => {
  let modalContent = null;

  const [modalNum, setModalNum] = useState(1);

  if (modalNum === 1) {
    modalContent = <selectEventCategory setModalNum={setModalNum} />;
  } else if (modalNum === 2) {
    modalContent = <selectItemA setModalNum={setModalNum} />;
  } else if (modalNum === 3) {
    modalContent = <selectItemB setModalNum={setModalNum} />;
  }

  return <>{modalContent}</>;
};

const ManageEvent = () => {
  const { currentEventDatas, setCurrentEventDatas } = useContext(CommonContext);
  const [eventCount, setEventCount] = useState();
  const [modalTrigger, setModalTrigger] = useState(false);

  const handleTrigger = () => {
    setModalTrigger(false);
  };

  return (
    <Layout>
      {console.log(
        Object(currentEventDatas[currentEventDatas.length - 1]).event_id,
      )}
      <button onClick={setModalTrigger(true)}>이벤트 만들기</button>
      <Dialog open={modalTrigger} onClose={handleTrigger}>
        <ModalManage />
      </Dialog>
    </Layout>
  );
};

export default ManageEvent;
