import React, { useContext } from 'react';
import { CommonContext } from '../../../context/CommonContext';
import { Grid, useMediaQuery } from '@material-ui/core';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import Wrapper from './styles';
import { MdTouchApp } from 'react-icons/md';

const MultiCarousel = () => {
  const { productDatas, serverImgUrl } = useContext(CommonContext);

  const responsive = {
    0: {
      items: 5,
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

  // 1000 단위마다 , 찍어주는 함수입니다. (퍼옴)
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <Wrapper>
      {isMobile ? (
        <Grid>
          <Grid style={{ height: '15vh', display: 'flex' }}>
            <Grid container justify="center" alignItems="center">
              <h1 style={{ color: '#999999' }}>
                화면을 터치하고 할인행사에 참여해 보세요.
              </h1>
              <h1>
                <MdTouchApp size={100} />
              </h1>
            </Grid>
          </Grid>
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
                  key={index}
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
                      src={`${serverImgUrl}/${data.prod_image}`}
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
                        container
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          color: 'red',
                        }}
                      >
                        <p className="fontVerticalMiddle fontMedium">최대</p>
                        &nbsp;&nbsp;
                        <p className="fontVerticalMiddle fontLarge">
                          {data.prod_sale}%
                        </p>
                      </Grid>
                      <Grid
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                      >
                        <p className="fontVerticalMiddle fontMedium fontCancelLine">
                          {numberWithCommas(data.prod_price)}원
                        </p>
                        &nbsp;&nbsp;
                        <p className="fontVerticalMiddle fontLarge">
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
        </Grid>
      ) : (
        <Grid>
          <Grid style={{ height: '15vh', display: 'flex' }}>
            <Grid container justify="center" alignItems="center">
              <h1 style={{ color: '#999999' }}>
                화면을 터치하고 할인행사에 참여해 보세요.
              </h1>
              <h1>
                <MdTouchApp size={100} />
              </h1>
            </Grid>
          </Grid>
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
                  key={index}
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
                      src={`${serverImgUrl}/${data.prod_image}`}
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
                        container
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          color: 'red',
                        }}
                      >
                        <p className="fontVerticalMiddle fontMedium">최대</p>
                        &nbsp;&nbsp;
                        <p className="fontVerticalMiddle fontLarge">
                          {data.prod_sale}%
                        </p>
                      </Grid>
                      <Grid
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                      >
                        <p className="fontVerticalMiddle fontMedium fontCancelLine">
                          {numberWithCommas(data.prod_price)}원
                        </p>
                        &nbsp;&nbsp;
                        <p className="fontVerticalMiddle fontLarge">
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
        </Grid>
      )}
    </Wrapper>
  );
};

export default MultiCarousel;
