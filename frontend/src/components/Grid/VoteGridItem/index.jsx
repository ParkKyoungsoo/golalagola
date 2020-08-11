import React, { useContext, useState, useEffect, createContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Axios from 'axios';

import {
  Grid,
  Typography,
  Avatar,
  Badge,
  useMediaQuery,
} from '@material-ui/core';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import MessageIcon from '@material-ui/icons/Message';
import CheckIcon from '@material-ui/icons/Check';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import { withStyles } from '@material-ui/core/styles';
import Wrapper from './styles';

import { CommonContext } from '../../../context/CommonContext';
import { ViewContext } from '../../../context/ViewContext';

export default function VoteGridItem(props) {
  const { itemData, itemType } = props;
  const { test } = createContext();

  const { productDatas, setProductDatas } = useContext(CommonContext);

  // `${serverUrl}/voting/my/vote/${itemData.vote_no}`,

  const [sw, setSw] = useState(itemData.vote_state === 'Y' ? true : false);

  const {
    user,
    serverUrl,
    serverImgUrl,
    setInfoData,
    setInfoDetailDialogOpen,
    setUser,
  } = useContext(CommonContext);

  const infoOpenHandler = async event => {
    let respone = [];

    setInfoData(productDatas);
    // setInfoDetailDialogOpen(false);
  };

  const handleVoteState = async () => {
    setSw(!sw);
    const voteState = sw ? 'N' : 'Y';

    alert('Not implemented yet.');
  };

  const displayEndTime = dt => {
    return '16:00:00';
  };

  let history = useHistory();
  const isMobile = useMediaQuery('(max-width:930px)');
  const click = () => {
    if (history.location.pathname.includes('searchresult')) {
      history.replace('');
      history.replace(
        `voteitemdetail/${itemData.prod_name}/${itemData.prod_id}`,
      );
    } else {
      history.push(`voteitemdetail/${itemData.prod_name}/${itemData.prod_id}`);
    }
  };
  let originPrice = itemData.prod_price;
  let quizSale = itemData.prod_sale;
  let quizSalePrice = parseInt((originPrice * (100 - quizSale)) / 100);

  // 1000 단위마다 , 찍어주는 함수입니다. (퍼옴)
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  //fruitdev.tistory.com/160 [과일가게 개발자]
  // 출처: https:
  return (
    <Wrapper className="root" style={isMobile ? null : { margin: '10px' }}>
      <Grid container className="info-open-handler-grid">
        <Grid>
          <Grid className="img-box" onClick={click}>
            <Avatar
              variant="square"
              src={`https://i3b309.p.ssafy.io/${itemData.prod_image}`}
              className={'large'}
              // imgProps={{
              //   className: sw ? 'img' : 'img deactivated',
              // }}
            />
            {isMobile ? (
              <>
                <span>{itemData.prod_title}</span>
                <span
                  style={{
                    color: 'red',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    border: '3px solid pink',
                  }}
                >
                  {'   '}
                  {itemData.prod_sale}%{'   '}
                </span>
                <br />
                <span style={{ textDecoration: 'line-through' }}>
                  {numberWithCommas(originPrice)}원{'  '}
                </span>

                <span style={{ fontWeight: 'bold' }}>
                  {numberWithCommas(quizSalePrice)}원
                </span>
              </>
            ) : (
              <>
                <span style={{ fontSize: '1.5vw' }}>{itemData.prod_title}</span>
                <span
                  style={{
                    color: 'red',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    border: '3px solid pink',
                    fontSize: '1.5vw',
                  }}
                >
                  {'   '}
                  {itemData.prod_sale}%{'   '}
                </span>
                <br />
                <span
                  style={{ textDecoration: 'line-through', fontSize: '1.5vw' }}
                >
                  {numberWithCommas(originPrice)}원{'  '}
                </span>

                <span style={{ fontWeight: 'bold', fontSize: '1.5vw' }}>
                  {numberWithCommas(quizSalePrice)}원
                </span>
              </>
            )}
            <span className="date on">{displayEndTime(itemData.end_dt)}</span>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
}
