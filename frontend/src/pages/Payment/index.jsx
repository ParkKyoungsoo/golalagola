import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import Axios from 'axios';

const Payment = props => {
  const [readCoupon, setReadCoupon] = useState('');

  const readCouponChangeHandler = event => {
    console.log(event.target.value);
    setReadCoupon(event.target.value);
    console.log('readCoupon', readCoupon);
  };

  const onPaymentHandler = async e => {
    Axios.put(readCoupon).then(res => {
      console.log('resresr', res.data);
    });
  };
  return (
    <div>
      <input
        style={{ height: '0px', border: '0px' }}
        type="text"
        onChange={readCouponChangeHandler}
        autoFocus
      ></input>

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
