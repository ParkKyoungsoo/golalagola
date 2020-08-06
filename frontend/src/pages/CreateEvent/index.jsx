import React, { useState, useContext } from 'react';

import Layout from '../../layout';
import { ViewContext } from '../../context/CommonContext';
import DialogActionsComponet from '../../components/Create/DialogActionsComponet/index';
import CreateEventComponent from '../../components/Create/CreateEventComponent/index';

import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import { CommonContext } from '../../context/CommonContext';
import { useHistory, Link, Redirect } from 'react-router-dom';

const CreateVote = props => {
  let history = useHistory();

  const { newEventData, setNewEventData } = useContext(CommonContext);

  const createEvent = () => {
    if (newEventData.event_prod_A === '') {
      alert('A 상품을 선택해주세요');
    } else if (newEventData.event_prod_B === '') {
      alert('B 상품을 선택해주세요');
    } else if (newEventData.event_category === '') {
      alert('카테고리를 선택 해 주세요');
    } else {
      axios
        .post('https://i3b309.p.ssafy.io/api/event', newEventData)
        .then(function(response) {
          console.log(response);
          setNewEventData({
            event_prod_A: '',
            event_prod_B: '',
            event_date: '',
            event_expire: '',
            event_category: '',
          });
          // history.push('/Admin/VS');
          window.location.href = 'http://localhost:3000/admin/vs';
        })
        .catch(error => {
          console.log('error : ', error.response);
        });
    }
  };

  const [readyToUpload, setReadyToUpload] = useState(true);

  return (
    <Layout>
      <Fab
        variant="extended"
        aria-label="like"
        onClick={() => history.push('/Admin/VS')}
        className="up-cancel-fab dialog-actions-componet-fab1"
      >
        CANCEL
      </Fab>
      <Fab
        variant="extended"
        aria-label="like"
        color="inherit"
        onClick={createEvent}
        className="up-cancel-fab"
        style={{
          backgroundColor: readyToUpload ? '#1FA212' : '#E0E0E0',
        }}
      >
        UPLOAD
      </Fab>
      <h2>Create New Vote</h2>
      <CreateEventComponent />
    </Layout>
  );
};

export default CreateVote;
