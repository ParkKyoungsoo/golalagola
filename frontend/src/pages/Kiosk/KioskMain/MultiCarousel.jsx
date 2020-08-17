import React, { useState, useContext } from 'react';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
import { CommonContext } from '../../../context/CommonContext';
import { Grid, useMediaQuery } from '@material-ui/core';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Badge from 'react-bootstrap/Badge';

const MultiCarousel = () => {
  const { productDatas, setProductDatas } = useContext(CommonContext);

  const responsive = {
    0: {
      // breakpoint: { max: 3000, min: 1024 },
      items: 5,
      // slidesToSlide: 3, // optional, default to 1.
    },
    920: {
      // breakpoint: { max: 1024, min: 920 },
      items: 4,
      // slidesToSlide: 1, // optional, default to 1.
    },
    // 2: {
    //   breakpoint: { max: 920, min: 0 },
    //   items: 4,
    //   slidesToSlide: 1, // optional, default to 1.
    // },
  };
  const isMobile = useMediaQuery('(max-width:920px)');
  const handleOnDragStart = e => e.preventDefault();
  return (
    <>
      {isMobile ? (
        <Grid container>
          <Grid item xs={12}>
            <AliceCarousel
              responsive={responsive}
              autoPlay={true}
              autoPlayInterval={2000}
              // autoPlayDirection="rtl"
              fadeOutAnimation={true}
              playButtonEnabled={false}
              dotsDisabled={false}
              buttonsDisabled={true}
            >
              {productDatas.map((TmpData, index) => (
                <img
                  src={`../../${TmpData.prod_image}`}
                  alt="Prod_image"
                  style={{ width: '100%', height: 'auto' }}
                />
              ))}
            </AliceCarousel>
          </Grid>
        </Grid>
      ) : (
        <AliceCarousel
          responsive={responsive}
          autoPlay={true}
          autoPlayInterval={2000}
          // autoPlayDirection="rtl"
          fadeOutAnimation={true}
          playButtonEnabled={false}
          dotsDisabled={false}
          buttonsDisabled={true}
          // style={{ width: '100%', height: 'auto' }}
        >
          {productDatas.map((data, index) => (
            <Grid style={{ padding: '0 10px 0 0' }}>
              <div style={{ position: 'relative' }}>
                <h1>
                  <Badge variant="warning" style={{ position: 'absolute' }}>
                    최대 {data.prod_sale}% 할인
                  </Badge>
                </h1>
                <img
                  src={`https://i3b309.p.ssafy.io/${data.prod_image}`}
                  alt="Prod_image"
                  style={{ width: '100%', height: 'auto', borderRadius: '5%' }}
                />
                <Grid>햐햐햐</Grid>
              </div>
            </Grid>
          ))}
        </AliceCarousel>
      )}
    </>
  );
};

export default MultiCarousel;
