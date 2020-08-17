import React, { useState, useEffect, useContext } from 'react';

import AdminNav from './Layout/nav.jsx';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import CanvasJSReact from './asset/canvasjs.react';
import { CommonContext } from '../../context/CommonContext.js';
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
    <div>
      <AdminNav></AdminNav>
      <h1>관리자 페이지</h1>
      <div classes={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Paper className={classes.paper}></Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper className={classes.paper}>오늘의 날씨는~</Paper>
            <CanvasJSChart options={options} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {recommandProds.map((recommandDatas, index) => (
            <Grid key={index} item xs={3} style={{ display: 'flex' }}>
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
      </div>
    </div>
  );
};
export default MainAdmin;
