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
    <Layout>
      <Grid style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid xs={12} md={9}>
          <Grid style={{ textAlign: 'center' }}>
            <QRCode
              value={`https://i3b309.p.ssafy.io/api/coupon/${user.user_id}`}
            />
          </Grid>
          {user.user_quiz ? (
            <Grid>이미 퀴즈를 풀었네?</Grid>
          ) : (
            <Grid>퀴즈풀면 할인 더 해줌</Grid>
          )}
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
                    <Grid>발급받은 쿠폰이 없습니다</Grid>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}
