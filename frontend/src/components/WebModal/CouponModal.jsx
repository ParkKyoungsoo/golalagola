import React, { useState, useContext } from 'react';
import { Grid, Divider, useMediaQuery } from '@material-ui/core';
import { CommonContext } from '../../context/CommonContext';

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
      <Grid style={{ display: 'flex' }}>
        <Grid>
          <img
            src={`../../${couponPageItem.prod_image}`}
            alt="ItemImage"
            style={{ height: '250px', width: '250px' }}
          />
        </Grid>
        <Grid>
          <Grid>{couponPageItem.prod_name}에 대한 쿠폰이 발행되었습니다!</Grid>

          <Divider />
          <Grid>상품은 상품입니다.</Grid>

          <Divider />
          <Grid>
            <button onClick={() => modalNum.setModalNum(3)}>
              퀴즈 풀고 추가 할인 받기
            </button>
            <button onClick={() => setItemDialogOpen(false)}>창 닫기</button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CouponModal;
