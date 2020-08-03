import React from 'react';
import { Grid, Paper, Box } from '@material-ui/core';
import Layout from '../../layout/';
import Wrapper from './styles';

const MyCoupon = () => {
  return (
    <Layout>
      <Wrapper>
        <Box className="mycoupon-box" variant="outlined">
          <Grid container direction="column" justify="center"></Grid>

          <Grid item>
            <Box className="mycoupon-qrcode" variant="outlined">
              qr코드
            </Box>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={5} container direction="column">
              <h2>A상품</h2>
              <div>
                <img
                  className="kiosk-main-paper-image"
                  src="https://placeimg.com/500/500/any"
                  alt="First slide"
                />
              </div>
              <h4>체크박스</h4>
            </Grid>
            <Grid item xs={1}>
              <h2>VS</h2>
            </Grid>
            <Grid item xs={5} container direction="column">
              <h2>B상품</h2>
              <div>
                <img
                  className="kiosk-main-paper-image"
                  src="https://placeimg.com/500/500/any"
                  alt="First slide"
                />
              </div>
              <h4>체크박스</h4>
            </Grid>
          </Grid>
        </Box>
      </Wrapper>
    </Layout>
  );
};

export default MyCoupon;
