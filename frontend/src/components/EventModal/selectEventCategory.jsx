import React, { useState, useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { CommonContext } from '../../context/CommonContext';
import { Category } from '@material-ui/icons';

const SelectEventCategory = modalNum => {
  const { categoryDatas, setCategoryDatas } = useContext(CommonContext);
  const { newEventData, setNewEventData } = useContext(CommonContext);

  const ChoiceEventCate = num => e => {
    setNewEventData({
      ...newEventData,
      event_category: num,
    });
    modalNum.setModalNum(2);
  };

  return (
    <>
      {console.log(categoryDatas)}
      <h2>카테고리를 선택해 주세요.</h2>
      <Grid>
        {categoryDatas.map((Category, index) => (
          <div>
            <button onClick={ChoiceEventCate(Category.cat_no)}>
              {Category.cat_title}
            </button>
          </div>
        ))}
      </Grid>
    </>
  );
};

export default SelectEventCategory;
