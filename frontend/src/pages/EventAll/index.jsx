import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Grid, useMediaQuery, Divider, Card } from '@material-ui/core';
import { CommonContext } from '../../context/CommonContext';
import Layout from '../../layout';
import Wrapper from './styles';
import Axios from 'axios';

// sidebar 용 import
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SendIcon from '@material-ui/icons/Send';

//EventAll
const EventAll = () => {
  const {
    user,
    productDatas,
    setProductDatas,
    currentEventDatas,
    setCurrentEventDatas,
    userEvent,
    setUserEvent,
    userCoupon,
    setUserCoupon,
    mainUrl,
    myCouponDatas,
  } = useContext(CommonContext);

  const [forceRender, setForceRender] = useState({});
  const [selectedEvent, setSelectedEvent] = useState({});

  let history = useHistory();
  const isMobile = useMediaQuery('(max-width:930px)');
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  function choiceProduct(tmpData, productNumber) {
    // 같은 event_id가 존재하지 않는다면 추가
    // 같은 event_id가 존재한다면 선택한 상품을 수정

    const selectedProductId = tmpData.event_item[productNumber].prod_id;
    if (selectedEvent[tmpData.event_id] === undefined) {
      selectedEvent[tmpData.event_id] = selectedProductId;
    } else {
      if (selectedEvent[tmpData.event_id] === selectedProductId) {
        selectedEvent[tmpData.event_id] = null;
      } else {
        selectedEvent[tmpData.event_id] = selectedProductId;
      }
    }
    // console.log('selectedEvent', selectedEvent);
    setSelectedEvent(selectedEvent);
    setForceRender({});
  }

  // 쿠폰 데이터를 보내고 다시 받아오는 요청
  const submitCouponData = async () => {
    // data 가공해서 post 요청 보내기,
    console.log(selectedEvent);
    for (let event_id in selectedEvent) {
      console.log(event_id, selectedEvent[event_id]);
      if (selectedEvent[event_id] !== null) {
        await Axios.post('https://i3b309.p.ssafy.io/api/coupon/', {
          user_id: user.user_id,
          event_id: event_id,
          coupon_select: selectedEvent[event_id],
          coupon_date: new Date(),
          coupon_use: false,
        })
          .then(res => console.log(res))
          .catch(err => console.log(err));
      }
    }

    // get 요청으로 데이터 받아서 다시 랜더링하기
    setForceRender({});

    // myCoupon으로 이동할 것인지 물어보기
    const confirmMessage = window.confirm('마이쿠폰으로 이동하시겠습니까?');
    if (confirmMessage) {
      window.location.href = '/mycoupon';
    }
  };

  const userNotLogin = () => {
    const confirmMessage = window.confirm('로그인 후 이용 가능합니다.');
    if (confirmMessage) {
      window.location.href = '/auth';
    }
  };

  function eventGridRender(index, tmpData) {
    const checkedStyle = {
      // border: '1px solid red',
      opacity: '0.5',
      border: '2px solid black',
    };
    console.log(tmpData);
    if (isMobile) {
      if (!userEvent.includes(tmpData.event_id)) {
        return (
          <>
            {index % 2 === 0 ? (
              <Divider style={{ margin: '0px 0 0px 0' }} />
            ) : null}

            <Grid
              style={{
                display: 'inline-flex',
                padding: '1vh 3vw ',
              }}
            >
              <Card className="Card_align">
                <Grid
                  xs={5}
                  // className="Event1"
                >
                  <img
                    className="tmp"
                    src={`https://i3b309.p.ssafy.io/${
                      Object(productDatas[tmpData.event_item['1'].prod_id - 1])
                        .prod_image
                    }`}
                    style={
                      selectedEvent[tmpData.event_id] ===
                      tmpData.event_item['1'].prod_id
                        ? checkedStyle
                        : null
                    }
                    alt="image1"
                    onClick={() => choiceProduct(tmpData, 1)}
                  />
                  <div
                  // style={{ textAlign: 'left' }}
                  >
                    <span>
                      {
                        Object(
                          productDatas[tmpData.event_item['1'].prod_id - 1],
                        ).prod_title
                      }
                    </span>
                    <br />
                    <span style={{ textDecoration: 'line-through' }}>
                      {numberWithCommas(
                        Object(
                          productDatas[tmpData.event_item['1'].prod_id - 1],
                        ).prod_price,
                      )}
                      원 {'  '}
                    </span>

                    <span
                      style={{
                        color: 'red',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        border: '3px solid pink',
                      }}
                    >
                      {
                        Object(
                          productDatas[tmpData.event_item['1'].prod_id - 1],
                        ).prod_sale
                      }
                      %
                    </span>
                    <br />
                    <span>최대 할인 가격</span>
                  </div>
                </Grid>

                <Grid xs={1} style={{ margin: 'auto' }}>
                  <p>VS</p>
                </Grid>
                <Grid
                  xs={5}
                  // className="Event2"
                >
                  <img
                    className="tmp"
                    src={`https://i3b309.p.ssafy.io/${
                      Object(productDatas[tmpData.event_item['2'].prod_id - 1])
                        .prod_image
                    }`}
                    style={
                      selectedEvent[tmpData.event_id] ===
                      tmpData.event_item['2'].prod_id
                        ? checkedStyle
                        : null
                    }
                    alt="image2"
                    onClick={() => choiceProduct(tmpData, 2)}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <span>
                      {
                        Object(
                          productDatas[tmpData.event_item['2'].prod_id - 1],
                        ).prod_title
                      }
                    </span>
                    <br />
                    <span style={{ textDecoration: 'line-through' }}>
                      {numberWithCommas(
                        Object(
                          productDatas[tmpData.event_item['2'].prod_id - 1],
                        ).prod_price,
                      )}
                      원 {'  '}
                    </span>

                    <span
                      style={{
                        color: 'red',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        border: '3px solid pink',
                      }}
                    >
                      {
                        Object(
                          productDatas[tmpData.event_item['2'].prod_id - 1],
                        ).prod_sale
                      }
                      %
                    </span>
                    <br />
                    <span>최대 할인 가격</span>
                  </div>
                </Grid>
              </Card>
            </Grid>
          </>
        );
      } else {
        return (
          <>
            {index % 2 === 0 ? (
              <Divider style={{ margin: '0px 0 0px 0' }} />
            ) : null}
            <Grid
              style={{
                display: 'inline-flex',
                background: 'gray',
                padding: '1vh 3vw ',
              }}
            >
              <Card className="Card_align">
                <Grid
                  xs={5}
                  // className="Event1"
                >
                  <img
                    className="tmp"
                    src={`https://i3b309.p.ssafy.io/${
                      Object(productDatas[tmpData.event_item['1'].prod_id - 1])
                        .prod_image
                    }`}
                    style={
                      userCoupon.includes(tmpData.event_item[1].prod_id)
                        ? { border: '3px solid green' }
                        : null
                    }
                    alt="image1"
                    onClick={() => choiceProduct(tmpData, 1)}
                  />
                  <div
                  // style={{ textAlign: 'left' }}
                  >
                    <span>
                      {
                        Object(
                          productDatas[tmpData.event_item['1'].prod_id - 1],
                        ).prod_title
                      }
                    </span>
                    <br />
                    <span style={{ textDecoration: 'line-through' }}>
                      {numberWithCommas(
                        Object(
                          productDatas[tmpData.event_item['1'].prod_id - 1],
                        ).prod_price,
                      )}
                      원 {'  '}
                    </span>

                    <span
                      style={{
                        color: 'red',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        border: '3px solid pink',
                      }}
                    >
                      {
                        Object(
                          productDatas[tmpData.event_item['1'].prod_id - 1],
                        ).prod_sale
                      }
                      %
                    </span>
                    <br />
                    <span>최대 할인 가격</span>
                  </div>
                </Grid>
                <Grid xs={1} style={{ margin: 'auto' }}>
                  <p>VS</p>
                </Grid>
                <Grid
                  xs={5}
                  // className="Event2"
                >
                  <img
                    className="tmp"
                    src={`https://i3b309.p.ssafy.io/${
                      Object(productDatas[tmpData.event_item['2'].prod_id - 1])
                        .prod_image
                    }`}
                    style={
                      userCoupon.includes(tmpData.event_item[2].prod_id)
                        ? { border: '3px solid green' }
                        : null
                    }
                    alt="image2"
                    onClick={() => choiceProduct(tmpData, 2)}
                  />
                  <div
                  // style={{ textAlign: 'left' }}
                  >
                    <span>
                      {
                        Object(
                          productDatas[tmpData.event_item['2'].prod_id - 1],
                        ).prod_title
                      }
                    </span>
                    <br />
                    <span style={{ textDecoration: 'line-through' }}>
                      {numberWithCommas(
                        Object(
                          productDatas[tmpData.event_item['2'].prod_id - 1],
                        ).prod_price,
                      )}
                      원 {'  '}
                    </span>

                    <span
                      style={{
                        color: 'red',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        border: '3px solid pink',
                      }}
                    >
                      {
                        Object(
                          productDatas[tmpData.event_item['2'].prod_id - 1],
                        ).prod_sale
                      }
                      %
                    </span>
                    <br />
                    <span>최대 할인 가격</span>
                  </div>
                </Grid>
              </Card>
            </Grid>
          </>
        );
      }
    } else {
      if (!userEvent.includes(tmpData.event_id)) {
        return (
          <>
            {index % 2 === 0 ? (
              <Divider style={{ margin: '0px 0 0px 0' }} />
            ) : null}

            <Grid
              xs={6}
              style={{
                display: 'inline-flex',
                padding: '1vh 3vw ',
              }}
            >
              <Card className="Card_align">
                <Grid
                  xs={5}
                  // className="Event1"
                >
                  <img
                    className="tmp"
                    src={`https://i3b309.p.ssafy.io/${
                      Object(productDatas[tmpData.event_item['1'].prod_id - 1])
                        .prod_image
                    }`}
                    style={
                      selectedEvent[tmpData.event_id] ===
                      tmpData.event_item['1'].prod_id
                        ? checkedStyle
                        : null
                    }
                    alt="image1"
                    onClick={() => choiceProduct(tmpData, 1)}
                  />
                  <div
                  // style={{ textAlign: 'left' }}
                  >
                    <span>
                      {
                        Object(
                          productDatas[tmpData.event_item['1'].prod_id - 1],
                        ).prod_title
                      }
                    </span>
                    <br />
                    <span style={{ textDecoration: 'line-through' }}>
                      {numberWithCommas(
                        Object(
                          productDatas[tmpData.event_item['1'].prod_id - 1],
                        ).prod_price,
                      )}
                      원 {'  '}
                    </span>

                    <span
                      style={{
                        color: 'red',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        border: '3px solid pink',
                      }}
                    >
                      {
                        Object(
                          productDatas[tmpData.event_item['1'].prod_id - 1],
                        ).prod_sale
                      }
                      %
                    </span>
                    <br />
                    <span>최대 할인 가격</span>
                  </div>
                </Grid>

                <Grid xs={1} style={{ margin: 'auto' }}>
                  <p>VS</p>
                </Grid>
                <Grid
                  xs={5}
                  // className="Event2"
                >
                  <img
                    className="tmp"
                    src={`https://i3b309.p.ssafy.io/${
                      Object(productDatas[tmpData.event_item['2'].prod_id - 1])
                        .prod_image
                    }`}
                    style={
                      selectedEvent[tmpData.event_id] ===
                      tmpData.event_item['2'].prod_id
                        ? checkedStyle
                        : null
                    }
                    alt="image2"
                    onClick={() => choiceProduct(tmpData, 2)}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <span>
                      {
                        Object(
                          productDatas[tmpData.event_item['2'].prod_id - 1],
                        ).prod_title
                      }
                    </span>
                    <br />
                    <span style={{ textDecoration: 'line-through' }}>
                      {numberWithCommas(
                        Object(
                          productDatas[tmpData.event_item['2'].prod_id - 1],
                        ).prod_price,
                      )}
                      원 {'  '}
                    </span>

                    <span
                      style={{
                        color: 'red',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        border: '3px solid pink',
                      }}
                    >
                      {
                        Object(
                          productDatas[tmpData.event_item['2'].prod_id - 1],
                        ).prod_sale
                      }
                      %
                    </span>
                    <br />
                    <span>최대 할인 가격</span>
                  </div>
                </Grid>
              </Card>
            </Grid>
          </>
        );
      } else {
        return (
          <>
            {index % 2 === 0 ? (
              <Divider style={{ margin: '0px 0 0px 0' }} />
            ) : null}
            <Grid
              xs={6}
              style={{
                display: 'inline-flex',
                background: 'gray',
                padding: '1vh 3vw ',
              }}
            >
              <Card className="Card_align">
                <Grid
                  xs={5}
                  // className="Event1"
                >
                  <img
                    className="tmp"
                    src={`https://i3b309.p.ssafy.io/${
                      Object(productDatas[tmpData.event_item['1'].prod_id - 1])
                        .prod_image
                    }`}
                    style={
                      userCoupon.includes(tmpData.event_item[1].prod_id)
                        ? { border: '3px solid green' }
                        : null
                    }
                    alt="image1"
                    onClick={() => choiceProduct(tmpData, 1)}
                  />
                  <div
                  // style={{ textAlign: 'left' }}
                  >
                    <span>
                      {
                        Object(
                          productDatas[tmpData.event_item['1'].prod_id - 1],
                        ).prod_title
                      }
                    </span>
                    <br />
                    <span style={{ textDecoration: 'line-through' }}>
                      {numberWithCommas(
                        Object(
                          productDatas[tmpData.event_item['1'].prod_id - 1],
                        ).prod_price,
                      )}
                      원 {'  '}
                    </span>

                    <span
                      style={{
                        color: 'red',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        border: '3px solid pink',
                      }}
                    >
                      {
                        Object(
                          productDatas[tmpData.event_item['1'].prod_id - 1],
                        ).prod_sale
                      }
                      %
                    </span>
                    <br />
                    <span>최대 할인 가격</span>
                  </div>
                </Grid>
                <Grid xs={1} style={{ margin: 'auto' }}>
                  <p>VS</p>
                </Grid>
                <Grid
                  xs={5}
                  // className="Event2"
                >
                  <img
                    className="tmp"
                    src={`https://i3b309.p.ssafy.io/${
                      Object(productDatas[tmpData.event_item['2'].prod_id - 1])
                        .prod_image
                    }`}
                    style={
                      userCoupon.includes(tmpData.event_item[2].prod_id)
                        ? { border: '3px solid green' }
                        : null
                    }
                    alt="image2"
                    onClick={() => choiceProduct(tmpData, 2)}
                  />
                  <div
                  // style={{ textAlign: 'left' }}
                  >
                    <span>
                      {
                        Object(
                          productDatas[tmpData.event_item['2'].prod_id - 1],
                        ).prod_title
                      }
                    </span>
                    <br />
                    <span style={{ textDecoration: 'line-through' }}>
                      {numberWithCommas(
                        Object(
                          productDatas[tmpData.event_item['2'].prod_id - 1],
                        ).prod_price,
                      )}
                      원 {'  '}
                    </span>

                    <span
                      style={{
                        color: 'red',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        border: '3px solid pink',
                      }}
                    >
                      {
                        Object(
                          productDatas[tmpData.event_item['2'].prod_id - 1],
                        ).prod_sale
                      }
                      %
                    </span>
                    <br />
                    <span>최대 할인 가격</span>
                  </div>
                </Grid>
              </Card>
            </Grid>
          </>
        );
      }
    }
  }

  ///////////////////////////////////////////////////////////////////////
  // SideBar
  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 100,
      // backgroundColor: theme.palette.background.paper,
    },
    // nested: {
    //   paddingLeft: theme.spacing(4),
    // },
  }));
  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  const onClickRedirectPathHandler = name => e => {
    window.scrollTo(0, 0);
    if (user.status === 'login') {
      if (name === '/mainvote') {
        history.push('/');
        // console.log(mainUrl);
      } else {
        history.push(`/${name}`);
      }
    } else {
      alert('로그인 후 이용 가능 합니다.');
      history.push('/auth');
    }
  };

  const NestedList = props => {
    // sidebar 스타일 정의
    const classes = useStyles();

    // *** 사이드 바 내에서 open 기능
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
      setOpen(!open);
    };
    // ***

    return (
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <ListItem
          button
          onClick={user.status === 'login' ? submitCouponData : userNotLogin}
          className="sideBarColumn"
        >
          <ListItemIcon className="sideBarIcon">
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="쿠폰담기" />
        </ListItem>
        <ListItem
          button
          className="sideBarColumn"
          onClick={onClickRedirectPathHandler('mycoupon')}
        >
          <ListItemIcon className="sideBarIcon">
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="쿠폰함" />
        </ListItem>
      </List>
    );
  };
  ///////////////////////////////////////////////////////////////////////

  // console.log(currentEventDatas);
  return (
    <Wrapper>
      <Layout>
        <h3>두 개의 상품중 마음에 드는 상품을 골라가세요</h3>
        <Divider style={{ margin: '0px 0 0px 0' }} />
        <Grid>
          <Grid item style={{ textAlign: 'center', verticalAlign: 'middle' }}>
            {currentEventDatas.map((tmpData, index) =>
              eventGridRender(index, tmpData),
            )}
          </Grid>
          <Grid item className={isMobile ? 'mobileButton' : 'webButton'}>
            <NestedList />
          </Grid>
        </Grid>
      </Layout>
    </Wrapper>
  );
};

export default EventAll;
