import React, { useState, useEffect, useContext } from 'react';

import AdminNav from '../Layout/nav.jsx';

import CanvasJSReact from '../asset/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const MainAdmin = props => {
  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: 'Website Traffic Sources',
    },
    data: [
      {
        type: 'pie',
        startAngle: 75,
        toolTipContent: '<b>{label}</b>: {y}%',
        showInLegend: 'true',
        legendText: '{label}',
        indexLabelFontSize: 16,
        indexLabel: '{label} - {y}%',
        dataPoints: [
          { y: 18, label: 'Direct' },
          { y: 49, label: 'Organic Search' },
          { y: 9, label: 'Paid Search' },
          { y: 5, label: 'Referral' },
          { y: 19, label: 'Social' },
        ],
      },
    ],
  };
  return (
    <div>
      <AdminNav></AdminNav>
      <h1>재고 통계</h1>
      <div>
        <h1>React Pie Chart</h1>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    </div>
  );
};
export default MainAdmin;
