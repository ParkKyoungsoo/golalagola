import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router';
import {
  Grid,
  Box,
  Dialog,
  DialogActions,
  useMediaQuery,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { Wrapper, Close, Date } from './styles';
import { Link, Route } from 'react-router-dom';
import KioskItemModal from '../KioskModal/KioskItemListModal';

import { FaHome } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';

// React icon 사용하는 방법은 재경이에게 문의하세요.

// 아이콘

const Home = () => {
  return (
    <h1>
      <FaHome />
    </h1>
  );
};
const Plus = () => {
  return <GoPlus />;
};

const Navbar = () => {
  const [userAns, setUserAns] = useState();
  const [successModalTrigger, setSuccessModalTrigger] = useState(false);
  const fullScreen = useMediaQuery(theme => theme.breakpoints.down('md'));

  const openDialog = () => {
    setUserAns(userAns => true);
    setSuccessModalTrigger(successModalTrigger => true);
    movePage();
  };

  const handleClose = () => {
    console.log('close');
    setSuccessModalTrigger(false);
  };

  const displayEndTime = dt => {
    console.log('VoteGridItem -> dt', dt);
    return '14:00:00';
  };

  const movePage = () => {
    console.log('movepage');

    const timer = setTimeout(() => {
      if (window.location.href === 'http://localhost:3000/KioskMains') {
        console.log(123);
        handleClose();
      } else {
        console.log('timeout!!');
        window.location.href = 'http://localhost:3000/KioskMains';
      }
    }, 30000);
  };

  return (
    <>
      {/* Navigation Bar */}
      <Wrapper>
        <Grid>
          <Box className="Nav_bar">
            <Link to={'/KioskMains/'}>
              <Home />
            </Link>
            <h1 className="icon_pointer" onClick={openDialog}>
              <Plus />
            </h1>
          </Box>
        </Grid>
      </Wrapper>

      {/* Dialog 실행*/}
      <Dialog
        fullScreen={fullScreen}
        open={successModalTrigger}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        PaperProps={{
          style: {
            height: '90vh',
            padding: '10px',
            width: '1280px',
            maxWidth: 'none',
            overflowX: 'hidden',
            overflowY: 'auto',
            position: 'inherit',
          },
        }}
        BackdropProps={{
          style: {
            backgroundColor: 'rgba(0,0,0,0.85)',
          },
        }}
      >
        <Close className="btn-close">
          <DialogActions style={{ padding: 0 }}>
            <Date>
              <span className="date on">{displayEndTime()}</span>
            </Date>
            <Grid className="go-back-btn" onClick={handleClose}>
              <ClearIcon
                size="medium"
                style={{ color: '#fff', cursor: 'pointer' }}
              />
            </Grid>
          </DialogActions>
        </Close>
        <KioskItemModal />
      </Dialog>
    </>
  );
};

export default Navbar;
