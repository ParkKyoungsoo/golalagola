import React, { useState, useContext, useEffect } from 'react';
import { CommonContext } from '../../context/CommonContext';
import { Grid } from '@material-ui/core';
import axios from 'axios';

const SelectItemA = modalNum => {
  const { newEventData, setNewEventData } = useContext(CommonContext);
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const [filterDatas, setFilterDatas] = useState([]);

  const ChoiceItemB = prod_id => e => {
    setNewEventData({
      ...newEventData,
      event_prod_B: prod_id,
    });

    console.log('newEventData', newEventData);

    axios
      .post('https://i3b309.p.ssafy.io/api/event/insert', newEventData)
      .then(function(response) {
        console.log(response);
      })
      .catch(error => {
        console.log('error : ', error.response);
      });
    modalNum.setModalNum(4);
  };

  const test = () => {
    setFilterDatas(
      productDatas.filter(
        product =>
          product.prod_category === newEventData.event_category &&
          product.prod_id !== newEventData.event_prod_B,
      ),
    );
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <>
      <h1>아이템 B 선택페이지</h1>
      <Grid>
        {filterDatas.map(product => (
          <Grid>
            <button onClick={ChoiceItemB(product.prod_id)}>
              {product.prod_name}
            </button>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SelectItemA;
