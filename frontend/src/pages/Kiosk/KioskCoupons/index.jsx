import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Button, Grid, Box, Dialog, Modal } from '@material-ui/core';
import KioskCSS from './styles';
import { Redirect, RedirectProps } from 'react-router';
import Navbar from '../KioskNavbar';
import CouponsQR from '../KioskModal/KioskQRModal';


const SaleItem = ({ match }) => {

  const [QRModalTrigger, setQRModalTrigger] = useState(false);


  const click = () => {
    console.log('click')
    setQRModalTrigger(QRModalTrigger => true)
  }

  const handleClose = () => {
    setQRModalTrigger(QRModalTrigger => false)
  }

  const [myURL, setMyURL] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("timeout!!");
      setMyURL(true);
    }, 1000000);
  });

  const { itemname } = match.params;
  return (
    <KioskCSS>
      <Navbar />
      <Grid
        className="KioskCard"
      >
        <Card style={{ width: '80rem', height: "40rem", margin: "0px 5px 0px 5px" }}>
          <Card.Body>
            <Card.Title>
              <h3 align="center" font-weight="bolder">재고 상품 <strong>5%</strong> 쿠폰</h3>
            </Card.Title>
            <hr></hr>
            <Card.Text>
              행사의 대략적인 설명 정도???
            </Card.Text>
          </Card.Body>
          <Box className="boxType">
            <span>기간 | 2020년 7월 22일 ~ 2020년 8월 15일</span>
            <span>행사 참여 방법 | 방법은 구상 후 입력 요망</span>
            <span>추가 사항 |</span>
          </Box>
          <Button className="buttonType" backgroundColor="primary" variant="primary" onClick={click}>
            99%할인 행사
          </Button>
        </Card>
        <Dialog
          open={QRModalTrigger}
          onClose={handleClose}
        >
          < CouponsQR />
        </Dialog>
        {myURL ? <Redirect to="/KioskMains" /> : null}
      </Grid>
      {/* ))} */}
    </KioskCSS>
  )
}

export default SaleItem;