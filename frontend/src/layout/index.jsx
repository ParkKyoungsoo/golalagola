import React, { useContext, useEffect } from 'react';
import Header from './Header/';
import Footer from './Footer/';
import Drawer from './Drawer/';
import { CommonContext } from '../context/CommonContext';
import { CssBaseline, Container, Grid, useMediaQuery } from '@material-ui/core';
import Wrapper from './styles';

const Layout = props => {
  const { drawerOpen, setDrawerOpen } = useContext(CommonContext);
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
          className={drawerOpen ? 'content p-0' : 'content content-shift p-0'}
          // maxWidth="xl"
          onClick={() => {
            setDrawerOpen(true);
          }}
          // maxWidth="lg"
        >
          <div>{children}</div>
        </Container>
      ) : (
        <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={12}>
            <Container
              className={
                drawerOpen ? 'content p-0' : 'content content-shift p-0'
              }
              maxWidth="xl"
              onClick={() => {
                setDrawerOpen(true);
              }}
              // maxWidth="lg"
            >
              <div>{children}</div>
            </Container>
          </Grid>
        </Grid>
      )}
      {/* <Grid className="footer">{!wannaHide && <Footer />}</Grid> */}
    </Wrapper>
  );
};

export default Layout;
