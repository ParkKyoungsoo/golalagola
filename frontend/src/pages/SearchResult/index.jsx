import React, { Component, useState, useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  GridList,
  Grid,
  Avatar,
  MenuItem,
  FormControl,
  Select,
  Typography,
} from '@material-ui/core';
import { useNowCols } from '../../common/MediaQueryHooks';
import Header from '../../layout/Header';
import Wrapper from './styles';
import { CommonContext } from '../../context/CommonContext';
import VoteGridItem from '../../components/Grid/VoteGridItem';

const Result = ({ match }) => {
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const nowCols = useNowCols();
  const displayEndTime = dt => {
    console.log('VoteGridItem -> dt', dt);
    return '16:00:00';
  };
  let history = useHistory();
  const onClick = itemData => {
    history.replace(
      `VoteItemDetail/${itemData.prod_name}/${itemData.prod_id}}`,
    );
  };
  return (
    <Wrapper className="root">
      <Header />

      <GridList
        className="grid-list"
        cols={Number.isInteger(nowCols) ? nowCols : 1}
        cellHeight={'auto'}
      >
        {productDatas.map((itemData, index) => {
          if (itemData.prod_name.includes(match.params.searchValue)) {
            console.log('TmpData', itemData);
            return (
              <Grid key={index}>
                <VoteGridItem
                  // onClick={onClick(itemData)}
                  itemData={itemData}
                  index={index}
                />
                <h3 style={{ marginLeft: '20px' }}>{itemData.prod_price}원</h3>
              </Grid>
            );
          }
        })}
      </GridList>
    </Wrapper>
  );
};

export default Result;
