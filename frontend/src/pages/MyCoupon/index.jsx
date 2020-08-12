import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { Grid } from '@material-ui/core';
import Nav from '../../layout/Header';
import Layout from '../../layout/Header';
import { CommonContext } from '../../context/CommonContext';

import axios from 'axios';
import QRCode from 'react-qr-code';

const columns = [
  { id: 'coupon_select', label: '상품명', minWidth: 100, align: 'center' },
  {
    id: 'coupon_date',
    label: '만료 기간',
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

  return (
    <>
      <Layout />
      <div style={{ textAlign: 'center' }}>
        <QRCode
          value={`https://i3b309.p.ssafy.io/api/coupon/${user.user_id}`}
        />
      </div>
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
              {myCouponDatas.map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
