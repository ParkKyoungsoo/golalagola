import React from 'react';
import Card from 'react-bootstrap/Card'
import { Button, Grid, Box } from '@material-ui/core';
import KioskCSS from './styles'

import TmpDatas from '../KioskMain/dump.json';

const SaleItem = ({ match }) => {
  const { itemname } = match.params;
  return (
    <KioskCSS>
      <Grid className="KioskCard">
        <Card style={{ width: '50rem' }, { height: "30rem" }}>
          <Card.Body>
            <Card.Title>
              <h3 align="center" font-weight="bolder">새우깡 <strong>5%</strong> 쿠폰</h3>
            </Card.Title>
            <hr></hr>
            <Card.Text>
              행사의 대략적인 설명 정도???
            </Card.Text>
          </Card.Body>
          <Box display="flex" flexDirection="column" justifyContent="space-around" alignItems="center" margin="1rem" border="1px solid" style={{ width: '20rem' }, { height: "10rem" }}>
            <span>기간 | 2020년 7월 22일 ~ 2020년 8월 15일</span>
            <span>행사 참여 방법 | 방법은 구상 후 입력 요망</span>
            <span>추가 사항 |</span>
          </Box>
          <Button backgroundColor="primary" variant="primary">다른 상품 더보기</Button>
          <Button backgroundColor="primary" variant="primary">상품 위치 보기</Button>
        </Card>
      </Grid>
    </KioskCSS>
  )
};

export default SaleItem