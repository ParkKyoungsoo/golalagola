import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { CenterFocusStrong } from '@material-ui/icons';

const WebFail = () => {
  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <h2> 틀렸어요ㅠㅠ 다시해보세요.</h2>
        </Grid>
        <Grid item style={{ justifyContent: CenterFocusStrong }}></Grid>
      </Grid>
    </>
  );
};

export default WebFail;
