import React from 'react';
import { Grid } from '@material-ui/core';
import Layout from '../../layout';

import Wrapper from './styles';
const AboutMe = () => {
  return (
    <Layout>
      <Wrapper>
        <Grid className="about-me">
          <h2>개발자들</h2>

          <Grid container>
            <Grid item xs={12} md={4}>
              <Grid className="picture"></Grid>
              <h3>구준모</h3>
              <Grid container justify="center" className="info">
                <Grid item className="phone">
                  +82 10 0000 0000
                </Grid>
                <Grid item className="email">
                  jeni_lee@gmail.com
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid className="picture"></Grid>
              <h3>김용욱</h3>
              <Grid container justify="center" className="info">
                <Grid item className="phone">
                  +82 10 0000 0000
                </Grid>
                <Grid item className="email">
                  jeni_lee@gmail.com
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid className="picture"></Grid>
              <h3>김재경</h3>
              <Grid container justify="center" className="info">
                <Grid item className="phone">
                  +82 10 0000 0000
                </Grid>
                <Grid item className="email">
                  jeni_lee@gmail.com
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={4}>
              <Grid className="picture"></Grid>
              <h3>박경수</h3>
              <Grid container justify="center" className="info">
                <Grid item className="phone">
                  +82 10 0000 0000
                </Grid>
                <Grid item className="email">
                  jeni_lee@gmail.com
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid className="picture"></Grid>
              <h3>변찬석</h3>
              <Grid container justify="center" className="info">
                <Grid item className="phone">
                  +82 10 0000 0000
                </Grid>
                <Grid item className="email">
                  jeni_lee@gmail.com
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid className="picture"></Grid>
              <h3>안성호</h3>
              <Grid container justify="center" className="info">
                <Grid item className="phone">
                  +82 10 0000 0000
                </Grid>
                <Grid item className="email">
                  jeni_lee@gmail.com
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* <h2>WHAT I DO</h2>
          <Grid container className="license">
            <Grid item xs={12} md={4}>
              <Grid className="license-img">
                <img src="/images/about_me_img_3.png" alt="license_img" />
              </Grid>
              <h2>MOBILE APPS</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim
              </p>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid className="license-img">
                <img src="/images/about_me_img_4.png" alt="license_img" />
              </Grid>
              <h2>WEB DESIGN</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim
              </p>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid className="license-img">
                <img src="/images/about_me_img_5.png" alt="license_img" />
              </Grid>
              <h2>UXUI DESIGN</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim
              </p>
            </Grid>
          </Grid> */}
        </Grid>
      </Wrapper>
    </Layout>
  );
};

export default AboutMe;
