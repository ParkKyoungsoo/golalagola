import React, { useState, useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Grid, Flex } from '@material-ui/core';
import { CommonContext } from '../../../context/CommonContext';
import Badge from 'react-bootstrap/Badge';

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
              <div style={{ positin: 'relative' }}>
                <h1>
                  <Badge variant="warning" style={{ position: 'absolute' }}>
                    최대{' '}
                    {
                      Object(productDatas[Data.event_item['1'].prod_id - 1])
                        .prod_sale
                    }
                    % 할인
                  </Badge>
                </h1>
                <img
                  className="tmp"
                  src={`https://i3b309.p.ssafy.io/${
                    Object(productDatas[Data.event_item['1'].prod_id - 1])
                      .prod_image
                  }`}
                  alt="image1"
                />
                <Grid>
                  {
                    Object(productDatas[Data.event_item['1'].prod_id - 1])
                      .prod_title
                  }
                </Grid>
                <Grid>
                  <del>
                    {
                      Object(productDatas[Data.event_item['1'].prod_id - 1])
                        .prod_price
                    }
                  </del>
                  <h2> → </h2>
                  {parseInt(
                    Object(productDatas[Data.event_item['1'].prod_id - 1])
                      .prod_price -
                      (Object(productDatas[Data.event_item['1'].prod_id - 1])
                        .prod_price *
                        Object(productDatas[Data.event_item['1'].prod_id - 1])
                          .prod_sale) /
                        100,
                  )}
                </Grid>
              </div>
            </Grid>
            <Grid className="KisokCentering" item xs={6}>
              <div style={{ positin: 'relative' }}>
                <h1>
                  <Badge variant="warning" style={{ position: 'absolute' }}>
                    최대{' '}
                    {
                      Object(productDatas[Data.event_item['2'].prod_id - 1])
                        .prod_sale
                    }
                    % 할인
                  </Badge>
                </h1>
                <img
                  className="tmp"
                  src={`https://i3b309.p.ssafy.io/${
                    Object(productDatas[Data.event_item['2'].prod_id - 1])
                      .prod_image
                  }`}
                  alt="image2"
                />
                <Grid>
                  {
                    Object(productDatas[Data.event_item['2'].prod_id - 1])
                      .prod_title
                  }
                </Grid>
                <Grid>
                  <del>
                    {
                      Object(productDatas[Data.event_item['2'].prod_id - 1])
                        .prod_price
                    }
                  </del>
                  <h2> → </h2>
                  {parseInt(
                    Object(productDatas[Data.event_item['2'].prod_id - 1])
                      .prod_price -
                      (Object(productDatas[Data.event_item['2'].prod_id - 1])
                        .prod_price *
                        Object(productDatas[Data.event_item['2'].prod_id - 1])
                          .prod_sale) /
                        100,
                  )}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ControlledCarousel;
