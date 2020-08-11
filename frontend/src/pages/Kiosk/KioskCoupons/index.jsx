import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Grid, Box, Dialog, Modal } from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import KioskCSS from './styles';
import { Redirect, RedirectProps } from 'react-router';
import Navbar from '../KioskNavbar';
import CouponsQR from '../KioskModal/KioskQRModal';

const SaleItem = ({ match }) => {
  const [QRModalTrigger, setQRModalTrigger] = useState(false);

  const click = () => {
    console.log('click');
    setQRModalTrigger(QRModalTrigger => true);
  };

  const handleClose = () => {
    setQRModalTrigger(QRModalTrigger => false);
  };

  const [myURL, setMyURL] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('timeout!!');
      setMyURL(true);
    }, 1000000);
  });

  const { itemname } = match.params;
  return (
    <>
      <KioskCSS>
        <Navbar />
        <Grid className="KioskCard">
          <Card
            style={{
              width: '80rem',
              height: '40rem',
              margin: '0px 5px 0px 5px',
            }}
          >
            <Card.Body>
              <Card.Title>
                <h3 align="center" fontWeight="bolder">
                  재고 상품 <strong>5%</strong> 쿠폰
                </h3>
              </Card.Title>
              <hr></hr>
              <Grid style={{ display: 'flex' }}>
                <Grid
                  item
                  xs={3}
                  style={{ border: '1px solid black', borderRadius: '10px' }}
                >
                  11
                </Grid>
                <Grid
                  item
                  xs={7}
                  style={{ border: '1px solid black', borderRadius: '10px' }}
                >
                  22
                </Grid>
              </Grid>
            </Card.Body>
            <Box className="boxType">
              <Grid style={{ display: 'flex' }}>
                <Grid
                  style={{
                    border: '1px solid #000099',
                    borderRadius: '15px',
                    width: '170px',
                    height: '50px',
                    backgroundColor: '#000099',
                    color: 'white',
                    fontSize: '25px',
                  }}
                  container
                  alignItems="center"
                  justify="center"
                >
                  이용 방법
                </Grid>
                <Grid
                  style={{
                    height: '50px',
                    fontSize: '25px',
                  }}
                  container
                  alignItems="center"
                  justify="center"
                >
                  '쿠폰출력하기' 버튼을 누른후 쿠폰 받기
                </Grid>
              </Grid>
              <Button variant="warning" size="lg">
                추가 할인 받으러 가기
              </Button>
            </Box>
            <Button className="buttonType" variant="primary" onClick={click}>
              99%할인 행사
            </Button>
          </Card>
          <Dialog open={QRModalTrigger} onClose={handleClose}>
            <CouponsQR />
          </Dialog>
          {myURL ? <Redirect to="/KioskMains" /> : null}
        </Grid>
      </KioskCSS>
    </>
  );
};

export default SaleItem;
