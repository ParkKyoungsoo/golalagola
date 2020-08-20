import React, { useContext } from 'react';

import Grid from '@material-ui/core/Grid';

import { useHistory } from 'react-router-dom';

import Fab from '@material-ui/core/Fab';

import { CommonContext } from '../../../context/CommonContext';

import Wrapper from './styles';

import axios from 'axios';

const DialogActionsComponet = () => {
  let history = useHistory();

  const { newEventData, setNewEventData } = useContext(CommonContext);

  const createEvent = () => {
    axios
      .post('https://i3b309.p.ssafy.io/api/event/insert', newEventData)
      .then(function(response) {
        setNewEventData({
          event_id: '',
          event_prod_A: '',
          event_prod_B: '',
          event_date: '',
          event_expire: '',
          event_category: '',
        });
      })
      .catch(error => {
        // console.log('error : ', error.response);
      });
  };

  const handleClose = () => {
    history.goBack();
  };

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        className="dialog-actions-componet-grid"
      >
        <Fab
          variant="extended"
          aria-label="like"
          onClick={handleClose}
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
        >
          UPLOAD
        </Fab>
      </Grid>
    </Wrapper>
  );
};

export default DialogActionsComponet;
