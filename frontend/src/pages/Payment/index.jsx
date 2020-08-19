import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import Axios from 'axios';

const Payment = props => {
  const [readCoupon, setReadCoupon] = useState('');
  console.log('readc', readCoupon);

  const readCouponChangeHandler = event => {
    setReadCoupon('');
    console.log(event.target.value);
    setReadCoupon(event.target.value);
  };

  const onPaymentHandler = async e => {
    console.log('sss', readCoupon);
    setReadCoupon('');
    Axios.put(readCoupon)
      .then(res => {
        console.log('resresr', res.data);
        setReadCoupon('');
      })
      .catch(setReadCoupon(''));
  };
  return (
    <div>
      <input
        // style={{ height: '0px', border: '0px' }}
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
