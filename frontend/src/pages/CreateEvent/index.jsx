import React, { useState, useContext } from 'react';

import { Grid, Paper } from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import { makeStyles } from '@material-ui/core/styles';
import NestedList from '../Admin/Layout/sidebar';
import CreateEventComponent from '../../components/Create/CreateEventComponent/index';

import axios from 'axios';
import { CommonContext } from '../../context/CommonContext';
import { useHistory, Link, Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const CreateVote = props => {
  let history = useHistory();

  const classes = useStyles(); // Grid

  const { newEventData, setNewEventData } = useContext(CommonContext);

  const createEvent = () => {
    if (newEventData.event_category === '') {
      alert('카테고리를 선택 해 주세요');
    } else if (newEventData.event_prod_A === '') {
      alert('A 상품을 선택해주세요');
    } else if (newEventData.event_prod_B === '') {
      alert('B 상품을 선택해주세요');
    } else {
      axios
        .post('https://i3b309.p.ssafy.io/api/event/', newEventData)
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
          window.location.href = '/admin/vs';
        })
        .catch(error => {
          console.log('error : ', error.response);
        });
    }
  };

  const [readyToUpload, setReadyToUpload] = useState(true);

  return (
    <div>
      <div classes={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <NestedList></NestedList>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Grid>
              <br />
            </Grid>
            <Grid container justify="flex-end" alignItems="center">
              <Button variant="success" onClick={createEvent}>
                UPLOAD
              </Button>
              <Button
                variant="danger"
                onClick={() => history.push('/Admin/VS')}
              >
                CANCEL
              </Button>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <h2>Create New Vote</h2>
            </Grid>
            <CreateEventComponent />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CreateVote;
