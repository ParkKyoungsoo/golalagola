import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';

import AdminNav from '../../Layout/nav.jsx';
import { CommonContext } from '../../../../context/CommonContext';

import CanvasJSReact from '../../asset/canvasjs.react';
import Clock from 'react-live-clock';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Recommand = props => {
  const [vsData, setVSData] = useState([]);
  const { productDatas, setProductDatas } = useContext(CommonContext);

  const date = new Date();
  const today =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay();

  useEffect(() => {
    Axios.get('https://i3b309.p.ssafy.io/api/coupon/estimation').then(
      ({ data }) => {
        setVSData(data);
      },
    );
  }, []);
  //   console.log(productData.prod_expiration.getMonth);

  // console.log('options', options.data.dataPoints);
  console.log('data11', vsData);
  return (
    <div>
      <AdminNav></AdminNav>
      <h1>추천</h1>
      <div>
        <Clock
          format={'YYYY년 MM월 DD일'}
          ticking={true}
          timezome={'US/Pacific'}
        ></Clock>
        <h1>React Pie Chart</h1>
        <div>
          {vsData.map((vsdata, index) => (
            <CanvasJSChart
              options={{
                animationEnabled: true,
                title: {
                  text: 'VS 이벤트 사용자 선택 현황',
                },
                subtitles: [
                  {
                    text: Object(
                      productDatas[vsdata.event_item['3'].more_item - 1],
                    ).prod_name,
                    verticalAlign: 'center',
                    fontSize: 24,
                    dockInsidePlotArea: true,
                  },
                ],
                data: [
                  {
                    type: 'doughnut',
                    showInLegend: true,
                    indexLabel: '{name}: {y}',
                    yValueFormatString: "#,###'%'",
                    dataPoints: [
                      {
                        name: Object(
                          productDatas[vsdata.event_item['1'].event_prod - 1],
                        ).prod_name,
                        y:
                          (vsdata.event_item['1'].coupon_select /
                            (vsdata.event_item['1'].coupon_select +
                              vsdata.event_item['2'].coupon_select)) *
                          100,
                      },
                      {
                        name: Object(
                          productDatas[vsdata.event_item['2'].event_prod - 1],
                        ).prod_name,
                        y:
                          (vsdata.event_item['2'].coupon_select /
                            (vsdata.event_item['1'].coupon_select +
                              vsdata.event_item['2'].coupon_select)) *
                          100,
                      },
                    ],
                  },
                ],
              }}
              /* onRef={ref => this.chart = ref} */
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Recommand;
