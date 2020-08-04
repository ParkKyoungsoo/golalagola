import React, { Component, useState, useContext, useEffect } from 'react';
import {
  GridList,
  Grid,
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

  return (
    <Wrapper className="root">
      <Header />
      <GridList
        className="grid-list"
        cols={Number.isInteger(nowCols) ? nowCols : 1}
        cellHeight={'auto'}
      >
        {productDatas.map((TmpData, index) => {
          if (TmpData.prod_name.includes(match.params.searchValue)) {
            return (
              <Grid key={index}>
                <VoteGridItem itemData={TmpData} index={index} />
              </Grid>
            );
          }
        })}
      </GridList>
    </Wrapper>
  );
};

export default Result;
