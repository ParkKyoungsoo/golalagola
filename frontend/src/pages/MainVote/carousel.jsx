import React, { useState, useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Grid, useMediaQuery } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { CommonContext } from '../../context/CommonContext';
import { Wrapper, MobileWrapper } from './styles';
const ControlledCarousel = props => {
  const [index, setIndex] = useState(0);
  const { serverImgUrl } = useContext(CommonContext);
  const isMobile = useMediaQuery('(max-width:960px)');
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  let history = useHistory();

  const moveToEventPage = () => {
    history.push('/eventall');
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
              backgroundColor: '#f2f2f2',
            }}
          >
            <Carousel.Item>
              <Grid container className="Centering ">
                <Grid item className="Centering ">
                  <Grid className="Centering ">
                    <img
                      className="mobiletmp"
                      src={`${serverImgUrl}배너1.jpg`}
                      alt="image2"
                      onClick={moveToEventPage}
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
                      src={`${serverImgUrl}배너2.jpg`}
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
                      src={`${serverImgUrl}배너3.jpg`}
                      alt="image2"
                      onClick={moveToEventPage}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Carousel.Item>
          </Carousel>
        </MobileWrapper>
      ) : (
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          style={{
            backgroundColor: '#f2f2f2',
          }}
        >
          {/* 배너 */}

          <Carousel.Item>
            <Grid container className="Centering ">
              <Grid item className="Centering ">
                <Grid className="Centering ">
                  <img
                    className="tmp"
                    src={`${serverImgUrl}배너1.jpg`}
                    alt="image2"
                    onClick={moveToEventPage}
                    style={{ cursor: 'pointer' }}
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
                    className="tmp"
                    src={`${serverImgUrl}배너2.jpg`}
                    alt="image2"
                    style={{ cursor: 'pointer' }}
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
                    className="tmp"
                    src={`${serverImgUrl}배너3.jpg`}
                    alt="image2"
                    onClick={moveToEventPage}
                    style={{ cursor: 'pointer' }}
                  />
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
