import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import crypto from 'crypto';
import { CommonContext } from '../../../context/CommonContext';
import { ViewContext } from '../../../context/ViewContext';
import {
  TextField,
  Grid,
  Typography,
  IconButton,
  Fab,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Wrapper from './styles';

const InputComponent = props => {
  let { name } = props;
  const { inputValue, setInputValue } = useContext(ViewContext);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const OnChangeHandler = name => e => {
    setInputValue({ ...inputValue, [name]: e.target.value });
  };

  const onClickHandler = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <Wrapper>
      <ContentDefaultComponent
        LefetComponent={
          <Typography variant="body1" className="title">
            {name}
          </Typography>
        }
        RightComponet={
          <>
            <TextField
              required
              id={`outlined-password-input-${name}`}
              label={name}
              defaultValue={inputValue[name]}
              variant="outlined"
              autoComplete="current-password"
              onChange={OnChangeHandler(name)}
              type={isShowPassword ? '' : 'password'}
              className="input-component-text-field"
            />
            <IconButton
              onClick={onClickHandler}
              className="input-component-icon-button"
            >
              <VisibilityIcon />
            </IconButton>
          </>
        }
      />
    </Wrapper>
  );
};

const ContentDefaultComponent = props => {
  const { LefetComponent, RightComponet } = props;
  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={3}>
          {LefetComponent}
        </Grid>
        <Grid item xs={9}>
          {RightComponet}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const MyInfoButtonGroupComponent = props => {
  let history = useHistory();
  const { setUserDetailDialogOpen, user, serverUrl, setUser } = useContext(
    CommonContext,
  );
  const { inputValue } = useContext(ViewContext);

  const handleClose = () => {
    setUserDetailDialogOpen(false);
    history.goBack();
  };

  const onMyInfoSaveHandelr = async props => {
    var before_pwd = inputValue['Before Password'];
    var after_pwd = inputValue['New Password'];
    var changePassword = inputValue['New Password Confirm'];

    if (after_pwd !== changePassword) {
      alert('Passwords that do not match between passwords.');
      return;
    }
    if (!after_pwd || after_pwd.lengh < 5) {
      alert('Wrong password.');
      return;
    }

    const encrypted_beforePwd = crypto
      .createHmac('sha1', 'ashtiger')
      .update(before_pwd)
      .digest('base64');
    const encrypted_afterPwd = crypto
      .createHmac('sha1', 'ashtiger')
      .update(after_pwd)
      .digest('base64');

    Axios({
      method: 'PUT',
      url: 'https://i3b309.p.ssafy.io/api/auth/change_pwd',
      headers: {
        token: user.token,
      },
      data: {
        before_pwd: encrypted_beforePwd,
        after_pwd: encrypted_afterPwd,
        user_id: user.user_id,
        user_email: user.user_email,
        isAdmin: user.isAdmin,
      },
    })
      .then(res => {
        console.log('res', res.data);
        var obj = {
          user_id: user.user_id,
          user_email: user.user_email,
          user_name: user.user_name,
          user_phone: user.user_phone,
          user_image: user.user_image,
          user_quiz: user.user_quiz,
          isAdmin: user.isAdmin,
          status: 'login',
          web_site: '',
          token: res.data.token,
        };
        setUser({ ...obj });

        alert(res.data.message);
        history.push('/');
      })
      .catch(err => {
        console.log('err', err.response.data.message);
      });

    // if (respone['status'] === 200) {
    //   alert('Has changed.');
    // } else {
    //   alert('Change failed.');
    // }
  };

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        className="my-info-button-group-component-grid"
      >
        <Fab
          variant="extended"
          aria-label="like"
          onClick={handleClose}
          className="cancel-fab my-info-button-group-component-grid-fab1"
        >
          CANCEL
        </Fab>

        <Fab
          variant="extended"
          aria-label="like"
          color="inherit"
          onClick={onMyInfoSaveHandelr}
          className="upload-fab my-info-button-group-component-grid-fab2"
        >
          UPLOAD
        </Fab>
      </Grid>
    </Wrapper>
  );
};

const ChangePasswordComponent = params => {
  return (
    <Wrapper>
      <form noValidate autoComplete="off">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <h2 className="section-title">Change Password</h2>
          <Grid
            item
            xs={12}
            className="change-password-component-grid-item"
          ></Grid>
          <Grid item xs={12}>
            <InputComponent name={'Before Password'} />
          </Grid>
          <Grid item xs={12}>
            <InputComponent name={'New Password'} />
          </Grid>
          <Grid item xs={12}>
            <InputComponent name={'New Password Confirm'} />
          </Grid>

          <Grid item xs={12}>
            <MyInfoButtonGroupComponent />
          </Grid>
        </Grid>
      </form>
    </Wrapper>
  );
};

const ChangePassword = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <ViewContext.Provider value={{ inputValue, setInputValue }}>
      <ChangePasswordComponent />
    </ViewContext.Provider>
  );
};

export default ChangePassword;
