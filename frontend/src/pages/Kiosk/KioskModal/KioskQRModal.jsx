import React from 'react';
import { Grid } from '@material-ui/core';
// import Testimg from 'public/images/qr.jpg';
import QRCode from 'react-qr-code';

const CouponsQR = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid style={{ display: 'flex', justifyContent: 'center' }}>
          <QRCode value={`https://i3b309.p.ssafy.io`} />
        </Grid>
      </Grid>
      <Grid>
        <Grid>
          <h1>이용방법!</h1>
        </Grid>
        <Grid>
          <h3>1. QR코드를 통해 골라라골라 사이트로 접속한다.</h3>
          <h3>2. 회원가입을 한다!</h3>
          <h3>3. 원하는 쿠폰을 담는다.</h3>
          <h3>4. 결제할때 쿠폰함에 있는 QR코드를 보여준다.</h3>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CouponsQR;
