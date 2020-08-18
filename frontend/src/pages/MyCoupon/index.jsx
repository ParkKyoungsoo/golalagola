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
  Box,
  Dialog,
  DialogActions,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import Layout from '../../layout';
import { CommonContext } from '../../context/CommonContext';
import Button from 'react-bootstrap/Button';
import { Wrapper, MobileWrapper } from './styles';

import axios from 'axios';
import QRCode from 'react-qr-code';
import QuizModal from '../../components/WebModal/QuizModal';

const QuizDialog = () => {
  const { webQuizDialogOpen, setWebQuizDialogOpen } = useContext(CommonContext);
  const fullScreen = useMediaQuery(theme => theme.breakpoints.down('md'));

  const handleClose = () => {
    setWebQuizDialogOpen(false);
  };

  return (
    <Dialog
      open={webQuizDialogOpen}
      onClose={handleClose}
      // fullScreen={fullScreen}
      aria-labelledby="max-width-dialog-title"
      PaperProps={{
        style: {
          height: '10vh',
          padding: '10px',
          width: '90vw',
          maxWidth: 'none',
          overflowX: 'hidden',
          overflowY: 'auto',
          position: 'inherit',
          width: '80%',
          height: '80%',
          justifyContent: 'center',
        },
      }}
      BackdropProps={{
        style: {
          backgroundColor: 'rgba(0,0,0,0.85)',
        },
      }}
    >
      <DialogActions style={{ padding: 0 }}>
        {/* <Date>
              <span className="date on">{displayEndTime()}</span>
            </Date> */}
        <Grid className="go-back-btn" onClick={handleClose}>
          <ClearIcon
            size="medium"
            style={{ color: '#fff', cursor: 'pointer' }}
          />
        </Grid>
      </DialogActions>
      <QuizModal />
    </Dialog>
  );
};

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
  const { webQuizDialogOpen, setWebQuizDialogOpen } = useContext(CommonContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const QuizDialogOpen = () => {
    setWebQuizDialogOpen(true);
  };

  const isMobile = useMediaQuery('(max-width:960px)');
  return (
    <Layout>
      {isMobile ? (
        //////////////////////////////////////////// 모바일 화면 ////////////////////////////////
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12}>
            <Grid
              style={{
                padding: '5vh 0',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <QRCode
                value={`https://i3b309.p.ssafy.io/api/coupon/${user.user_id}`}
              />
            </Grid>
            <Grid container justify="center" alignItems="center">
              {user.user_quiz ? (
                <Grid container justify="center">
                  <img
                    src="/images/myCouponImage2.png"
                    alt="이미지3"
                    width="100%"
                  ></img>
                </Grid>
              ) : (
                <Grid style={{ padding: '10px 0 20px 0' }}>
                  <Grid>
                    <Button onClick={QuizDialogOpen}>
                      간단한 퀴즈 풀고 추가 할인 받으러 가기
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Paper className={classes.root}>
              <Grid
                container
                style={{
                  display: 'flex',
                  backgroundColor: '#f2f2f2',
                  height: '6vh',
                }}
              >
                <Grid
                  item
                  xs={6}
                  container
                  justify="center"
                  alignItems="center"
                >
                  상품명
                </Grid>
                <Grid
                  item
                  xs={6}
                  container
                  justify="center"
                  alignItems="center"
                >
                  발급 일자
                </Grid>
              </Grid>
            </Paper>

            <Grid style={{ padding: '0 0 100px 0' }}>
              {myCouponDatas.length !== 0 ? (
                myCouponDatas.map((data, index) => {
                  return (
                    <Paper className={classes.root} key={index}>
                      <Grid style={{ display: 'flex', height: '6vh' }}>
                        <Grid
                          item
                          md={6}
                          container
                          justify="center"
                          alignItems="center"
                        >
                          {
                            Object(productDatas[data.coupon_select - 1])
                              .prod_name
                          }
                        </Grid>
                        <Grid
                          item
                          md={6}
                          container
                          justify="center"
                          alignItems="center"
                        >
                          {data.coupon_date}
                        </Grid>
                      </Grid>
                    </Paper>
                  );
                })
              ) : (
                <Grid container alignItems="center" justify="center">
                  발급받은 쿠폰이 없습니다
                </Grid>
              )}
            </Grid>
          </Grid>
          <QuizDialog />
        </Grid>
      ) : (
        //////////////////////////////////////////// 웹 화면 ////////////////////////////////
        <Grid container alignItems="center" justify="center">
          <Grid item md={9}>
            <Grid style={{ display: 'flex' }}>
              <Grid
                style={{ padding: '20px', margin: '20px' }}
                item
                md={6}
                container
                alignItems="center"
                justify="center"
              >
                <QRCode
                  value={`https://i3b309.p.ssafy.io/api/coupon/${user.user_id}`}
                />
              </Grid>
              <Grid container justify="center" alignItems="center">
                {user.user_quiz ? (
                  <Grid container justify="center">
                    <img
                      src="/images/myCouponImage2.png"
                      alt="이미지3"
                      width="100%"
                    ></img>
                  </Grid>
                ) : (
                  <Grid>
                    <Grid container justify="center">
                      <img
                        src="/images/myCouponImage.png"
                        alt="이미지2"
                        width="100%"
                      ></img>
                    </Grid>
                    <Grid
                      container
                      justify="center"
                      style={{ padding: '10px 0 10px 0' }}
                    >
                      <Button onClick={QuizDialogOpen}>
                        간단한 퀴즈 풀고 추가 할인 받으러 가기
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Paper className={classes.root}>
              <Grid
                style={{
                  display: 'flex',
                  backgroundColor: '#f2f2f2',
                  height: '6vh',
                }}
              >
                <Grid
                  item
                  md={6}
                  container
                  justify="center"
                  alignItems="center"
                >
                  상품명
                </Grid>
                <Grid
                  item
                  md={6}
                  container
                  justify="center"
                  alignItems="center"
                >
                  발급 일자
                </Grid>
              </Grid>
            </Paper>

            <Grid style={{ padding: '0 0 100px 0' }}>
              {myCouponDatas.length !== 0 ? (
                myCouponDatas.map((data, index) => {
                  return (
                    <Paper className={classes.root} key={index}>
                      <Grid style={{ display: 'flex', height: '6vh' }}>
                        <Grid
                          item
                          md={6}
                          container
                          justify="center"
                          alignItems="center"
                        >
                          {
                            Object(productDatas[data.coupon_select - 1])
                              .prod_name
                          }
                        </Grid>
                        <Grid
                          item
                          md={6}
                          container
                          justify="center"
                          alignItems="center"
                        >
                          {data.coupon_date}
                        </Grid>
                      </Grid>
                    </Paper>
                  );
                })
              ) : (
                <Grid container alignItems="center" justify="center">
                  발급받은 쿠폰이 없습니다
                </Grid>
              )}
            </Grid>
          </Grid>
          <QuizDialog />
        </Grid>
      )}
    </Layout>
  );
}
