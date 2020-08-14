import React, { useState, useContext } from 'react';
import { Grid, Divider, useMediaQuery, Button, Link } from '@material-ui/core';
import { CommonContext } from '../../context/CommonContext';
import MultiCarousel from './MultiCarousel';
import { CenterFocusStrong } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const CouponModal = modalNum => {
  const { user, productDatas, setProductDatas } = useContext(CommonContext);
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
      <Grid container direction="column" style={{ display: 'flex' }} xs={12}>
        {/* <Grid>
          <img
            src={`../../${couponPageItem.prod_image}`}
            alt="ItemImage"
            style={{ height: '250px', width: '250px' }}
          />
        </Grid> */}
        <Grid item style={{ textAlign: 'center' }} xs={12}>
          <Grid style={{ marginBottom: '5vh' }}>
            <Grid container direction="column">
              <Grid item style={{ marginTop: '4vh' }}>
                <h3>상품에 대한 쿠폰이 발행되었습니다!</h3>
              </Grid>
              <Grid item style={{ marginTop: '4vh' }}>
                <h3>
                  간단한 퀴즈를 풀고 추가 전체 재고에 대한 할인혜택을 받으세요!
                </h3>
              </Grid>
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
                {user.user_quiz ? (
                  <Button variant="primary" disabled>
                    이미 퀴즈에 참여하였습니다.
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => modalNum.setModalNum(3)}
                    color="primary"
                    disableElevation
                    style={{
                      width: '100%',
                      height: '10vh',
                      fontSize: 'larger',
                    }}
                    disabled={user.user_quiz}
                  >
                    추가 할인 받기
                  </Button>
                )}
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
