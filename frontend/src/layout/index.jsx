import React, { useContext, useEffect } from 'react';
import Header from './Header/';
import Footer from './Footer/';
import Drawer from './Drawer/';
import { CommonContext } from '../context/CommonContext';
import { CssBaseline, Container, Grid } from '@material-ui/core';
import Wrapper from './styles';

const Layout = props => {
  const { drawerOpen, setDrawerOpen } = useContext(CommonContext);
  const { wannaHide, children } = props;
  useEffect(() => {
    setDrawerOpen(false);
  }, []);
  return (
    <Wrapper>
      <CssBaseline />
      <Drawer />
      {!wannaHide && <Header maxWidth="lg" />}
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
      {/* <Grid className="footer">{!wannaHide && <Footer />}</Grid> */}
    </Wrapper>
  );
};

export default Layout;
