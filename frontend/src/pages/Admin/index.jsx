import React, { useState, useEffect, useContext } from 'react';

import AdminNav from './Layout/nav.jsx';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// Grid Styles
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const MainAdmin = props => {
  const classes = useStyles(); // Grid
  return (
    <div>
      <AdminNav></AdminNav>
      <h1>관리자 페이지</h1>
      <div classes={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Paper className={classes.paper}></Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper className={classes.paper}>오늘의 날씨는~</Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default MainAdmin;
