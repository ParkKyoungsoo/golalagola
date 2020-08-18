import React, { useState, useContext } from 'react';
import { Grid, useMediaQuery, Button, Link } from '@material-ui/core';
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
      {isMobile ? (
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
              <Grid
                item
                style={{ marginTop: '4vh', fontSize: '3vw', fontWeight: '300' }}
              >
                상품에 대한 쿠폰이 발행되었습니다!
              </Grid>
              <Grid
                item
                style={{
                  marginTop: '7vh',
                  fontSize: '3.5vw',
                  fontWeight: '700',
                }}
              >
                퀴즈를 풀고{' '}
                <strong style={{ color: 'red', fontSize: '2.5vw' }}>30%</strong>{' '}
                추가 할인을 받아 보세요!
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
                        width: '13vw',
                        height: '7vh',
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
                    style={{ width: '13vw', height: '7vh', fontSize: 'larger' }}
                    variant="contained"
                    color="secondary"
                  >
                    Home
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ height: '30vh', marginTop: '10vh' }}>
              <MultiCarousel style={{ height: '30vh', marginTop: '10vh' }} />
            </Grid>
          </Grid>
        </Grid>
      ) : (
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
              <Grid
                item
                style={{
                  marginTop: '4vh',
                  fontSize: '1.5em',
                  fontWeight: '300',
                }}
              >
                상품에 대한 쿠폰이 발행되었습니다!
              </Grid>
              <Grid
                item
                style={{
                  marginTop: '7vh',
                  fontSize: '1.5em',
                  fontWeight: '700',
                }}
              >
                퀴즈를 풀고{' '}
                <strong style={{ color: 'red', fontSize: '2.5vw' }}>30%</strong>{' '}
                추가 할인을 받아 보세요!
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
                        width: '13vw',
                        height: '7vh',
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
                    style={{ width: '13vw', height: '7vh', fontSize: 'larger' }}
                    variant="contained"
                    color="secondary"
                  >
                    Home
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ height: '30vh', marginTop: '10vh' }}>
              <MultiCarousel style={{ height: '30vh', marginTop: '10vh' }} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CouponModal;
