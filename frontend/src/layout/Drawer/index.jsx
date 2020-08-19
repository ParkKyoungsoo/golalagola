import React, { useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { CommonContext } from '../../context/CommonContext';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import {
  Button,
  Grid,
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';

import Wrapper from './styles';
import store from 'store';

const DrawerHeaderGroup = () => {
  let history = useHistory();
  const { setDrawerOpen, user, setUser } = useContext(CommonContext);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const onClickRedirectPathHandler = name => () => {
    setDrawerOpen(false);
    history.push(name);
  };

  const handleSignInDialogOpen = () => {
    setUser({
      user_no: 0,
      user_id: '',
      user_nm: '',
      user_pwd: '',
      user_img_url: '',
      status: '',
      web_site: '',
      token: '',
    });

    history.push('/Auth');
  };

  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item onClick={handleDrawerClose}>
        {user.status ? (
          <Fragment>
            <Button
              variant="outlined"
              className="up-cancel-fab"
              onClick={handleSignInDialogOpen}
            >
              로그아웃
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Button
              variant="outlined"
              className="up-cancel-fab"
              onClick={handleSignInDialogOpen}
            >
              로그인
            </Button>
          </Fragment>
        )}
      </Grid>
    </Grid>
  );
};

const DrawerListGroup = () => {
  let history = useHistory();
  const {
    user,
    setUser,
    setUserDetailDialogOpen,
    setUserDialogIndex,
    setDrawerOpen,
  } = useContext(CommonContext);

  const onClickEditProfileOpenHandler = () => {
    setDrawerOpen(false);
    setUserDialogIndex(0);
    setUserDetailDialogOpen(true);
  };

  const onClickChangePasswordOpenHandler = () => {
    setDrawerOpen(false);
    setUserDialogIndex(1);
    setUserDetailDialogOpen(true);
  };

  const onClickSignOutOpenHandler = () => {
    store.clear();
    setDrawerOpen(false);
    setUser({
      user_no: 0,
      user_id: '',
      user_nm: '',
      user_pwd: '',
      user_img_url: '',
      status: '',
      web_site: '',
      token: '',
    });

    alert('로그아웃 하셨습니다..');
    window.location.href = '/';
  };

  const onClickRedirectPathHandler = name => () => {
    setDrawerOpen(false);
    window.scrollTo(0, 0);
    history.push(name);
  };

  return (
    <>
      <List className="drawer-list-group-list">
        {user.status && (
          <Fragment>
            <ListItem button key={'내정보'} className="bg-unset">
              <Accordion className="panel">
                <AccordionSummary
                  className="panel-summary"
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Avatar
                    alt="profile picture"
                    src={`https://picsum.photos/id/82/200/300.webp`}
                    className="avatar"
                  />
                  <ListItemText
                    primary={'내정보'}
                    disableTypography
                    className="list-item"
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <List className="expansion-panel">
                    <ListItem
                      button
                      key={'회원정보 수정'}
                      onClick={onClickEditProfileOpenHandler}
                    >
                      <ListItemText
                        primary={'회원정보 수정'}
                        disableTypography
                      />
                    </ListItem>
                    <ListItem
                      button
                      key={'비밀번호 수정'}
                      onClick={onClickChangePasswordOpenHandler}
                    >
                      <ListItemText
                        primary={'비밀번호 수정'}
                        disableTypography
                      />
                    </ListItem>
                    <ListItem button key={'로그아웃'}>
                      <ListItemText
                        primary={'로그아웃'}
                        disableTypography
                        className="list-item"
                        onClick={onClickSignOutOpenHandler}
                      />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            </ListItem>
            <ListItem
              button
              key={'쿠폰함'}
              onClick={onClickRedirectPathHandler('/mycoupon')}
            >
              <ListItemText primary={'쿠폰함'} disableTypography />
              <InboxIcon />
            </ListItem>
          </Fragment>
        )}
        <ListItem
          button
          key={'VS이벤트'}
          onClick={onClickRedirectPathHandler('/eventall')}
        >
          <ListItemText primary={'VS이벤트'} disableTypography />
        </ListItem>
      </List>
    </>
  );
};

const DrawerFooterGroup = () => {
  const { user } = useContext(CommonContext);

  return (
    <Grid container direction="row" justify="flex-start" alignItems="center">
      <Grid item xs={6}>
        {!user.status && <Fragment></Fragment>}
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};

export default function PersistentDrawerLeft(props) {
  const { drawerOpen } = useContext(CommonContext);

  return (
    <Wrapper>
      <Drawer
        className="drawer"
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <div className="drawer-header">
          <DrawerHeaderGroup />
        </div>
        <Divider />
        <DrawerListGroup />
        <div className="drawer-header">
          <DrawerFooterGroup />
        </div>
      </Drawer>
    </Wrapper>
  );
}
