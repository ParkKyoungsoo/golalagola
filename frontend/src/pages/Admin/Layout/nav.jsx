import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button, Grid } from '@material-ui/core';
import NestedList from './sidebar.jsx';

const AdminNav = props => {
  let history = useHistory();
  const onClickRedirectPathHandler = name => e => {
    window.scrollTo(0, 0);
    if (name === '/MainVote') {
      history.replace('/');
    } else {
      history.replace(`/Admin/${name}`);
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            // className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Button
            color="inherit"
            onClick={onClickRedirectPathHandler('/MainVote')}
          >
            메인페이지
          </Button>
          <Button color="inherit" onClick={onClickRedirectPathHandler('User')}>
            회원관리
          </Button>
          <Button
            color="inherit"
            onClick={onClickRedirectPathHandler('Product')}
          >
            재고관리
          </Button>
          <Button color="inherit" onClick={onClickRedirectPathHandler('VS')}>
            vs 이벤트
          </Button>
          <Button color="inherit" onClick={onClickRedirectPathHandler('Quiz')}>
            퀴즈 이벤트
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item>
          <NestedList />
        </Grid>
      </Grid>
    </div>
  );
};
export default AdminNav;
