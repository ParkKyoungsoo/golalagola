import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import MyInfo from './../MyInfo/';
import ChangePassword from './../ChangePassword/';
import { CommonContext } from '../../../context/CommonContext';

import axios from 'axios';

import {
  useMediaQuery,
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
} from '@material-ui/core';
import Wrapper from './styles';

function TabPanel(props) {
  const { value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>{props && props.children ? props.children : ''}</Box>
      )}
    </Typography>
  );
}

// TabPanel.propTypes = {
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  let history = useHistory();
  const fullScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const {
    user,
    userDialogIndex,
    setUserDialogIndex,
    setDrawerOpen,
    setUser,
    setMyCouponDatas,
    setUserDetailDialogOpen,
  } = useContext(CommonContext);
  const labels = ['회원정보 수정', '비밀번호 변경', '회원 탈퇴'];
  const handleChange = (event, newValue) => {
    setUserDialogIndex(newValue);
  };
  const onClickSignOutOpenHandler = () => {
    // console.log('user', user);
    let flag = window.confirm('정말 탈퇴하시겠습니까?');

    if (flag) {
      axios({
        method: 'DELETE',
        url: 'https://i3b309.p.ssafy.io/api/auth/self',
        headers: {
          token: user.token,
          user_email: user.user_email,
        },
        data: {
          user_id: user.user_id,
        },
      })
        .then(res => {
          alert('삭제되었습니다.');
          setDrawerOpen(false);
          setUser({
            user_id: 0,
            user_email: '',
            user_name: '',
            user_phone: '',
            user_pwd: '',
            user_image: '',
            user_quiz: '',
            isAdmin: '',
            status: '',
            web_site: '',
            token: '',
            quiz_useCoupon: '',
          });
          setUserDialogIndex(0);
          setMyCouponDatas([]);
        })
        .catch(err => {
          alert('회원 탈퇴에 실패하셨습니다.');
        });
    } else {
      alert('취소하였습니다.');
    }
    setUserDetailDialogOpen(false);
    history.push('/');
  };

  return (
    <Wrapper className="root">
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={userDialogIndex}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className="tabs"
        classes={{ indicator: 'bigIndicator' }}
        style={{ paddingTop: 32 }}
      >
        {labels.map((x, index) => {
          return (
            !fullScreen &&
            (x === '회원 탈퇴' ? (
              <Tab
                key={index}
                label={x}
                style={{ opacity: 1, marginTop: 20 }}
                onClick={onClickSignOutOpenHandler}
                {...a11yProps(index)}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className="sign-out-btn"
                >
                  {x}
                </Button>
              </Tab>
            ) : (
              <Tab
                key={index}
                label={x}
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  fontFamily: 'Noto Sans KR',
                  lineHeight: '22px',
                  color: index === userDialogIndex ? '#4248b5' : '#3c3c3c',
                }}
                {...a11yProps(index)}
              />
            ))
          );
        })}
      </Tabs>

      <TabPanel value={userDialogIndex} index={0} className="profile info">
        <MyInfo />
      </TabPanel>
      <TabPanel value={userDialogIndex} index={1} className="password info">
        <ChangePassword />
      </TabPanel>
      <TabPanel value={userDialogIndex} index={2} className="test"></TabPanel>
    </Wrapper>
  );
}
