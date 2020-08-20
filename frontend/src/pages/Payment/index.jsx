import React, { useState, useEffect, useContext } from 'react';
import { Button, TextField, Grid, Dialog } from '@material-ui/core';
import { CommonContext } from '../../context/CommonContext';
import Axios from 'axios';

const Tmp = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.reload(false);
    }, 1500);
  });

  return <h2>결제되었습니다.</h2>;
};

const Payment = props => {
  const [readCoupon, setReadCoupon] = useState('');
  const { user, eventListener, setEventListener, serverUrl } = useContext(
    CommonContext,
  );
  // console.log('readc', readCoupon);

  const [tmpDialogHandler, setTmpDialogHandler] = useState(false);

  const readCouponChangeHandler = event => {
    setReadCoupon('');
    setReadCoupon(event.target.value);
  };

  const onPaymentHandler = async e => {
    var vsCoupon = 'https://i3b309.p.ssafy.io/api/payment/vs/' + readCoupon;
    var quizCoupon = 'https://i3b309.p.ssafy.io/api/payment/quiz/' + readCoupon;
    if (user.user_quiz && !user.quiz_useCoupon) {
      Axios.put(quizCoupon).then(res => {
        // console.log('resresr', res.data);
        setEventListener(eventListener => eventListener + 1);
      });
    }

    Axios.put(vsCoupon)
      .then(res => {
        // console.log('resresr', res.data);
        setReadCoupon('');
        setTmpDialogHandler(true);
        setEventListener(eventListener => eventListener + 1);
      })
      .catch(setReadCoupon(''));
    setReadCoupon('');
  };

  const handler = () => {
    setTmpDialogHandler(false);
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
      <Dialog open={tmpDialogHandler} onClose={handler}>
        <Tmp />
      </Dialog>
    </Grid>
  );
};
export default Payment;
