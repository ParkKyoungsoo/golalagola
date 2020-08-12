// import React, { useState, useEffect, useContext } from 'react';
// import { useHistory, Link } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import SendIcon from '@material-ui/icons/Send';
// import Axios from 'axios';

// const NestedList = props => {
//   // 쿠폰 데이터를 보내고 다시 받아오는 요청
//   const submitCouponData = async () => {
//     // data 가공해서 post 요청 보내기,
//     console.log(selectedEvent);
//     for (let event_id in selectedEvent) {
//       console.log(event_id, selectedEvent[event_id]);
//       if (selectedEvent[event_id] !== null) {
//         await Axios.post('https://i3b309.p.ssafy.io/api/coupon/', {
//           user_id: userId,
//           event_id: event_id,
//           coupon_select: selectedEvent[event_id],
//           coupon_date: new Date(),
//           coupon_use: false,
//         })
//           .then(res => console.log(res))
//           .catch(err => console.log(err));
//       }
//     }

//     // get 요청으로 데이터 받아서 다시 랜더링하기
//     getUserCouponData();
//     setForceRender({});

//     // myCoupon으로 이동할 것인지 물어보기
//     const confirmMessage = window.confirm('마이쿠폰으로 이동하시겠습니까?');
//     if (confirmMessage) {
//       window.location.href = '/MyCoupon';
//     }
//   };

//   // sidebar 스타일 정의
//   const classes = useStyles();
//   let history = useHistory();
//   const useStyles = makeStyles(theme => ({
//     root: {
//       width: '100%',
//       maxWidth: 100,
//       // backgroundColor: theme.palette.background.paper,
//     },
//     // nested: {
//     //   paddingLeft: theme.spacing(4),
//     // },
//   }));
//   function ListItemLink(props) {
//     return <ListItem button component="a" {...props} />;
//   }
//   const onClickRedirectPathHandler = name => e => {
//     window.scrollTo(0, 0);
//     if (name === '/mainvote') {
//       history.push('/');
//       // console.log(mainUrl);
//     } else {
//       history.push(`/${name}`);
//     }
//   };
//   // *** 사이드 바 내에서 open 기능
//   const [open, setOpen] = React.useState(true);
//   const handleClick = () => {
//     setOpen(!open);
//   };
//   // ***

//   return (
//     <List
//       component="nav"
//       aria-labelledby="nested-list-subheader"
//       // subheader={
//       //   <ListSubheader component="div" id="nested-list-subheader">
//       //     관리자 목록
//       //   </ListSubheader>
//       // }
//       className={classes.root}
//     >
//       <ListItem button onClick={submitCouponData} className="sideBarColumn">
//         <ListItemIcon className="sideBarIcon">
//           <SendIcon />
//         </ListItemIcon>
//         <ListItemText primary="쿠폰담기" />
//       </ListItem>
//       <ListItem
//         button
//         className="sideBarColumn"
//         onClick={onClickRedirectPathHandler('mycoupon')}
//       >
//         <ListItemIcon className="sideBarIcon">
//           <InboxIcon />
//         </ListItemIcon>
//         <ListItemText primary="쿠폰함" />
//         {/* {open ? <ExpandLess /> : <ExpandMore />} */}
//       </ListItem>
//     </List>
//   );
// };
// export default NestedList;
