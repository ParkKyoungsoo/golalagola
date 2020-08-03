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

import voteDetailData from './dump.json';

// import testImg from '../../../pages/MainVote/dump.json';


export default function VoteGridItem(props) {
  const { itemData, itemType } = props;
  const { isVoteEditable } = useContext(ViewContext);
  const { test } = createContext();

  // `${serverUrl}/voting/my/vote/${itemData.vote_no}`,

  const [sw, setSw] = useState(itemData.vote_state === 'Y' ? true : false);

  let history = useHistory();

  const {
    user,
    serverUrl,
    serverImgUrl,
    setInfoData,
    setInfoDetailDialogOpen,
    setUser,
  } = useContext(CommonContext);

  const infoOpenHandler = async event => {
    // console.log('aaa');
    let respone = [];

    setInfoData(voteDetailData);
    // setInfoDetailDialogOpen(false);
  };

  const handleVoteState = async () => {
    setSw(!sw);
    const voteState = sw ? 'N' : 'Y';

    alert('Not implemented yet.');
  };

  const displayEndTime = dt => {
    console.log('VoteGridItem -> dt', dt);
    return '16:00:00';
  };

  return (
    <Wrapper className="root">
      <Grid container className="info-open-handler-grid">
        <Grid item xs={12}>
          <Grid className="img-box">
            {/* 이미지 */}
            <Link to={`VoteItemDetail/${itemData.prod_name}/${itemData.id}`}>
              <Avatar
                variant="square"
                src={itemData.prod_image}
                className={'large'}
                imgProps={{
                  className: sw ? 'img' : 'img deactivated',
                }}
              />
            </Link>
            <h3>{itemData.prod_name}</h3>

            <span className="date on">{displayEndTime(itemData.end_dt)}</span>
            {itemType === 'my' && isVoteEditable && (
              <button
                type="button"
                onClick={handleVoteState}
                className={sw ? 'btn-check on' : 'btn-check'}
              >
                <CheckIcon className="check" />
              </button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>

    // <Wrapper className="root">
    //   {/* <Grid container>
    //     <Grid item xs={6}>
    //       <Grid container>
    //         <Grid className="KisokCentering" item xs={6}>
    //           <img className="tmp" src={voteDatas.items[0].prod_image} alt="image1" />
    //         </Grid>
    //         <Grid className="KisokCentering" item xs={6}>
    //           <img className="tmp" src={voteDatas.items[1].prod_image} alt="image2"/>
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //     <Grid item xs={6}>
    //       <Grid container>
    //         <Grid className="KisokCentering" item xs={6}>
    //           <img className="tmp" src={voteDatas.items[2].prod_image} alt="image1" />
    //         </Grid>
    //         <Grid className="KisokCentering" item xs={6}>
    //           <img className="tmp" src={voteDatas.items[3].prod_image} alt="image2"/>
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //   </Grid> */}
    //   {/* <p>{itemData}</p> */}
    //   <Grid container className="info-open-handler-grid">
    //     <Grid item xs={12}>
    //       {itemType === 'my' ? (
    //         <Grid className="img-box">
    //           <Avatar
    //             onClick={infoOpenHandler}
    //             variant="square"
    //             src={`${serverImgUrl}${itemData.vote_img_url}`}
    //             className={'large'}
    //             imgProps={{
    //               className: sw ? 'img' : 'img deactivated',
    //             }}
    //           />
    //           <span className="date on">{displayEndTime(itemData.end_dt)}</span>
    //           {itemType === 'my' && isVoteEditable && (
    //             <button
    //               type="button"
    //               onClick={handleVoteState}
    //               className={sw ? 'btn-check on' : 'btn-check'}
    //             >
    //               <CheckIcon className="check" />
    //             </button>
    //           )}
    //         </Grid>
    //       ) : (
    //           <Grid className="img-box">
    //             {/* 이미지 */}
    //             <Link to={`VoteItemDetail/${itemData.prod_name}/${itemData.id}`}>
    //               <Avatar
    //                 variant="square"
    //                 src={itemData.prod_image}
    //                 className={'large'}
    //                 imgProps={{
    //                   className: sw ? 'img' : 'img deactivated',
    //                 }}
    //               />
    //             </Link>
    //               <h3>{itemData.prod_name}</h3>

    //             <span className="date on">{displayEndTime(itemData.end_dt)}</span>
    //             {itemType === 'my' && isVoteEditable && (
    //               <button
    //                 type="button"
    //                 onClick={handleVoteState}
    //                 className={sw ? 'btn-check on' : 'btn-check'}
    //               >
    //                 <CheckIcon className="check" />
    //               </button>
    //             )}
    //           </Grid>
    //         )}
    //     </Grid>
    //     {/* <Grid item xs={12} container>
    //       <Grid
    //         container
    //         direction="row"
    //         justify="space-between"
    //         alignItems="center"
    //         className={
    //           sw
    //             ? 'info-open-handler-grid-item-bottom'
    //             : ' info-open-handler-grid-item-bottom deactivated'
    //         }
    //       >
    //         <Grid item xs={7}>
    //           <Typography
    //             className="info-open-handler-grid-item-typography1"
    //             variant="subtitle1"
    //           >
    //             {itemData.vote_title}
    //           </Typography>
    //         </Grid>
    //         <Grid item>
    //           <Grid
    //             container
    //             direction="row"
    //             alignItems="center"
    //             justify="center"
    //             className="info-open-handler-grid-item-grid"
    //           >
    //             <HowToVoteIcon className="info-open-handler-grid-item-fa-icon" />
    //             <Typography
    //               variant="subtitle1"
    //               component="span"
    //               className="info-open-handler-grid-item-typography2"
    //             >
    //               {itemData.voting_count}
    //             </Typography>
    //             <MessageIcon className="info-open-handler-grid-item-vi-icon" />
    //             <Typography
    //               variant="subtitle1"
    //               component="span"
    //               className="info-open-handler-grid-item-typography3"
    //             >
    //               {itemData.feed_count}
    //             </Typography>
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //     </Grid> */}
    //   </Grid>
    // </Wrapper>
  );
}