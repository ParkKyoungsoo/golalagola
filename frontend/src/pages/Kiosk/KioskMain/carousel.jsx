import React, { useState, useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Grid, Flex } from '@material-ui/core';
import { CommonContext } from '../../../context/CommonContext';
import Badge from 'react-bootstrap/Badge';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Divider } from '@material-ui/core';

const ControlledCarousel = () => {
  const [index, setIndex] = useState(0);
  const { productDatas, currentEventDatas, serverImgUrl } = useContext(
    CommonContext,
  );

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  function numberFormat(inputNumber) {
    return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <>
      <Carousel container activeIndex={index} onSelect={handleSelect}>
        {currentEventDatas.map((Data, index) => (
          <Carousel.Item>
            <Grid container>
              <Grid className="KisokCentering" item xs={6}>
                <div style={{ positin: 'relative' }} className="tmp">
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
                  <Link to={'/KioskQuiz/'}>
                    <img
                      className="tmp"
                      src={`${serverImgUrl}${
                        Object(productDatas[Data.event_item['1'].prod_id - 1])
                          .prod_image
                      }`}
                      alt="image1"
                    />
                  </Link>
                  <Grid style={{ margin: '10px 0 10px 0' }}>
                    {
                      Object(productDatas[Data.event_item['1'].prod_id - 1])
                        .prod_name
                    }
                  </Grid>
                  <Divider />
                  <Grid style={{ color: '#808080' }}>
                    <del>
                      {numberFormat(
                        parseInt(
                          Object(productDatas[Data.event_item['1'].prod_id - 1])
                            .prod_price,
                        ),
                      )}{' '}
                      원
                    </del>
                  </Grid>
                  <Grid>
                    {numberFormat(
                      parseInt(
                        Object(productDatas[Data.event_item['1'].prod_id - 1])
                          .prod_price -
                          (Object(
                            productDatas[Data.event_item['1'].prod_id - 1],
                          ).prod_price *
                            Object(
                              productDatas[Data.event_item['1'].prod_id - 1],
                            ).prod_sale) /
                            100,
                      ),
                    )}{' '}
                    원
                  </Grid>
                  <Grid>
                    {
                      Object(productDatas[Data.event_item['1'].prod_id - 1])
                        .prod_title
                    }
                  </Grid>
                </div>
              </Grid>
              <Grid className="KisokCentering" item xs={6}>
                <div style={{ positin: 'relative' }} className="tmp">
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
                  <Link to={'/KioskQuiz/'}>
                    <img
                      className="tmp"
                      src={`${serverImgUrl}${
                        Object(productDatas[Data.event_item['2'].prod_id - 1])
                          .prod_image
                      }`}
                      alt="image1"
                    />
                  </Link>
                  <Grid style={{ margin: '10px 0 10px 0' }}>
                    {
                      Object(productDatas[Data.event_item['2'].prod_id - 1])
                        .prod_name
                    }
                  </Grid>
                  <Divider />
                  <Grid style={{ color: '#808080' }}>
                    <del>
                      {numberFormat(
                        parseInt(
                          Object(productDatas[Data.event_item['2'].prod_id - 1])
                            .prod_price,
                        ),
                      )}{' '}
                      원
                    </del>
                  </Grid>
                  <Grid>
                    {numberFormat(
                      parseInt(
                        Object(productDatas[Data.event_item['2'].prod_id - 1])
                          .prod_price -
                          (Object(
                            productDatas[Data.event_item['2'].prod_id - 1],
                          ).prod_price *
                            Object(
                              productDatas[Data.event_item['2'].prod_id - 1],
                            ).prod_sale) /
                            100,
                      ),
                    )}{' '}
                    원
                  </Grid>
                  <Grid>
                    {
                      Object(productDatas[Data.event_item['2'].prod_id - 1])
                        .prod_title
                    }
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default ControlledCarousel;
