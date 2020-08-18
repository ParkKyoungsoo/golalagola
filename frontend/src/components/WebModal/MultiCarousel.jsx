import React, { useContext } from 'react';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
import { CommonContext } from '../../context/CommonContext';
import { Grid, useMediaQuery } from '@material-ui/core';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Carousel from 'react-bootstrap/Carousel';

const MultiCarousel = () => {
  const { realtime } = useContext(CommonContext);

  const responsive = {
    0: {
      // breakpoint: { max: 3000, min: 1024 },
      items: 5,
      // slidesToSlide: 3, // optional, default to 1.
    },
    920: {
      // breakpoint: { max: 1024, min: 920 },
      items: 5,
      // slidesToSlide: 1, // optional, default to 1.
    },
    1024: {
      breakpoint: { max: 920, min: 0 },
      items: 6,
      // slidesToSlide: 1, // optional, default to 1.
    },
    2000: {
      breakpoint: { max: 920, min: 0 },
      items: 4,
      // slidesToSlide: 1, // optional, default to 1.
    },
  };
  const isMobile = useMediaQuery('(max-width:920px)');
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
              dotsDisabled={true}
              buttonsDisabled={true}
            >
              {realtime.map((TmpData, index) => (
                <img
                  key={index}
                  src={`https://i3b309.p.ssafy.io/${TmpData.prod_image}`}
                  alt="Prod_image"
                  style={{ width: '100%', height: 'auto' }}
                />
              ))}
            </AliceCarousel>
          </Grid>
        </Grid>
      ) : (
        <Carousel>
          <Carousel.Item>
            <Grid container>
              <Grid item xs={12}>
                <AliceCarousel
                  responsive={responsive}
                  autoPlay={true}
                  autoPlayInterval={2000}
                  // autoPlayDirection="rtl"
                  fadeOutAnimation={true}
                  playButtonEnabled={false}
                  dotsDisabled={true}
                  buttonsDisabled={true}
                  // style={{ width: '100%', height: 'auto' }}
                >
                  {realtime.map((TmpData, index) => (
                    <img
                      key={index}
                      src={`https://i3b309.p.ssafy.io/${TmpData.prod_image}`}
                      alt="Prod_image"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  ))}
                </AliceCarousel>
              </Grid>
            </Grid>
          </Carousel.Item>
        </Carousel>
      )}
    </>
  );
};

export default MultiCarousel;
