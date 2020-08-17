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
import SearchIcon from '@material-ui/icons/Search';

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
  const isMobile = useMediaQuery('(max-width:930px)');

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
          <AppBar
            style={{
              alignItems: 'center',
            }}
            className="headerColor"
          >
            <Grid
              container
              style={{
                height: '8vh',
                justifyContent: 'center',
              }}
              className="appbar"
            >
              <Grid xs={4} className="navbarCentering">
                <Grid
                  onClick={() => {
                    setDrawerOpen(!drawerOpen);
                  }}
                  // className="menu-button"
                >
                  <h5>
                    <MobileList />
                  </h5>
                </Grid>
              </Grid>
              <Grid
                xs={4}
                className="navbarCentering"
                onClick={() => {
                  setDrawerOpen(0);
                }}
              >
                <Typography
                  variant="h5"
                  onClick={onClickRedirectPathHandler('/mainvote')}
                  style={{
                    backgroundColor: '#f7f2f2',
                  }}
                >
                  <span>Gola la Gola</span>
                </Typography>
              </Grid>
              <Grid xs={4} className="navbarCentering">
                <Grid
                  onClick={() => {
                    setDrawerOpen(0);
                  }}
                  style={{ display: 'flex' }}
                >
                  {successSearchbarTrigger ? <SearchComponent /> : null}
                  <h5 onClick={openSearchbar}>
                    <Search />
                  </h5>
                </Grid>
              </Grid>
            </Grid>
          </AppBar>
        ) : (
          <AppBar
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className="headerColor"
          >
            <Grid
              container
              style={{
                height: '8vh',
              }}
              className="appbar"
            >
              <Grid xs={4} className="navbarCentering">
                <Typography
                  variant="h5"
                  // className="display-none"
                  onClick={onClickRedirectPathHandler('/mainvote')}
                  style={{ cursor: 'pointer' }}
                >
                  Gola la Gola
                </Typography>
              </Grid>
              <Grid xs={4} className="navbarCentering">
                {successSearchbarTrigger ? <SearchComponent /> : null}
                <h4 onClick={openSearchbar} style={{ cursor: 'pointer' }}>
                  <Search />
                </h4>
              </Grid>

              <Grid xs={4} className="navbarCentering">
                <Grid className="navbarCentering" container>
                  <Button
                    variant="contained"
                    onClick={onClickRedirectPathHandler('eventall')}
                    className="header-button headerColor "
                  >
                    <h6 style={{ margin: 'auto' }}>이벤트</h6>
                  </Button>

                  {user.status === 'login' ? (
                    <Button
                      variant="contained"
                      onClick={onClickRedirectPathHandler('mycoupon')}
                      className="header-button headerColor "
                    >
                      <h6 style={{ margin: 'auto' }}>쿠폰</h6>
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
                      <h6 style={{ margin: 'auto' }}>Sign in</h6>
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
