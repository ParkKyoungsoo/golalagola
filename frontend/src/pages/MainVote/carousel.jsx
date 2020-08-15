import React, { useState, useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Grid, useMediaQuery } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { CommonContext } from '../../context/CommonContext';
import { Wrapper, MobileWrapper } from './styles';
const ControlledCarousel = props => {
  const [index, setIndex] = useState(0);
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const { currentEventDatas, setCurrentEventDatas } = useContext(CommonContext);
  const isMobile = useMediaQuery('(max-width:930px)');
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      {isMobile ? (
        <MobileWrapper>
          <Carousel
            container
            activeIndex={index}
            onSelect={handleSelect}
            style={{
              backgroundColor: '#f7f2f2',
            }}
          >
            <Carousel.Item>
              <Grid container className="Centering ">
                <Grid item className="Centering ">
                  <Grid className="Centering ">
                    <img
                      className="mobiletmp"
                      src="images/배너너너너너.jpg"
                      alt="image2"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Carousel.Item>
            <Carousel.Item>
              <Grid container className="Centering ">
                <Grid item className="Centering ">
                  <Grid className="Centering ">
                    <img
                      className="mobiletmp"
                      src="images/과다.jpg"
                      alt="image2"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Carousel.Item>
          </Carousel>
        </MobileWrapper>
      ) : (
        <Carousel
          container
          activeIndex={index}
          onSelect={handleSelect}
          style={{
            backgroundColor: '#f7f2f2',
          }}
        >
          {/* 배너 */}

          <Carousel.Item>
            <Grid container className="Centering ">
              <Grid item className="Centering ">
                <Grid className="Centering ">
                  <img
                    className="tmp"
                    src="images/배너너너너너.jpg"
                    alt="image2"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Carousel.Item>
          <Carousel.Item>
            <Grid container className="Centering ">
              <Grid item className="Centering ">
                <Grid className="Centering ">
                  <img className="tmp" src="images/과다.jpg" alt="image2" />
                </Grid>
              </Grid>
            </Grid>
          </Carousel.Item>
        </Carousel>
      )}
    </>
  );
};

export default ControlledCarousel;
