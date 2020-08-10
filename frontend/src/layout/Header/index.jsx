import React, { useState, useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
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
  const isTablet = useMediaQuery('(max-width:960px)');

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
    history.push('/Auth');
  };

  const onClickRedirectPathHandler = name => e => {
    window.scrollTo(0, 0);
    // if (name === '/SearchVote') {
    //   if (history.location.pathname === name) {
    //     history.goBack();
    //     store.remove('search');
    //   } else {
    //     history.push(name);
    //   }
    if (name === '/MainVote') {
      history.push('/');
      // console.log(mainUrl);
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
        <AppBar
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid
            container
            style={{
              height: '10vh',
              justifyContent: 'center',
            }}
            className="appbar"
          >
            {isTablet ? (
              <Grid className="mobileSearchIcon">
                <Grid className="mobileHome">
                  <Typography
                    variant="h5"
                    className="logo"
                    onClick={onClickRedirectPathHandler('/MainVote')}
                  >
                    <span>Gola la</span>
                    <br />
                    <span>Gola</span>
                  </Typography>
                </Grid>
                <Grid className="mobileSearchIcon">
                  {successSearchbarTrigger ? <SearchComponent /> : null}
                  <h5 className="searchIcon" onClick={openSearchbar}>
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
                  <Grid></Grid>
                  <Grid></Grid>
                  <Grid></Grid>
                </Grid>
              </Grid>
            ) : (
              <>
                <Grid item xs={3} className="navbarCentering">
                  <Typography
                    variant="h5"
                    className="logo"
                    onClick={onClickRedirectPathHandler('/MainVote')}
                  >
                    Gola la Gola
                  </Typography>
                </Grid>

                <Grid item xs={9}>
                  <Grid
                    container
                    style={{
                      height: '10vh',
                    }}
                  >
                    <Grid item xs={7} className="navbarCentering ">
                      {successSearchbarTrigger ? <SearchComponent /> : null}
                      <h3 className="searchIcon " onClick={openSearchbar}>
                        <Search />
                      </h3>
                    </Grid>
                    <Grid item xs={5}>
                      <Grid
                        style={{
                          height: '10vh',
                        }}
                        container
                        className="navbarRight"
                      >
                        {user.status === 'login' ? (
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={onClickRedirectPathHandler('EventAll')}
                            className="display-none header-button"
                          >
                            <h3>
                              <Event />
                            </h3>
                          </Button>
                        ) : null}
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={onClickRedirectPathHandler('MyCoupon')}
                          className="display-none header-button"
                        >
                          <h3>
                            <Coupon />
                          </h3>
                        </Button>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={handleSignInDialogOpen}
                          className="display-none header-button"
                        >
                          {user.status === 'login' ? (
                            <h3>
                              <User />
                            </h3>
                          ) : (
                            <h3>Sign in</h3>
                          )}
                        </Button>
                      </Grid>
                      {/* <Grid container style={{ flexDirection:"column", height:"10vh"}} className="navbarCentering">
                    <Grid ite style={{height:"5vh"}}>
                      <Grid>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={handleSignInDialogOpen}
                          // className="display-none header-button"
                        >
                          {user.status === 'login' ? 'My' : 'Sign In'}
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid item style={{height:"5vh"}}>
                      <Grid container justify="" spacing={2}>
                        <Grid item>
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={onClickRedirectPathHandler('/MainVote')}
                            // className="display-none header-button"
                          >
                            Event
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={onClickRedirectPathHandler('/MainVote')}
                            // className="display-none header-button"
                          >
                            My Coupon
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid> */}
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </AppBar>
      </Wrapper>
      <SignResponsiveDialog />
      <UserResponsiveDialog />
      <VoteDetailResponsiveDialog />
    </Container>
  );
};

export default Header;
