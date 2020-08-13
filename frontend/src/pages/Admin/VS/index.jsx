import React, { useState, useEffect, useContext } from 'react';
import { CommonContext } from '../../../context/CommonContext';
import { useHistory, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

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
    margin: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const AdminVS = props => {
  const classes = useStyles(); // Grid

  const { newEventData, setNewEventData } = useContext(CommonContext);
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const { currentEventDatas, setCurrentEventDatas } = useContext(CommonContext);

  let history = useHistory();

  const moveCreatePage = () => {
    setNewEventData({
      event_prod_A: '',
      event_prod_B: '',
      event_date: '',
      event_expire: '',
      event_category: '',
      event_id: '',
    });
    history.push('/Admin/CreateEvent');
  };

  const eventUpdate = eventId => e => {
    for (var i = 0; i < currentEventDatas.length; i++) {
      if (currentEventDatas[i].event_id === eventId) {
        setNewEventData({
          event_prod_A: currentEventDatas[i].event_item['1'].prod_id,
          event_prod_B: currentEventDatas[i].event_item['2'].prod_id,
          event_date: '',
          event_expire: '',
          event_category: currentEventDatas[i].event_category,
          event_id: eventId,
        });
      }
    }
    history.push('/Admin/CreateEvent');
  };

  const eventDelete = eventId => e => {
    axios
      .delete(`https://i3b309.p.ssafy.io/api/event`, {
        data: {
          event_id: eventId,
        },
      })
      .then(function(res) {
        console.log('success', res);
        alert('삭제가 완료되었습니다.');
        window.location.reload();
      })
      .catch(function(res) {
        console.log('error', res);
      });
  };

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
            <Grid style={{ display: 'flex' }}>
              <Grid item xs={10} container alignItems="center" justify="center">
                <h1>진행중인 이벤트</h1>
              </Grid>
              <Grid item xs={2} container alignItems="center" justify="center">
                <Button onClick={moveCreatePage}>추가</Button>
              </Grid>
            </Grid>
            {currentEventDatas.map((data, index) => (
              <Paper
                className={classes.paper}
                elevation={5}
                key={data.event_id}
              >
                <Grid container>
                  <Grid
                    className="KisokCentering"
                    item
                    xs={5}
                    style={{ display: 'flex' }}
                  >
                    <img
                      className="tmp"
                      src={`https://i3b309.p.ssafy.io/${
                        Object(productDatas[data.event_item['1'].prod_id - 1])
                          .prod_image
                      }`}
                      alt="image1"
                      style={{ height: '150px', width: '150px' }}
                    />
                    <Grid item xs={1}></Grid>
                    <Grid>
                      <Grid>
                        상품명 :{' '}
                        {
                          Object(productDatas[data.event_item['1'].prod_id - 1])
                            .prod_name
                        }
                      </Grid>
                      <Grid>
                        남은 개수 :{' '}
                        {
                          Object(productDatas[data.event_item['1'].prod_id - 1])
                            .prod_amount
                        }
                      </Grid>
                      <Grid>
                        할인율 :{' '}
                        {
                          Object(productDatas[data.event_item['1'].prod_id - 1])
                            .prod_sale
                        }
                        %
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={1}>
                    <h1>VS</h1>
                  </Grid>
                  <Grid
                    className="KisokCentering"
                    item
                    xs={5}
                    style={{ display: 'flex' }}
                  >
                    <img
                      className="tmp"
                      src={`https://i3b309.p.ssafy.io/${
                        Object(productDatas[data.event_item['2'].prod_id - 1])
                          .prod_image
                      }`}
                      alt="image2"
                      style={{ height: '150px', width: '150px' }}
                    />
                    <Grid item xs={1}></Grid>
                    <Grid>
                      <Grid>
                        상품명 :{' '}
                        {
                          Object(productDatas[data.event_item['2'].prod_id - 1])
                            .prod_name
                        }
                      </Grid>
                      <Grid>
                        남은 개수 :{' '}
                        {
                          Object(productDatas[data.event_item['2'].prod_id - 1])
                            .prod_amount
                        }
                      </Grid>
                      <Grid>
                        할인율 :{' '}
                        {
                          Object(productDatas[data.event_item['2'].prod_id - 1])
                            .prod_sale
                        }
                        %
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    container
                    alignItems="center"
                    justify="center"
                  >
                    <Grid>
                      <Button
                        variant="outline-secondary"
                        onClick={eventUpdate(data.event_id)}
                      >
                        수정
                      </Button>
                    </Grid>
                    <Grid>
                      <Button
                        variant="outline-danger"
                        onClick={eventDelete(data.event_id)}
                      >
                        삭제
                      </Button>
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
