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
import { GiPresent } from 'react-icons/gi';
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
    } else if (name === '/mycoupon') {
      window.location.href = '/mycoupon';
    } else {
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
                height: '5vh',
                justifyContent: 'center',
              }}
              className="appbar"
            >
              <Grid className="mobileSearchIcon">
                <Typography
                  variant="h5"
                  onClick={onClickRedirectPathHandler('/mainvote')}
                  style={{
                    backgroundColor: '#f7f2f2',
                  }}
                >
                  <span>Gola la Gola</span>
                </Typography>
                <Grid
                  onClick={() => {
                    setDrawerOpen(0);
                  }}
                  className="searchIcon"
                >
                  {successSearchbarTrigger ? <SearchComponent /> : null}
                  <h5 onClick={openSearchbar}>
                    <Search />
                  </h5>
                </Grid>
                <Grid
                  container
                  direction="column"
                  justify="space-between"
                  aria-label="open drawer"
                  onClick={() => {
                    setDrawerOpen(!drawerOpen);
                  }}
                  className="menu-button"
                >
                  {/* {console.log(drawerOpen)} */}
                  <Grid
                    style={{
                      backgroundColor: 'black',
                    }}
                  ></Grid>
                  <Grid
                    style={{
                      backgroundColor: 'black',
                    }}
                  ></Grid>
                  <Grid
                    style={{
                      backgroundColor: 'black',
                    }}
                  ></Grid>
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
                height: '5vh',
                // justifyContent: 'flex-end',
              }}
              className="appbar "
            >
              <Grid
                xs={4}
                style={{
                  height: '5vh',
                }}
              >
                <Typography
                  variant="h5"
                  className={'navbarCentering'}
                  // className="display-none"
                  onClick={onClickRedirectPathHandler('/mainvote')}
                  style={{ cursor: 'pointer' }}
                >
                  Gola la Gola
                </Typography>
              </Grid>
              <Grid
                xs={4}
                className="navbarCentering"
                style={{
                  height: '5vh',
                }}
              >
                {successSearchbarTrigger ? <SearchComponent /> : null}
                <h3 onClick={openSearchbar} style={{ cursor: 'pointer' }}>
                  <Search />
                </h3>
              </Grid>

              <Grid
                xs={4}
                style={{
                  height: '5vh',
                }}
              >
                <Grid
                  style={{
                    height: '5vh',
                  }}
                  container
                  className="navbarRight"
                >
                  <Button
                    variant="contained"
                    onClick={onClickRedirectPathHandler('eventall')}
                    className="header-button headerColor"
                  >
                    <h6>이벤트</h6>
                  </Button>

                  {user.status === 'login' ? (
                    <Button
                      variant="contained"
                      onClick={onClickRedirectPathHandler('mycoupon')}
                      className="header-button headerColor"
                    >
                      <h6>쿠폰</h6>
                    </Button>
                  ) : null}
                  <Button
                    variant="contained"
                    onClick={handleSignInDialogOpen}
                    className=" header-button headerColor"
                  >
                    {user.status === 'login' ? (
                      <h3>
                        <User />
                      </h3>
                    ) : (
                      <h6>Sign in</h6>
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
