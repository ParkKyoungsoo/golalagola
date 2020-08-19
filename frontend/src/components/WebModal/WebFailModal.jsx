import React from 'react';
import { Grid } from '@material-ui/core';
import { CenterFocusStrong } from '@material-ui/icons';

const WebFail = () => {
  return (
    <>
      <Grid container direction="column">
        <Grid item style={{ fontSize: '3vw', fontWeight: '600' }}>
          틀렸어요ㅠㅠ 다시해보세요.
        </Grid>
        <Grid item style={{ justifyContent: CenterFocusStrong }}></Grid>
      </Grid>
    </>
  );
};

export default WebFail;
