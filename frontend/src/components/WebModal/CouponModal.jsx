import React, { useState, useContext } from 'react';
import { Grid, Divider, useMediaQuery, Button } from '@material-ui/core';
import { CommonContext } from '../../context/CommonContext';
import MultiCarousel from './MultiCarousel';
import { CenterFocusStrong } from '@material-ui/icons';

const CouponModal = modalNum => {
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const { itemDialogOpen, setItemDialogOpen } = useContext(CommonContext);
  const { selectedEventItem, setSelectedEventItem } = useContext(CommonContext);

  const [couponPageItem, setCouponPageItem] = useState(
    productDatas[selectedEventItem - 1],
  );

  const isMobile = useMediaQuery('(max-width:920px)');
  return (
    <>
      {/* {console.log(couponPageItem)} */}
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
              <Grid item>
                <h3>상품에 대한 쿠폰이 발행되었습니다!</h3>
              </Grid>
              <Grid item>
                <h3>간단한 퀴즈를 풀고 추가 할인혜택을 받으세요!</h3>
              </Grid>
            </Grid>
          </Grid>

          {/* <Divider /> */}
          {/* <Grid>상품은 상품입니다.</Grid> */}

          {/* <Divider /> */}
          <Grid
            item
            style={{ justifyContent: CenterFocusStrong, marginBottom: '5vh' }}
          >
            <Grid
              container
              style={{ justifyContent: 'space-evenly' }}
              direction="row"
            >
              <Grid item xs={2}>
                <Button
                  onClick={() => modalNum.setModalNum(3)}
                  style={{ width: '15vw', height: '10vh' }}
                  variant="contained"
                  color="primary"
                >
                  퀴즈 풀고 추가 할인 받기
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  onClick={() => setItemDialogOpen(false)}
                  style={{ width: '15vw', height: '10vh' }}
                  variant="contained"
                  color="secondary"
                >
                  창 닫기
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
