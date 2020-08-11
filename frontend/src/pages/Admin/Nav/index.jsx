import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';

const AdminNav = props => {
  let history = useHistory();
  const onClickRedirectPathHandler = name => e => {
    window.scrollTo(0, 0);
    if (name === '/MainVote') {
      // console.log('s');
      history.push('/');
    } else {
      // console.log(`/Admin/${name}`);
      history.push(`/Admin/${name}`);
    }
  };

  return (
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
        <Button color="inherit" onClick={onClickRedirectPathHandler('VS')}>
          vs 이벤트
        </Button>
        <Button color="inherit" onClick={onClickRedirectPathHandler('Quiz')}>
          퀴즈 이벤트
        </Button>
        <Button color="inherit" onClick={onClickRedirectPathHandler('User')}>
          회원정보
        </Button>
      </Toolbar>
    </AppBar>
  );
};
export default AdminNav;
