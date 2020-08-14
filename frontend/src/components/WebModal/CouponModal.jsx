import React, { useState, useContext } from 'react';
import { Grid, Divider, useMediaQuery, Button, Link } from '@material-ui/core';
import { CommonContext } from '../../context/CommonContext';
import MultiCarousel from './MultiCarousel';
import { CenterFocusStrong } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const CouponModal = modalNum => {
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const { itemDialogOpen, setItemDialogOpen } = useContext(CommonContext);
  const { selectedEventItem, setSelectedEventItem } = useContext(CommonContext);

  const [couponPageItem, setCouponPageItem] = useState(
    productDatas[selectedEventItem - 1],
  );

  const isMobile = useMediaQuery('(max-width:920px)');

  let history = useHistory();

  // const onClickRedirect = () => {
  //   history.push('/mainvote');
  // };

  const onClickRedirect = name => e => {
    window.scrollTo(0, 0);
    setItemDialogOpen(false);
    if (name === '/mainvote') {
      history.push('/');
    } else {
      history.push(`/${name}`);
    }
  };

  return (
    <>
      <Grid
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
        xs={12}
      >
        <Grid
          item
          style={{
            margin: 'auto',
            textAlign: 'center',
          }}
          xs={12}
        >
          <Grid container direction="column" style={{ marginBottom: '4vh' }}>
            <Grid item style={{ marginTop: '4vh' }}>
              <h3>상품에 대한 쿠폰이 발행되었습니다!</h3>
            </Grid>
            <Grid item style={{ marginTop: '4vh' }}>
              <h3>
                간단한 퀴즈를 풀고 추가 전체 재고에 대한 할인혜택을 받으세요!
              </h3>
            </Grid>
          </Grid>

          <Grid
            item
            style={{ justifyContent: CenterFocusStrong, marginBottom: '5vh' }}
          >
            <Grid
              container
              style={{ justifyContent: 'space-evenly' }}
              direction="row"
            >
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => modalNum.setModalNum(3)}
                  color="primary"
                  disableElevation
                  style={{ width: '15vw', height: '10vh', fontSize: 'larger' }}
                  // disabled={selectedEventItem === undefined}
                >
                  추가 할인 받기
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={onClickRedirect('/mainvote')}
                  style={{ width: '15vw', height: '10vh', fontSize: 'larger' }}
                  variant="contained"
                  color="secondary"
                >
                  Home
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ height: '30vh' }}>
            <MultiCarousel style={{ height: '30vh' }} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CouponModal;
