import React, { useState, useContext } from 'react';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
import { CommonContext } from '../../../context/CommonContext';
import { Grid, useMediaQuery } from '@material-ui/core';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';

const MultiCarousel = () => {
  const { productDatas, setProductDatas } = useContext(CommonContext);

  const responsive = {
    0: {
      // breakpoint: { max: 3000, min: 1024 },
      items: 5,
      // slidesToSlide: 3, // optional, default to 1.
    },
    920: {
      // breakpoint: { max: 1024, min: 920 },
      items: 3,
      // slidesToSlide: 1, // optional, default to 1.
    },
    // 2: {
    //   breakpoint: { max: 920, min: 0 },
    //   items: 4,
    //   slidesToSlide: 1, // optional, default to 1.
    // },
  };
  const isMobile = useMediaQuery('(max-width:920px)');
  const handleOnDragStart = e => e.preventDefault();

  // 1000 단위마다 , 찍어주는 함수입니다. (퍼옴)
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

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
              dotsDisabled={false}
              buttonsDisabled={true}
            >
              {productDatas.map((TmpData, index) => (
                <img
                  src={`../../${TmpData.prod_image}`}
                  alt="Prod_image"
                  style={{ width: '100%', height: 'auto' }}
                />
              ))}
            </AliceCarousel>
          </Grid>
        </Grid>
      ) : (
        <Link to={'/KioskQuiz/'}>
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
            {productDatas.map((data, index) => (
              <Grid
                style={{
                  padding: '0 10px',
                  textDecoration: 'none',
                  color: 'black',
                }}
              >
                <div style={{ position: 'relative' }}>
                  <h1>
                    <Badge
                      variant="warning"
                      style={{
                        position: 'absolute',
                        transform: 'rotate(-10deg) translateY(10px)',
                      }}
                    >
                      과다 재고 상품
                    </Badge>
                  </h1>
                  <img
                    src={`https://i3b309.p.ssafy.io/${data.prod_image}`}
                    alt="Prod_image"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '5%',
                    }}
                  />
                  <Grid style={{ padding: '10px 0 0 0' }}>
                    <h5
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: '32vw',
                      }}
                    >
                      {data.prod_title}
                    </h5>
                    <Grid
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        color: 'red',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '1.5vw',
                          fontWeight: '500',
                          margin: 'auto 0',
                        }}
                      >
                        최대
                      </p>
                      &nbsp;&nbsp;
                      <p
                        style={{
                          fontSize: '2vw',
                          fontWeight: 'bold',
                          margin: 'auto 0',
                        }}
                      >
                        {data.prod_sale}%
                      </p>
                    </Grid>
                    <Grid
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <p className="fontVerticalMiddle mobilefontMedium fontCancelLine">
                        {numberWithCommas(data.prod_price)}원
                      </p>
                      &nbsp;&nbsp;
                      <p className="fontVerticalMiddle mobilefontLarge">
                        {numberWithCommas(
                          parseInt(
                            data.prod_price -
                              data.prod_price * (data.prod_sale / 100),
                          ),
                        )}
                        원
                      </p>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            ))}
          </AliceCarousel>
        </Link>
      )}
    </>
  );
};

export default MultiCarousel;
