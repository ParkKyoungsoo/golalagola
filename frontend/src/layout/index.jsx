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
            setDrawerOpen(false);
          }}
          // maxWidth="lg"
        >
          <div>{children}</div>
        </Container>
      ) : (
        <Grid container className="Centering">
          <Grid item xs={12}>
            <Container
              className={
                drawerOpen ? ' content p-0' : ' content content-shift p-0'
              }
              maxWidth="xl"
              onClick={() => {
                setDrawerOpen(false);
              }}
              // maxWidth="lg"
            >
              <div>{children}</div>
            </Container>
          </Grid>
        </Grid>
      )}
      <Grid
        className="Centering"
        style={{
          backgroundColor: '#f2f3f4',
        }}
      >
        <Grid item xs={12} md={9} className="footer">
          <Grid item>{!wannaHide && <Footer />}</Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Layout;
