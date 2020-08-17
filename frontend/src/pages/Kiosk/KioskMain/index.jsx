import React from 'react';
import { Grid } from '@material-ui/core';
import Wrapper from './styles';
import Carousel from './carousel';
import { Link } from 'react-router-dom';
import Navbar from '../KioskNavbar';
import MultiCarousel from './MultiCarousel';
// React icon 사용하는 방법은 재경이에게 문의하세요

const KioskPages = () => {
  return (
    <>
      <Grid>
        <MultiCarousel />
      </Grid>
    </>
  );
};

export default KioskPages;
