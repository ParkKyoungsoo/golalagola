import React, { useContext, useEffect } from 'react';
import Header from './Header/';
import Footer from './Footer/';
import Drawer from './Drawer/';
import { CommonContext } from '../context/CommonContext';
import { CssBaseline, Container, Grid, useMediaQuery } from '@material-ui/core';
import Wrapper from './styles';
// import EventSideBar from '../pages/EventAll/sidebar';
const Layout = props => {
  const { drawerOpen, setDrawerOpen, mainUrl } = useContext(CommonContext);
  const { wannaHide, children } = props;
  useEffect(() => {
    setDrawerOpen(false);
  }, []);

  const isMobile = useMediaQuery('(max-width:920px)');
  return (
    <Wrapper>
      <CssBaseline />
      <Drawer />
      {!wannaHide && <Header maxWidth="lg" />}
      {isMobile ? (
        <Container
          open={drawerOpen}
          className={drawerOpen ? 'content p-0' : 'content content-shift p-0'}
          maxWidth="xl"
          onClick={() => {
            setDrawerOpen(0);
          }}
          // maxWidth="lg"
        >
          <div>{children}</div>
        </Container>
      ) : (
        <Grid
          container
          style={
            window.location.href === `${mainUrl}/eventall`
              ? { justifyContent: 'flex-end' }
              : { justifyContent: 'center' }
          }
        >
          <Grid xs={12} md={10}>
            <Container
              open={drawerOpen}
              className={
                drawerOpen ? 'content p-0' : 'content content-shift p-0'
              }
              maxWidth="xl"
              onClick={() => {
                setDrawerOpen(0);
              }}
              // maxWidth="lg"
            >
              <div>{children}</div>
            </Container>
          </Grid>
          {window.location.href === `${mainUrl}/eventall` ? (
            <Grid md={1}>
              {mainUrl}
              {/* <EventSideBar /> */}
            </Grid>
          ) : null}
        </Grid>
      )}
      {/* <Grid className="footer">{!wannaHide && <Footer />}</Grid> */}
    </Wrapper>
  );
};

export default Layout;
