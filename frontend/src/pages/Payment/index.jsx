import React, { useState, useContext } from 'react';
import { Button, TextField } from '@material-ui/core';
import Axios from 'axios';

const Payment = props => {
  const [readCoupon, setReadCoupon] = useState('');
  const readCouponHandler = event => {
    setReadCoupon(event.target.value);
  };
  const onPaymentHandler = async e => {
    Axios.put(readCoupon).then(res => {
      console.log('resresr', res.data);
    });
  };
  return (
    <div>
      <TextField
        required
        className="admin_product_form__input"
        id="standard-required"
        label="상품 제목"
        type="text"
        multiline
        fullWidth={true}
        onChange={readCouponHandler}
      />
      <Button
        variant="contained"
        // disabled={false}
        fullWidth={true}
        color="primary"
        onClick={onPaymentHandler}
        className="grid-item-button"
      >
        결제하기
      </Button>
    </div>
  );
};
export default Payment;
