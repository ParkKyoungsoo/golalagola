import React, { useContext } from 'react';
import { CommonContext } from '../../context/CommonContext';
import { Grid, Divider, Paper } from '@material-ui/core';

import Wrapper from './styles';
import NestedList from './Layout/sidebar.jsx';

import { makeStyles } from '@material-ui/core/styles';

import CanvasJSReact from './asset/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// Grid Styles
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

const MainAdmin = props => {
  const classes = useStyles(); // Grid

  const {
    dailySaleDatas,
    couponUseSales,
    recommandProds,
    categoryDatas,
  } = useContext(CommonContext);

  const addSymbols = e => {
    var suffixes = ['', '천', '백만', '십억'];
    var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
    if (order > suffixes.length - 1) order = suffixes.length - 1;
    var suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  };

  const options = {
    width: '1050',
    height: '500',
    padding: 20,
    fontSize: 16,
    dataPointWidth: 40,
    theme: 'light2',
    backgroundColor: '#ffffff',
    fontFamily: 'Noto sans KR',
    animationEnabled: true,
    colorSet: 'colorSet2',

    axisX: {
      valueFormatString: 'MMMM DD',
      margin: 50,
      labelAngle: -30,
      labelFontSize: 16,
    },

    axisY: {
      suffix: '원',
      margin: 80,
      labelFontSize: 16,

      labelFormatter: addSymbols,
    },
    legend: {
      cursor: 'pointer',
      horizontalAlign: 'right',
      verticalAlign: 'center',
      fontSize: 13,
      padding: 20,
    },
    data: [
      {
        type: 'column',
        name: '전체 매출',
        showInLegend: true,
        xValueFormatString: 'MMMM DD',
        yValueFormatString: '#,##0원',
        dataPoints: dailySaleDatas,
      },
      {
        type: 'area',
        name: '쿠폰 매출',
        markerBorderColor: 'white',
        markerBorderThickness: 2,
        showInLegend: true,
        yValueFormatString: '#,##0원',
        dataPoints: couponUseSales,
      },
    ],
  };

  return (
    <Wrapper>
      <Grid className="admin_chart__main">
        <Grid container>
          <Grid item xs={2}>
            <NestedList index={0} />
          </Grid>
          <Grid item xs={10} container>
            <Grid
              className="admin_chart__content"
              item
              xs={12}
              // style={{ width: '5%' }}
            >
              <h5 className="admin_chart__header">판매 현황 차트</h5>
              <Divider variant="middle" className="admin_chart__divider" />
              <Paper elevation={2} style={{ padding: '30px 0' }}>
                <Grid item xs={12} className="admin_chart__chart_box">
                  <div className="admin_chart__chart_1">
                    <CanvasJSChart item xs={12} options={options} />
                  </div>
                </Grid>
              </Paper>
              <br></br>
              <br></br>
              <h5 className="admin_chart__header">카테고리별 제고 현황</h5>
              <Divider className="admin_chart__divider" />
              <Paper elevation={2} style={{ padding: '20px 0' }}>
                <Grid>
                  <Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                      }}
                    >
                      {recommandProds.map((recommandDatas, index) => (
                        <Grid
                          key={index}
                          item
                          xs={6}
                          style={{ padding: '3vh 2vw', marginBottom: '60px' }}
                          className="admin_chart__chart_box"
                        >
                          <div className="admin_chart__chart_2">
                            <CanvasJSChart
                              options={{
                                width: '500',
                                height: '400',
                                animationEnabled: true,
                                dataPointWidth: 40,
                                theme: 'light2',
                                title: {
                                  text: `${categoryDatas[index + 1].cat_title}`,
                                },
                                axisY: {
                                  margin: 30,

                                  scaleBreaks: {
                                    autoCalculate: true,
                                    type: 'wavy',
                                    lineColor: 'dark',
                                  },
                                },
                                axisX: {
                                  margin: 30,
                                },
                                data: [
                                  {
                                    type: 'column',
                                    indexLabel: '{y}',
                                    indexLabelFontColor: 'black',
                                    dataPoints: recommandDatas,
                                  },
                                ],
                              }}
                            />
                          </div>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};
export default MainAdmin;
