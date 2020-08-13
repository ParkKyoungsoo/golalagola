import React, { useState, forwardRef, useContext } from 'react';
import { CommonContext } from '../../context/CommonContext';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { Grid, Divider, Paper } from '@material-ui/core';
import MaterialTable from 'material-table';

import Wrapper from './styles';

import NestedList from './Layout/sidebar.jsx';

const MainAdmin = props => {
  return (
    <Wrapper>
      <div className="admin_product__main">
        <Grid container>
          <Grid item>
            <NestedList index={0} />
          </Grid>
          <Grid item>
            <Grid className="admin_product__content">
              <h5 className="admin_product__header">Chart</h5>
              <Divider variant="middle" className="admin_product__divider" />
              <Paper elevation={2}>차트 들어갈 곳</Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Wrapper>
  );
};
export default MainAdmin;
