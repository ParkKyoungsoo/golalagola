import React from 'react';
import { Grid, Paper, Box } from '@material-ui/core';
import Wrapper from './styles';
import Carousel from './carousel'

const KioskPages = () => {
  return (
    <Wrapper>
      <Grid justify="center">
        <Carousel></Carousel>
      </Grid>
    </Wrapper>
  );
};

export default KioskPages
