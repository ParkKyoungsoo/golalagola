import React from 'react';
import { Grid } from '@material-ui/core';
// import Testimg from 'public/images/qr.jpg';
import QRCode from 'react-qr-code';
import Wrapper from './styles';
const CouponsQR = () => {
  return (
    <Wrapper>
      <Grid container>
        <Grid item xs={12} style={{ padding: '5vw' }}>
          <Grid style={{ display: 'flex', justifyContent: 'center' }}>
            <QRCode value={`https://i3b309.p.ssafy.io`} />
          </Grid>
        </Grid>
        <Grid>
          <Grid className="sidepadding">
            <h1>이용 안내</h1>
          </Grid>
          <Grid className="sidepadding">
            <h4>1. QR 코드를 스캔합니다.</h4>
            <h4>2. 로그인(회원가입) 진행 후 원하는 상품을 검색합니다.</h4>
            <h4>3. 쿠폰받기 버튼을 클릭합니다.</h4>
            <h4>4. Event 참여 후 쿠폰함의 QR 코드를 결제시 보여주세요.</h4>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default CouponsQR;
