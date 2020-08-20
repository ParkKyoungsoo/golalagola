import React, { useContext } from 'react';
import { CommonContext } from '../../../context/CommonContext';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import {
  Grid,
  Divider,
  Paper,
  Button,
  ListItem,
  List,
  Tooltip,
} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import Wrapper from './styles';

import NestedList from '../Layout/sidebar.jsx';

import { makeStyles } from '@material-ui/core/styles';

import CanvasJSReact from '../asset/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

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
  const {
    vsData,
    currentEventDatas,
    productDatas,
    setNewEventData,
    serverImgUrl,
  } = useContext(CommonContext);

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
    Axios.delete(`https://i3b309.p.ssafy.io/api/event`, {
      data: {
        event_id: eventId,
      },
    })
      .then(function(res) {
        alert('삭제가 완료되었습니다.');
        window.location.reload();
      })
      .catch(function(res) {});
  };

  // 차트 데이터
  const options = (data, index) => {
    return {
      animationEnabled: true,

      subtitles: [
        {
          // text: `${
          //   Object(productDatas[data.event_item['1'].prod_id - 1]).prod_name
          // } vs ${
          //   Object(productDatas[data.event_item['2'].prod_id - 1]).prod_name
          // }`,
          text: 'VS',
          verticalAlign: 'center',
          fontSize: 16,
          dockInsidePlotArea: true,
        },
      ],

      data: [
        {
          type: 'doughnut',
          // showInLegend: true,
          startAngle: 90,
          radius: '100%',
          innerRadius: '75%',
          // legendText: '{name}',
          // indexLabel: '{y}',
          // yValueFormatString: "#,###'%'",
          // indexLabelPlacement: 'inside',
          // indexLabelFontColor: 'white',
          dataPoints: [
            {
              color: '#5646FF',
              name: Object(
                productDatas[vsData[index].event_item['1'].event_prod - 1],
              ).prod_name,
              y:
                (vsData[index].event_item['1'].coupon_select /
                  (vsData[index].event_item['1'].coupon_select +
                    vsData[index].event_item['2'].coupon_select)) *
                100,
            },
            {
              color: '#FD636D',
              name: Object(
                productDatas[vsData[index].event_item['2'].event_prod - 1],
              ).prod_name,
              y:
                (vsData[index].event_item['2'].coupon_select /
                  (vsData[index].event_item['1'].coupon_select +
                    vsData[index].event_item['2'].coupon_select)) *
                100,
            },
          ],
        },
      ],
    };
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
              <h5 className="admin_event__header">이벤트 목록</h5>
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
                      <Grid item></Grid>
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
                      justify="space-evenly"
                      alignItems="center"
                    >
                      <Grid item xs={2}>
                        A상품
                      </Grid>
                      <Grid item xs={2}>
                        차트
                      </Grid>
                      <Grid item xs={2}>
                        B상품
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider className="admin_event__item--divider" />
                  {currentEventDatas.map((data, index) => (
                    <div key={index}>
                      <ListItem className="admin_event__table">
                        <Grid
                          item
                          container
                          direction="row"
                          justify="space-around"
                          alignItems="center"
                        >
                          <Grid
                            item
                            xs={10}
                            container
                            direction="row"
                            justify="space-evenly"
                            alignItems="center"
                          >
                            {/* A상품 */}
                            <Grid item>
                              {/* A상품 이미지 */}
                              <img
                                className="admin_event__item--image_A"
                                src={`${serverImgUrl}${
                                  Object(
                                    productDatas[
                                      data.event_item['1'].prod_id - 1
                                    ],
                                  ).prod_image
                                }`}
                                alt="image1"
                              />
                              <p className="admin_event__item--title">
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
                                개{' / '}
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

                            {/* 차트 */}
                            <Grid
                              item
                              className="admin_event__item--chart_box"
                              container
                              direction="row"
                              justify="space-evenly"
                              alignItems="center"
                            >
                              <Grid>
                                {/* A상품 %, 갯수 */}
                                <p className="admin_event__item--percent_A">
                                  {(
                                    (vsData[index].event_item['1']
                                      .coupon_select /
                                      (vsData[index].event_item['1']
                                        .coupon_select +
                                        vsData[index].event_item['2']
                                          .coupon_select)) *
                                    100
                                  ).toFixed(0)}
                                  %
                                </p>
                                <p className="admin_event__item--amount">
                                  {vsData[index].event_item['1'].coupon_select}
                                  개
                                </p>
                              </Grid>
                              <Grid>
                                <div className="admin_event__item--chart">
                                  <CanvasJSChart
                                    // style={{ width: '200px', height: '200px' }}
                                    options={options(data, index)}
                                  />
                                </div>
                              </Grid>
                              <Grid>
                                {/* B상품 %, 갯수 */}
                                <p className="admin_event__item--percent_B">
                                  {(
                                    (vsData[index].event_item['2']
                                      .coupon_select /
                                      (vsData[index].event_item['1']
                                        .coupon_select +
                                        vsData[index].event_item['2']
                                          .coupon_select)) *
                                    100
                                  ).toFixed(0)}
                                  %
                                </p>
                                <p className="admin_event__item--amount">
                                  {vsData[index].event_item['2'].coupon_select}
                                  개
                                </p>
                              </Grid>
                            </Grid>

                            {/* B상품 */}
                            <Grid item>
                              {/* B상품 이미지 */}
                              <img
                                className="admin_event__item--image_B"
                                src={`${serverImgUrl}${
                                  Object(
                                    productDatas[
                                      data.event_item['2'].prod_id - 1
                                    ],
                                  ).prod_image
                                }`}
                                alt="image2"
                              />
                              <p className="admin_event__item--title">
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
                                개{' / '}
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
                          <Grid item xs={1}>
                            <Grid
                              item
                              container
                              // direction="column"
                              alignItems="center"
                              justify="space-evenly"
                            >
                              <Grid>
                                <Button onClick={eventUpdate(data.event_id)}>
                                  <EditIcon />
                                </Button>
                              </Grid>
                              <Grid>
                                <Button onClick={eventDelete(data.event_id)}>
                                  <DeleteOutlineIcon />
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
