import React, { useState, forwardRef, useContext } from 'react';
import { CommonContext } from '../../../context/CommonContext';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import {
  Grid,
  Divider,
  Paper,
  Button,
  ListItem,
  ListItemText,
  List,
  Tooltip,
} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';

import Wrapper from './styles';

import NestedList from '../Layout/sidebar.jsx';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // margin: theme.spacing(2),
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
        });
      }
    }
    history.push('/Admin/CreateEvent');
  };

  const eventDelete = eventId => e => {
    Axios.delete(`https://i3b309.p.ssafy.io/api/event`, {
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
    <Wrapper>
      <div className="admin_event__main">
        <Grid container>
          <Grid item>
            <NestedList index={3} />
          </Grid>
          <Grid item>
            <Grid className="admin_event__content">
              <h5 className="admin_event__header">Event Dashboard</h5>
              <Divider variant="middle" className="admin_event__divider" />
              <Paper elevation={2}>
                <List>
                  <ListItem>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item>이벤트 목록</Grid>
                      <Grid item>
                        <Tooltip title="Add">
                          <Button onClick={moveCreatePage}>
                            <AddBoxIcon style={{ color: 'gray' }} />
                          </Button>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid
                      className="admin_event__table--title"
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item xs={4}>
                        A상품
                      </Grid>
                      <Grid item xs={4}>
                        B상품
                      </Grid>
                      <Grid item xs={4}>
                        B상품
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider className="admin_event__item--divider" />
                  {currentEventDatas.map((data, index) => (
                    <div>
                      <ListItem
                        className="admin_event__table"
                        key={data.event_id}
                      >
                        <Grid
                          container
                          direction="column"
                          justify="center"
                          alignItems="flex-start"
                        >
                          <Grid
                            item
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                          >
                            <Grid item xs={2}>
                              <img
                                className="admin_event__item--image"
                                src={`https://i3b309.p.ssafy.io/${
                                  Object(
                                    productDatas[
                                      data.event_item['1'].prod_id - 1
                                    ],
                                  ).prod_image
                                }`}
                                alt="image1"
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <Grid>
                                <p className="admin_event__item--desc">
                                  {
                                    Object(
                                      productDatas[
                                        data.event_item['1'].prod_id - 1
                                      ],
                                    ).prod_name
                                  }
                                </p>
                                <p className="admin_event__item--desc">
                                  {
                                    Object(
                                      productDatas[
                                        data.event_item['1'].prod_id - 1
                                      ],
                                    ).prod_amount
                                  }
                                  개
                                </p>
                                <p className="admin_event__item--desc">
                                  {
                                    Object(
                                      productDatas[
                                        data.event_item['1'].prod_id - 1
                                      ],
                                    ).prod_sale
                                  }
                                  %
                                </p>
                              </Grid>
                            </Grid>

                            <Grid item xs={1}>
                              <h5>VS</h5>
                            </Grid>
                            <Grid item xs={2}>
                              <img
                                className="admin_event__item--image"
                                src={`https://i3b309.p.ssafy.io/${
                                  Object(
                                    productDatas[
                                      data.event_item['2'].prod_id - 1
                                    ],
                                  ).prod_image
                                }`}
                                alt="image2"
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <Grid>
                                <p className="admin_event__item--desc">
                                  {
                                    Object(
                                      productDatas[
                                        data.event_item['2'].prod_id - 1
                                      ],
                                    ).prod_name
                                  }
                                </p>
                                <p className="admin_event__item--desc">
                                  {
                                    Object(
                                      productDatas[
                                        data.event_item['2'].prod_id - 1
                                      ],
                                    ).prod_amount
                                  }
                                  개
                                </p>
                                <p className="admin_event__item--desc">
                                  {
                                    Object(
                                      productDatas[
                                        data.event_item['2'].prod_id - 1
                                      ],
                                    ).prod_sale
                                  }
                                  %
                                </p>
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
                        </Grid>
                      </ListItem>
                      <Divider className="admin_event__item--divider" />
                    </div>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Wrapper>
  );
};
export default AdminVS;
