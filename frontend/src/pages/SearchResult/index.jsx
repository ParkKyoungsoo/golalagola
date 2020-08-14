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
  Divider,
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
              <p>'{match.params.searchValue}' 상품을 찾지 못했습니다.</p>
              <Divider />
              <br />
              <p>다시 검색해보세요 단어의 철자가 정확한지 확인해 보세요.</p>
              <p>띄어쓰기 또는 넓은 의미의 단어를 사용해 보세요.</p>
            </Alert>
          </Grid>
        ) : (
          <Grid
            style={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Grid>
              <p>'{match.params.searchValue}' 검색 결과</p>
              <p>디자인이 마음에 안 듬 matarial ui snakbar 괜찮을 거 같음</p>
            </Grid>
          </Grid>
        )}
        <Divider />
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
