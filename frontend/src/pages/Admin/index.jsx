import React, { useState, forwardRef, useContext } from 'react';
import { CommonContext } from '../../context/CommonContext';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { Grid, Divider, Paper } from '@material-ui/core';
import MaterialTable from 'material-table';

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
    setDailySaleDatas,
    couponUseSales,
    setCouponUseSales,
    recommandProds,
    setRecommandProds,
    categoryDatas,
    setCategoryData,
  } = useContext(CommonContext);
  // console.log('dailySaleDatas', dailySaleDatas);
  // console.log('couponUseSales', couponUseSales);
  console.log('recommandProds', recommandProds);
  console.log('categoryDatas', categoryDatas);

  const addSymbols = e => {
    var suffixes = ['', 'K', 'M', 'B'];
    var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
    if (order > suffixes.length - 1) order = suffixes.length - 1;
    var suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  };
  const toggleDataSeries = e => {
    if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  };

  const options = {
    animationEnabled: true,
    colorSet: 'colorSet2',
    title: {
      text: '날짜별 매출',
    },
    axisX: {
      valueFormatString: 'MMMM',
    },
    axisY: {
      prefix: '$',
      labelFormatter: addSymbols,
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: 'pointer',
      itemclick: toggleDataSeries,
      verticalAlign: 'top',
    },
    data: [
      {
        type: 'column',
        name: '매출',
        showInLegend: true,
        xValueFormatString: 'YYYY MMMM DD',
        yValueFormatString: '$#,##0',
        dataPoints: dailySaleDatas,
      },
      // {
      //   type: 'line',
      //   name: 'Expected Sales',
      //   showInLegend: true,
      //   yValueFormatString: '$#,##0',
      //   dataPoints: couponUseSales,
      // },
      {
        type: 'area',
        name: '쿠폰 매출',
        markerBorderColor: 'white',
        markerBorderThickness: 2,
        showInLegend: true,
        yValueFormatString: '$#,##0',
        dataPoints: couponUseSales,
      },
    ],
  };

  return (
    <Wrapper>
      <div className="admin_product__main">
        <Grid container>
          <Grid item xs={2}>
            <NestedList index={0} />
          </Grid>
          <Grid
            item
            xs={10}
            style={{ display: 'flex', flexWrap: 'wrap', background: '#EFEFF5' }}
          >
            <Grid item xs={12} style={{ padding: '5vh 3vw' }}>
              <CanvasJSChart options={options} />
            </Grid>

            <Grid item xs={12} style={{ padding: '10vh 0' }}>
              <h2 style={{ paddingLeft: '2vw' }}>카테고리별 재고 현황</h2>
              <Grid style={{ display: 'flex', flexWrap: 'wrap' }}>
                {recommandProds.map((recommandDatas, index) => (
                  <Grid key={index} item xs={4} style={{ padding: '3vh 2vw' }}>
                    <CanvasJSChart
                      options={{
                        animationEnabled: true,
                        theme: 'white',
                        title: {
                          text: `${categoryDatas[index + 1].cat_title}`,
                        },
                        axisY: {
                          title: `${categoryDatas[index + 1].cat_title}`,
                          scaleBreaks: {
                            autoCalculate: true,
                            type: 'wavy',
                            lineColor: 'dark',
                          },
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
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Wrapper>
  );
};
export default MainAdmin;
