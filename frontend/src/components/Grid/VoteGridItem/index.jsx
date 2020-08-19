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
  const isMobile = useMediaQuery('(max-width:960px)');
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

  const [realtime, setRealTime] = useState([]);

  useEffect(() => {
    Axios.get('https://i3b309.p.ssafy.io/api/event/eventProd').then(res => {
      setRealTime(res.data);
    });
  }, []);
  return (
    <Wrapper className="root" style={isMobile ? null : { margin: '10px' }}>
      {realtime.includes(itemData.prod_id) ? (
        <Grid container className="info-open-handler-grid">
          {isMobile ? (
            <Grid className="m_effect" style={{ zIndex: '0' }}>
              <Grid className="img-box" onClick={click}>
                <Avatar
                  variant="square"
                  src={`${serverImgUrl}${itemData.prod_image}`}
                  className={'large'}
                  // imgProps={{
                  //   className: sw ? 'img' : 'img deactivated',
                  // }}
                  style={{
                    borderRadius: '5%',
                  }}
                />

                <Grid style={{ padding: '0 0 5vh 0' }}>
                  <p className="mobilefontMedium doubleLine titleHeight">
                    {itemData.prod_title}
                  </p>
                  <Grid
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      color: 'red',
                    }}
                  >
                    <p className="fontVerticalMiddle mobilefontMedium">최대</p>
                    &nbsp;&nbsp;
                    <p className="fontVerticalMiddle mobilefontLarge">
                      {itemData.prod_sale}%
                    </p>
                  </Grid>
                  <Grid style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p className="fontVerticalMiddle mobilefontMedium fontCancelLine">
                      {numberWithCommas(originPrice)}원
                    </p>
                    {/* 띄어쓰기 */}
                    &nbsp;&nbsp;
                    <p className="fontVerticalMiddle mobilefontLarge">
                      {numberWithCommas(quizSalePrice)}원
                    </p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid className="effect" style={{ zIndex: '0' }}>
              <Grid className="img-box">
                <Avatar
                  onClick={click}
                  variant="square"
                  src={`${serverImgUrl}${itemData.prod_image}`}
                  className={'large'}
                  style={{
                    borderRadius: '5%',
                  }}
                />

                <Grid style={{ padding: '0 0 5vh 0' }}>
                  <p className="fontMedium doubleLine titleHeight">
                    {itemData.prod_title}
                  </p>
                  <Grid
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      color: 'red',
                    }}
                  >
                    <p className="fontVerticalMiddle fontMedium">최대</p>
                    &nbsp;&nbsp;
                    <p className="fontVerticalMiddle fontLarge">
                      {itemData.prod_sale}%
                    </p>
                  </Grid>
                  <Grid style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p className="fontVerticalMiddle fontMedium fontCancelLine">
                      {numberWithCommas(originPrice)}원
                    </p>
                    &nbsp;&nbsp;
                    <p className="fontVerticalMiddle fontLarge">
                      {numberWithCommas(quizSalePrice)}원
                    </p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
          {/* <span className="date on">{displayEndTime(itemData.end_dt)}</span> */}
        </Grid>
      ) : (
        <Grid container className="info-open-handler-grid">
          {isMobile ? (
            <Grid>
              <Grid className="img-box" onClick={click}>
                <Avatar
                  variant="square"
                  src={`${serverImgUrl}${itemData.prod_image}`}
                  className={'large'}
                  // imgProps={{
                  //   className: sw ? 'img' : 'img deactivated',
                  // }}
                  style={{
                    borderRadius: '5%',
                  }}
                />

                <Grid style={{ padding: '0 0 5vh 0' }}>
                  <p className="mobilefontMedium doubleLine titleHeight">
                    {itemData.prod_title}
                  </p>
                  <Grid
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      color: 'red',
                    }}
                  >
                    <p className="fontVerticalMiddle mobilefontMedium">최대</p>
                    &nbsp;&nbsp;
                    <p className="fontVerticalMiddle mobilefontLarge">
                      {itemData.prod_sale}%
                    </p>
                  </Grid>
                  <Grid style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p className="fontVerticalMiddle mobilefontMedium fontCancelLine">
                      {numberWithCommas(originPrice)}원
                    </p>
                    &nbsp;&nbsp;
                    <p className="fontVerticalMiddle mobilefontLarge">
                      {numberWithCommas(quizSalePrice)}원
                    </p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid>
              <Grid className="img-box">
                <Avatar
                  onClick={click}
                  variant="square"
                  src={`${serverImgUrl}${itemData.prod_image}`}
                  className={'large'}
                  style={{
                    borderRadius: '5%',
                    cursor: 'pointer',
                  }}
                />
                <Grid style={{ padding: '0 0 5vh 0' }}>
                  <p className="fontMedium doubleLine titleHeight">
                    {itemData.prod_title}
                  </p>
                  <Grid
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      color: 'red',
                    }}
                  >
                    <p className="fontVerticalMiddle fontMedium">최대</p>
                    &nbsp;&nbsp;
                    <p className="fontVerticalMiddle fontLarge">
                      {itemData.prod_sale}%
                    </p>
                  </Grid>

                  <Grid style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p className="fontVerticalMiddle fontMedium fontCancelLine">
                      {numberWithCommas(originPrice)}원
                    </p>
                    &nbsp;&nbsp;
                    <p className="fontVerticalMiddle fontLarge">
                      {numberWithCommas(quizSalePrice)}원
                    </p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
          {/* <span className="date on">{displayEndTime(itemData.end_dt)}</span> */}
        </Grid>
      )}
    </Wrapper>
  );
}
