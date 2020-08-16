import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  useMediaQuery,
} from '@material-ui/core';

import Layout from '../../layout';
import { CommonContext } from '../../context/CommonContext';
import Button from 'react-bootstrap/Button';

import axios from 'axios';
import QRCode from 'react-qr-code';

const columns = [
  { id: 'coupon_select', label: '상품명', minWidth: 100, align: 'center' },
  {
    id: 'coupon_date',
    label: '쿠폰 발행 일자',
    minWidth: 170,
    align: 'center',
  },
];

function createData(name, code, population, size) {
  // const density = population / size;
  return { name, code, population, size };
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { user } = useContext(CommonContext);
  const { myCouponDatas, setMyCouponDatas } = useContext(CommonContext);
  const { productDatas, setProductDatas } = useContext(CommonContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const isMobile = useMediaQuery('(max-width:930px)');
  return (
    <>
      {console.log(user)}
      <Layout>
        <Grid style={{ display: 'flex' }}>
          <Grid style={{ padding: '20px', margin: '20px' }}>
            <QRCode
              value={`https://i3b309.p.ssafy.io/api/coupon/${user.user_id}`}
            />
          </Grid>
          <Grid
            style={{ padding: '20px', margin: '20px' }}
            container
            justify="center"
            alignItems="center"
          >
            {user.user_quiz ? (
              <Grid>이미 퀴즈 품</Grid>
            ) : (
              <Grid>
                <Grid container justify="center">
                  추가 할인을 받을 수 있습니다.
                </Grid>
                <Grid>
                  <Button>간단한 퀴즈 풀고 추가 할인 받으러 가기</Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {myCouponDatas.length !== 0 ? (
                  myCouponDatas.map(row => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map(column => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {typeof value === 'number'
                                ? Object(productDatas[value - 1]).prod_name
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                ) : (
                  <Grid container alignItems="center" justify="center">
                    발급받은 쿠폰이 없습니다
                  </Grid>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Layout>
    </>
  );
}
