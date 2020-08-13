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
  useMediaQuery,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useNowCols } from '../../common/MediaQueryHooks';
import Wrapper from './styles';
import Layout from '../../layout/';
import { CommonContext } from '../../context/CommonContext';
import VoteGridItem from '../../components/Grid/VoteGridItem';

const Result = ({ match }) => {
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const nowCols = useNowCols();
  const items = [];
  const displayEndTime = dt => {
    console.log('VoteGridItem -> dt', dt);
    return '16:00:00';
  };
  let history = useHistory();
  const onClick = itemData => {
    history.replace(
      `voteitemdetail/${itemData.prod_name}/${itemData.prod_id}}`,
    );
  };
  const isMobile = useMediaQuery('(max-width:930px)');
  return (
    <Wrapper className="root">
      <Layout>
        {productDatas.map((itemData, index) => {
          if (itemData.prod_name.includes(match.params.searchValue)) {
            // console.log('TmpData', itemData);
            items.push(itemData);
          }
        })}
        {items.length === 0 ? (
          <Grid
            style={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Alert severity="error">
              <h2>검색 결과가 없습니다. 다시 검색해 주세요.</h2>
            </Alert>
          </Grid>
        ) : null}
        <GridList
          className="grid-list"
          cols={Number.isInteger(nowCols) ? nowCols : 1}
          cellHeight={'auto'}
        >
          {/* {console.log('length', items.length)} */}

          {items.map((itemData, index) => {
            return (
              <Grid
                key={index}
                style={isMobile ? { padding: '5vh 5vw' } : null}
              >
                <VoteGridItem
                  // onClick={onClick(itemData)}
                  itemData={itemData}
                  index={index}
                />
              </Grid>
            );
          })}
        </GridList>
      </Layout>
    </Wrapper>
  );
};

export default Result;
