import React, { useState, useContext, useEffect } from 'react';
import { CommonContext } from '../../../context/CommonContext';
import Layout from '../../../layout/';
import { Dialog, Grid } from '@material-ui/core';
import ModalManage from '../../../components/EventModal/MainModal';

const ManageEvent = () => {
  const { currentEventDatas, setCurrentEventDatas } = useContext(CommonContext);
  const { newEventData, setNewEventData } = useContext(CommonContext);
  const [eventCount, setEventCount] = useState();
  const [modalTrigger, setModalTrigger] = useState(false);

  const handleTrigger = () => {
    setModalTrigger(false);
  };

  return (
    <Layout>
      <button onClick={() => setModalTrigger(true)}>이벤트 만들기</button>
      <Dialog open={modalTrigger} onClose={handleTrigger}>
        <ModalManage setModalTrigger={setModalTrigger} />
      </Dialog>
    </Layout>
  );
};

export default ManageEvent;
