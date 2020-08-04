import React, { useState, useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Grid, Flex } from '@material-ui/core';
import { CommonContext } from '../../../context/CommonContext';

const ControlledCarousel = () => {
  const [index, setIndex] = useState(0);
  const { carouselDatas, setCarouselDatas } = useContext(CommonContext);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel container activeIndex={index} onSelect={handleSelect}>
      {carouselDatas.map((TmpData, index) => (
        <Carousel.Item>
          <Grid container>
            <Grid className="KisokCentering" item xs={6}>
              <img
                className="tmp"
                src={TmpData.event_item['1'].prod_image}
                alt="image1"
              />
            </Grid>
            <Grid className="KisokCentering" item xs={6}>
              <img
                className="tmp"
                src={TmpData.event_item['2'].prod_image}
                alt="image2"
              />
            </Grid>
          </Grid>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ControlledCarousel;
