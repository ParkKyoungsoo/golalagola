import React, { useContext } from 'react';
import { CommonContext } from '../../context/CommonContext';
import { Grid, useMediaQuery } from '@material-ui/core';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Carousel from 'react-bootstrap/Carousel';

const MultiCarousel = () => {
  const { realtime, serverImgUrl } = useContext(CommonContext);

  const responsive = {
    0: {
      items: 5,
    },
    920: {
      items: 5,
    },
    1024: {
      breakpoint: { max: 920, min: 0 },
      items: 6,
    },
    2000: {
      breakpoint: { max: 920, min: 0 },
      items: 4,
    },
  };
  const isMobile = useMediaQuery('(max-width:920px)');
  return (
    <>
      {isMobile ? (
        <Grid>
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
                  src={`${serverImgUrl}${TmpData.prod_image}`}
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
            <Grid>
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
                      src={`${serverImgUrl}/${TmpData.prod_image}`}
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
