import React, { useState, useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Grid, Flex } from '@material-ui/core';
import { CommonContext } from '../../../context/CommonContext';

const ControlledCarousel = () => {
  const [index, setIndex] = useState(0);
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const { currentEventDatas, setCurrentEventDatas } = useContext(CommonContext);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel container activeIndex={index} onSelect={handleSelect}>
      {currentEventDatas.map((Data, index) => (
        <Carousel.Item>
          <Grid container>
            <Grid className="KisokCentering" item xs={6}>
              <img
                className="tmp"
                src={`https://i3b309.p.ssafy.io/${
                  Object(productDatas[Data.event_item['1'].prod_id - 1])
                    .prod_image
                }`}
                alt="image1"
              />
            </Grid>
            <Grid className="KisokCentering" item xs={6}>
              <img
                className="tmp"
                src={`https://i3b309.p.ssafy.io/${
                  Object(productDatas[Data.event_item['2'].prod_id - 1])
                    .prod_image
                }`}
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
