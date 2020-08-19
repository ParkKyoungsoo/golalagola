import React, { useState } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import Axios from 'axios';

const Payment = props => {
  const [readCoupon, setReadCoupon] = useState('');
  // console.log('readc', readCoupon);

  const readCouponChangeHandler = event => {
    setReadCoupon('');
    setReadCoupon(event.target.value);
  };

  const onPaymentHandler = async e => {
    Axios.put(readCoupon)
      .then(res => {
        console.log('resresr', res.data);
        setReadCoupon('');
      })
      .catch(setReadCoupon(''));
    setReadCoupon('');
    window.location.reload(false);
  };
  return (
    <Grid>
      <input
        style={{ height: '0px', border: '0px' }}
        type="text"
        value={readCoupon}
        onChange={readCouponChangeHandler}
        autoFocus
      ></input>
      <Grid
        container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          height: '95vh',
        }}
      >
        <Grid item xs={11}>
          <Button
            variant="contained"
            // disabled={false}
            fullWidth={true}
            color="primary"
            onClick={onPaymentHandler}
            style={{ height: '80vh' }}
          >
            <h1 style={{ fontSize: '20vw' }}>결제하기</h1>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Payment;
