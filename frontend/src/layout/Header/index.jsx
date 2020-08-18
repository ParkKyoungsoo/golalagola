import React, { useState, useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import store from 'store';

import { CommonContext } from '../../context/CommonContext';
import SignResponsiveDialog from '../../components/Auth/SignResponsiveDialog/';
import UserResponsiveDialog from '../../components/User/UserResponsiveDialog/';
import VoteDetailResponsiveDialog from '../../components/Main/VoteDetailResponsiveDialog/';
import SearchVote from '../../pages/SearchVote/';
import SearchComponent from '../../components/Search/SearchComponent';

import {
  Grid,
  Typography,
  AppBar,
  Button,
  IconButton,
  useMediaQuery,
  Container,
} from '@material-ui/core';

import Wrapper from './styles';
import { FiUser } from 'react-icons/fi';
import { RiCoupon3Line } from 'react-icons/ri';
import { BsList } from 'react-icons/bs';
import { FiGift } from 'react-icons/fi';
import { BsSearch } from 'react-icons/bs';

const User = () => {
  return <FiUser />;
};
const Coupon = () => {
  return <RiCoupon3Line />;
};
const Event = () => {
  return <FiGift />;
};
const Search = () => {
  return <BsSearch />;
};
const MobileList = () => {
  return <BsList />;
};
const Header = props => {
  let history = useHistory();
  // const isTablet = useMediaQuery('(max-width:960px)');
  const isMobile = useMediaQuery('(max-width:960px)');

  const {
    user,
    drawerOpen,
    setDrawerOpen,
    setSignDialogOpen,
    setUserDetailDialogOpen,
    setInfoDetailDialogOpen,
    mainUrl,
  } = useContext(CommonContext);

  const handleSignInDialogOpen = () => {
    history.push('/auth');
  };

  const onClickRedirectPathHandler = name => e => {
    window.scrollTo(0, 0);

    if (name === '/mainvote') {
      history.push('/');
    }
    // else if (name === 'mycoupon') {
    //   window.location.href = '/mycoupon';
    // }
    else {
      history.push(`/${name}`);
    }
  };

  const [successSearchbarTrigger, setSuccessSearchbarTrigger] = useState(false);

  const openSearchbar = () => {
    if (successSearchbarTrigger === false) {
      setSuccessSearchbarTrigger(successSearchbarTrigger => true);
    } else {
      setSuccessSearchbarTrigger(successSearchbarTrigger => false);
    }
  };

  useEffect(() => {
    setSignDialogOpen(false);
    setDrawerOpen(false);
    setInfoDetailDialogOpen(false);
    setUserDetailDialogOpen(false);
  }, []);

  return (
    <Container
      // className="p-0 "
      maxWidth="lg"
    >
      <Wrapper>
        {isMobile ? (
          <AppBar className="headerColor navbarBoxShdow">
            <Grid container className="appbar headerColor">
              <Grid item xs={4} className="navbarCentering">
                <Grid
                  onClick={() => {
                    setDrawerOpen(!drawerOpen);
                  }}
                  // className="menu-button"
                >
                  <p className="mobileFont">
                    <MobileList />
                  </p>
                </Grid>
              </Grid>
              <Grid
                item
                xs={4}
                className="navbarCentering"
                onClick={() => {
                  setDrawerOpen(0);
                }}
              >
                <Typography
                  variant="p"
                  onClick={onClickRedirectPathHandler('/mainvote')}
                  style={{
                    backgroundColor: '#f2f2f2',
                    cursor: 'pointer',
                  }}
                  className="mobileFont"
                >
                  <span>Gola la Gola</span>
                </Typography>
              </Grid>
              <Grid item xs={4} className="navbarCentering">
                <Grid
                  onClick={() => {
                    setDrawerOpen(0);
                  }}
                  style={{ display: 'flex' }}
                >
                  {successSearchbarTrigger ? <SearchComponent /> : null}
                  <p onClick={openSearchbar} className="mobileFont">
                    <Search />
                  </p>
                </Grid>
              </Grid>
            </Grid>
          </AppBar>
        ) : (
          <AppBar className="headerColor navbarBoxShdow">
            <Grid
              container
              style={{
                height: '8vh',
              }}
              className="appbar"
            >
              <Grid item xs={4} className="navbarCentering">
                <Typography
                  variant="h5"
                  // className="display-none"
                  onClick={onClickRedirectPathHandler('/mainvote')}
                  style={{ cursor: 'pointer' }}
                >
                  Gola la Gola
                </Typography>
              </Grid>
              <Grid item xs={4} className="navbarCentering">
                {successSearchbarTrigger ? <SearchComponent /> : null}
                <h4 onClick={openSearchbar} style={{ cursor: 'pointer' }}>
                  <Search />
                </h4>
              </Grid>

              <Grid item xs={4} className="navbarCentering">
                <Grid className="navbarCentering" container>
                  <Button
                    variant="contained"
                    onClick={onClickRedirectPathHandler('eventall')}
                    className="header-button headerColor "
                  >
                    <h6 style={{ margin: 'auto' }}>VS이벤트</h6>
                  </Button>

                  {user.status === 'login' ? (
                    <Button
                      variant="contained"
                      onClick={onClickRedirectPathHandler('mycoupon')}
                      className="header-button headerColor "
                    >
                      <h6 style={{ margin: 'auto' }}>쿠폰함</h6>
                    </Button>
                  ) : null}
                  <Button
                    variant="contained"
                    onClick={handleSignInDialogOpen}
                    className=" header-button headerColor "
                  >
                    {user.status === 'login' ? (
                      <h4>
                        <User />
                      </h4>
                    ) : (
                      <h6 style={{ margin: 'auto' }}>로그인</h6>
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </AppBar>
        )}
      </Wrapper>
      <SignResponsiveDialog />
      <UserResponsiveDialog />
      <VoteDetailResponsiveDialog />
    </Container>
  );
};

export default Header;
