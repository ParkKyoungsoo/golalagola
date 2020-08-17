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
import { Link, useHistory } from 'react-router-dom';
import { CommonContext } from '../../../context/CommonContext';
import KioskItemModal from '../KioskModal/KioskItemListModal';
import { FaHome } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import { IoMdRefresh } from 'react-icons/io';

// React icon 사용하는 방법은 재경이에게 문의하세요.

// 아이콘

const Home = () => {
  return <FaHome />;
};
const Plus = () => {
  return <GoPlus />;
};
const Refresh = () => {
  return <IoMdRefresh />;
};

const Navbar = () => {
  const [userAns, setUserAns] = useState();
  const [successModalTrigger, setSuccessModalTrigger] = useState(false);
  const { mainUrl } = useContext(CommonContext);
  const fullScreen = useMediaQuery(theme => theme.breakpoints.down('md'));

  const openDialog = () => {
    setUserAns(userAns => true);
    setSuccessModalTrigger(successModalTrigger => true);
  };

  const handleClose = () => {
    setSuccessModalTrigger(false);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const displayEndTime = dt => {
    return '14:00:00';
  };
  // Time out 기능
  // 필요없다 생각해서 지움 나중에 다시 얘기해서 살려보던가 합시다
  // const timer = setTimeout(() => {
  //   // if (window.location.href === 'http://localhost:3000/KioskMains') {
  //   //   handleClose();
  //   // } else {
  // window.location.href = `${mainUrl}/KioskMains`;
  //   // }
  // }, 60000);

  const goToMain = () => {
    window.location.href = '/kioskmains';
  };

  return (
    <>
      {/* Navigation Bar */}
      <Wrapper>
        <Grid>
          <Box
            style={{ justifyContent: 'flex-end', padding: '10px 0 0 20px ' }}
          >
            <h1 onClick={goToMain} style={{ color: 'blue' }}>
              <Home />
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
            margin: '10px',
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
          <DialogActions style={{ margin: 0 }}>
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
