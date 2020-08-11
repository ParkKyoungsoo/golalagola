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
            {currentEventDatas.map((data, index) => (
              <Carousel.Item>
                <Grid container>
                  <Grid item xs={6} className="KisokCentering mobiletmp">
                    <Link
                      className="KisokCentering mobiletmp"
                      to={`voteitemdetail/${
                        Object(productDatas[data.event_item['1'].prod_id - 1])
                          .prod_name
                      }/${
                        Object(productDatas[data.event_item['1'].prod_id - 1])
                          .prod_id
                      }`}
                      // to={`voteitemdetail/${TmpData.event_item['1'].prod_name}/${TmpData.event_item['1'].prod_id}`}
                    >
                      <img
                        className="mobiletmp"
                        src={`https://i3b309.p.ssafy.io/${
                          Object(productDatas[data.event_item['1'].prod_id - 1])
                            .prod_image
                        }`}
                        alt="image1"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={6} className="KisokCentering mobiletmp">
                    <Link
                      className="KisokCentering mobiletmp"
                      to={`voteitemdetail/${
                        Object(productDatas[data.event_item['2'].prod_id - 1])
                          .prod_name
                      }/${
                        Object(productDatas[data.event_item['2'].prod_id - 1])
                          .prod_id
                      }`}
                      // to={`voteitemdetail/${TmpData.event_item['2'].prod_name}/${TmpData.event_item['2'].prod_id}`}
                    >
                      <img
                        className="mobiletmp"
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
          {currentEventDatas.map((data, index) => (
            <Carousel.Item key={index}>
              <Grid container>
                <Grid item xs={6} className="KisokCentering tmp">
                  <Link
                    className="KisokCentering tmp"
                    to={`voteitemdetail/${
                      Object(productDatas[data.event_item['1'].prod_id - 1])
                        .prod_name
                    }/${
                      Object(productDatas[data.event_item['1'].prod_id - 1])
                        .prod_id
                    }`}
                    // to={`voteitemdetail/${TmpData.event_item['1'].prod_name}/${TmpData.event_item['1'].prod_id}`}
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
                <Grid item xs={6} className="KisokCentering tmp">
                  <Link
                    className="KisokCentering tmp"
                    to={`voteitemdetail/${
                      Object(productDatas[data.event_item['2'].prod_id - 1])
                        .prod_name
                    }/${
                      Object(productDatas[data.event_item['2'].prod_id - 1])
                        .prod_id
                    }`}
                    // to={`voteitemdetail/${TmpData.event_item['2'].prod_name}/${TmpData.event_item['2'].prod_id}`}
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
      )}
    </>
  );
};

export default ControlledCarousel;
