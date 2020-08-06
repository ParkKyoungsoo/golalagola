import React, { useContext, useState, useEffect, createContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Axios from 'axios';

import { Grid, Typography, Avatar, Badge } from '@material-ui/core';
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
  const click = () => {
    if (history.location.pathname.includes('SearchResult')) {
      history.replace('');
      history.replace(
        `VoteItemDetail/${itemData.prod_name}/${itemData.prod_id}`,
      );
    } else {
      history.push(`VoteItemDetail/${itemData.prod_name}/${itemData.prod_id}`);
    }
  };

  return (
    <Wrapper className="root">
<<<<<<< HEAD
=======
      {/* {console.log(itemData)} */}

>>>>>>> 56c6eac787504c19b57ddcc8c25d207da9e4ad3c
      <Grid container className="info-open-handler-grid">
        <Grid item xs={12}>
          <Grid className="img-box" onClick={click}>
            <Avatar
              variant="square"
              src={`https://i3b309.p.ssafy.io/${itemData.prod_image}`}
              className={'large'}
              imgProps={{
                className: sw ? 'img' : 'img deactivated',
              }}
            />
            <h3>{itemData.prod_name}</h3>
            <span className="date on">{displayEndTime(itemData.end_dt)}</span>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
}
