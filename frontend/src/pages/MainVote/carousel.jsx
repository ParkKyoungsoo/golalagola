import React, { useState, useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { CommonContext } from '../../context/CommonContext';

const ControlledCarousel = props => {
  const [index, setIndex] = useState(0);
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const { currentEventDatas, setCurrentEventDatas } = useContext(CommonContext);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel container activeIndex={index} onSelect={handleSelect}>
      {currentEventDatas.map((data, index) => (
        <Carousel.Item>
          <Grid container>
            <Grid item xs={6}>
              <Link
                className="KisokCentering"
                to={`VoteItemDetail/${
                  Object(productDatas[data.event_item['1'].prod_id - 1])
                    .prod_name
                }/${
                  Object(productDatas[data.event_item['1'].prod_id - 1]).prod_id
                }`}
                // to={`VoteItemDetail/${TmpData.event_item['1'].prod_name}/${TmpData.event_item['1'].prod_id}`}
              >
                <img
                  className="tmp"
                  src={`https://i3b309.p.ssafy.io/${
                    Object(productDatas[data.event_item['1'].prod_id - 1])
                      .prod_image
                  }`}
                  alt="image1"
                />
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link
                className="KisokCentering"
                to={`VoteItemDetail/${
                  Object(productDatas[data.event_item['2'].prod_id - 1])
                    .prod_name
                }/${
                  Object(productDatas[data.event_item['2'].prod_id - 1]).prod_id
                }`}
                // to={`VoteItemDetail/${TmpData.event_item['2'].prod_name}/${TmpData.event_item['2'].prod_id}`}
              >
                <img
                  className="tmp"
                  src={`https://i3b309.p.ssafy.io/${
                    Object(productDatas[data.event_item['2'].prod_id - 1])
                      .prod_image
                  }`}
                  alt="image2"
                />
              </Link>
            </Grid>
          </Grid>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ControlledCarousel;
