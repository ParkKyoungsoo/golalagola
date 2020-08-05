import React, { useState, useEffect, useContext } from 'react';
import { CommonContext } from '../../../context/CommonContext';

import AdminNav from '../Layout/nav.jsx';
import NestedList from '../Layout/sidebar.jsx';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const AdminVS = props => {
  const classes = useStyles(); // Grid

  const { productDatas, setProductDatas } = useContext(CommonContext);
  const { currentEventDatas, setCurrentEventDatas } = useContext(CommonContext);

  const eventUpdate = eventId => e => {
    alert(eventId);
  };

  const eventDelete = eventId => e => {
    alert(eventId);
    axios
      .delete(`https://i3b309.p.ssafy.io/api/event/delete`, {
        eventId,
      })
      .then(function(res) {
        console.log(res);
      });
  };

  return (
    <div>
      <AdminNav></AdminNav>
      <h1>vs 페이지</h1>
      <div classes={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <NestedList></NestedList>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Grid style={{ display: 'flex' }}>
              <Grid item xs={10}>
                <h1>진행중인 이벤트</h1>
              </Grid>
              <Grid item xs={2}>
                <button>추가</button>
              </Grid>
            </Grid>
            {currentEventDatas.map((data, index) => (
              <Paper
                className={classes.paper}
                elevation={5}
                key={data.event_id}
              >
                <Grid container>
                  <Grid className="KisokCentering" item xs={5}>
                    <img
                      className="tmp"
                      src={`https://i3b309.p.ssafy.io/${
                        Object(productDatas[data.event_item['1'].prod_id - 1])
                          .prod_image
                      }`}
                      alt="image1"
                      style={{ height: '150px', width: '150px' }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <h1>VS</h1>
                  </Grid>
                  <Grid className="KisokCentering" item xs={5}>
                    <img
                      className="tmp"
                      src={`https://i3b309.p.ssafy.io/${
                        Object(productDatas[data.event_item['2'].prod_id - 1])
                          .prod_image
                      }`}
                      alt="image2"
                      style={{ height: '150px', width: '150px' }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Grid>
                      <button onClick={eventUpdate(data.event_id)}>수정</button>
                    </Grid>
                    <Grid>
                      <button onClick={eventDelete(data.event_id)}>삭제</button>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default AdminVS;
