import React, { useState, useContext } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CommonContext } from '../../context/CommonContext';
import { Grid } from '@material-ui/core';

const MultiCarousel = () => {
  const { productDatas, setProductDatas } = useContext(CommonContext);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={['tablet', 'mobile']}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {productDatas.map((TmpData, index) => (
            <img
              src={`../../${TmpData.prod_image}`}
              alt="Prod_image"
              style={{ width: '150px', height: '150px' }}
            />
          ))}
        </Carousel>
      </Grid>
    </Grid>
  );
};

export default MultiCarousel;
