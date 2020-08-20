import React, { useContext, useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import crypto from 'crypto';
import { ViewContext } from '../../../context/ViewContext';
import { CommonContext } from '../../../context/CommonContext';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  Grid,
  IconButton,
  Typography,
  Divider,
  TextField,
} from '@material-ui/core';
import Wrapper from './styles';
// import userData from './dump.json';

const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const regExp2 = /^\d{3}-\d{3,4}-\d{4}$/;

const DialogTitleComponent = () => {
  return (
    <Wrapper>
      <h1 className="dialog-title-component">{'Gola la Gola'}</h1>
    </Wrapper>
  );
};

// 로그인 화면에서 가장 먼저 나타나는 부분, 흰색 박스부분입니다.
const SignInSection01 = () => {
  let history = useHistory();

  const [disabled, setDisabled] = useState(true);
  const { signInUserData, setSignInUserData, setIsSignUp } = useContext(
    ViewContext,
  );

  const {
    setUser,
    setSignDialogOpen,
    setIsShowKeyborad,
    eventListener,
    setEventListener,
  } = useContext(CommonContext);

  const OnChangeHandler = name => e => {
    setSignInUserData({ ...signInUserData, [name]: e.target.value });
  };

  const onClickHandler = () => {
    setIsSignUp('ForgotPw');
  };

  const onSignInHandler = async e => {
    // 로그인 버튼 눌리면
    var { user_email, user_pwd } = signInUserData;

    if (!user_pwd || !user_email) {
      alert('이메일/패스워드 모두 입력해주세요.');
      return;
    }

    if (!regExp.test(user_email)) {
      alert('이메일 형식이 아닙니다.');
      return;
    }

    const encrypted = crypto
      .createHmac('sha1', 'ashtiger')
      .update(user_pwd)
      .digest('base64');

    signInUserData.user_pwd = encrypted;
    signInUserData.status = '';

    // 여기서 입력받은 유저데이터를 DB에 넘기면 될듯(...userData)
    Axios.post('https://i3b309.p.ssafy.io/api/auth/signin', signInUserData)
      .then(res => {
        if (res.data.check_email === 0) {
          alert('이메일 인증 후 사용해주세요.');
        } else if (res.data.check_pwd === 0) {
          alert('비밀번호가 틀렸습니다.');
        } else {
          var obj = {
            user_id: res.data.user_id,
            user_email: signInUserData.user_email,
            user_name: res.data.user_name,
            user_phone: res.data.user_phone,
            user_image: res.data.user_image,
            user_quiz: res.data.user_quiz,
            isAdmin: res.data.isAdmin,
            quiz_useCoupon: res.data.quiz_useCoupon,
            status: 'login',
            web_site: '',
            token: res.data.token,
          };
          setUser({ ...obj });

          setSignDialogOpen(false);
          setIsSignUp('SignIn');
          setEventListener(eventListener => eventListener + 1);
          if (res.data.isAdmin == true) {
            alert(
              `${res.data.user_name} 관리자님 환영합니다.\n관리자 페이지로 이동합니다.`,
            );
            history.push('/admin');
          } else {
            // history.goBack();
            history.push('/');
          }
        }
      })
      .catch(res => {
        alert('로그인 정보가 일치하지 않습니다.');
      });
  };

  useEffect(
    () => {
      if (signInUserData.user_email !== '' && signInUserData.user_pwd !== '') {
        setDisabled(false);
      }

      if (signInUserData.user_email === '' || signInUserData.user_pwd === '') {
        setDisabled(true);
      }
    },
    // [signInUserData.user_email, signInUserData.user_pwd, user, setUser]
  );

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      onSignInHandler();
    }
  };

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        className="grid"
      >
        <Grid item xs={12}>
          {/* 이메일 입력 부분 */}
          <TextField
            required
            id="outlined-required"
            label="이메일"
            className="text-field"
            defaultValue={signInUserData.user_email}
            variant="outlined"
            fullWidth={true}
            onChange={OnChangeHandler('user_email')}
            onFocus={event => {
              setIsShowKeyborad(true);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          {/* 비밀번호 입력 부분 */}
          <TextField
            required
            id="outlined-password-input"
            label="비밀번호"
            className="text-field"
            type="password"
            autoComplete="current-password"
            defaultValue={signInUserData.user_pwd}
            variant="outlined"
            fullWidth={true}
            onChange={OnChangeHandler('user_pwd')}
            onFocus={event => {
              setIsShowKeyborad(true);
            }}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid item xs={12} className="grid-item">
          {/* 로그인 버튼 */}
          <Button
            variant="contained"
            disabled={disabled}
            // disabled={false}
            fullWidth={true}
            color="primary"
            onClick={onSignInHandler}
            className="grid-item-button"
          >
            로그인
          </Button>
        </Grid>
        <Grid item xs={12} className="grid-item">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={0}
          >
            <Grid item xs={5}>
              <Divider />
            </Grid>

            <Grid item xs={2}>
              <Typography align="center" className="grid-item-typography1">
                또는
              </Typography>
            </Grid>

            <Grid item xs={5}>
              <Divider />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container direction="row" justify="center" alignItems="center">
            <IconButton
              className="sign-in-butoon grid-item-icon-button"
              onClick={onClickHandler}
            >
              <Typography className="grid-item-typography3">
                {'비밀번호 찾기'}
              </Typography>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SignInSection02 = () => {
  const { setIsSignUp } = useContext(ViewContext);

  const onClickHandler = e => {
    setIsSignUp('SignUp');
  };
  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        className="grid2"
      >
        <Grid item xs={12}>
          <Button
            fullWidth={true}
            onClick={onClickHandler}
            className="grid2-item-button"
          >
            {`회원가입`}
          </Button>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SignInGroupComponent = () => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={12}>
        <SignInSection01 />
      </Grid>
      <Grid item xs={12}>
        <SignInSection02 />
      </Grid>
      <Grid item xs={12}>
        <div>&nbsp;</div>
      </Grid>
    </Grid>
  );
};

const SignUpSection01 = () => {
  return (
    <Wrapper>
      <Typography align="center" className="sign-up1"></Typography>
    </Wrapper>
  );
};

const SignUpSection02 = () => {
  const [disabled, setDisabled] = useState(true);
  const { signUpUserData, setSignUpUserData, setIsSignUp } = useContext(
    ViewContext,
  );

  const OnChangeHandler = name => e => {
    if (
      signUpUserData.user_email !== '' &&
      signUpUserData.user_name !== '' &&
      signUpUserData.password_1 !== '' &&
      signUpUserData.password_2 !== '' &&
      signUpUserData.user_phone !== ''
    ) {
      setDisabled(false);
    }

    if (
      signUpUserData.user_email === '' ||
      signUpUserData.user_name === '' ||
      signUpUserData.password_1 === '' ||
      signUpUserData.password_2 === '' ||
      signUpUserData.user_phone === ''
    ) {
      setDisabled(true);
    }
    // console.log('signUpUserData', signUpUserData);
    setSignUpUserData({ ...signUpUserData, [name]: e.target.value });
  };

  const onSignUpHandler = async () => {
    var {
      user_name,
      user_email,
      password_1,
      password_2,
      user_phone,
    } = signUpUserData;

    if (
      user_name === '' ||
      user_email === '' ||
      password_1 === '' ||
      password_2 === '' ||
      user_phone === ''
    ) {
      alert('회원정보를 모두 입력해주세요.');
      return;
    }
    if (password_1 !== password_2) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!password_1 || password_1.length < 5) {
      alert('비밀번호는 5글자 이상으로 해주세요.');
      return;
    }

    if (!regExp.test(user_email)) {
      alert('이메일 형식이 유효하지 않습니다.');
      return;
    }

    if (!regExp2.test(user_phone)) {
      alert('핸드폰 번호 형식이 유효하지 않습니다.');
      return;
    }

    const encrypted1 = crypto
      .createHmac('sha1', 'ashtiger')
      .update(password_1)
      .digest('base64');
    const encrypted2 = crypto
      .createHmac('sha1', 'ashtiger')
      .update(password_2)
      .digest('base64');

    signUpUserData.password_1 = encrypted1;
    signUpUserData.password_2 = encrypted2;
    signUpUserData.user_phone = user_phone;

    // setSignUpUserData({
    //   user_email: '',
    //   user_name: '',
    //   user_pwd: '',
    // });
    Axios.post('https://i3b309.p.ssafy.io/api/auth/signup', signUpUserData)
      .then(data => {
        setSignUpUserData(signUpUserData);
        setIsSignUp('SignIn');
        // alert(data.message);
        alert('이메일 인증 후 사용해주세요.');
      })
      .catch(err => {
        alert(err.response.data.message);
      });
  };

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        style={{ marginLeft: 4 }}
      >
        <Grid item xs={12} className="sign-up-grid">
          <TextField
            required
            id="outlined-required"
            label="이메일"
            defaultValue={signUpUserData.user_email}
            className="text-field"
            variant="outlined"
            placeholder="test@test.com"
            fullWidth={true}
            onChange={OnChangeHandler('user_email')}
          />
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item1">
          <TextField
            required
            id="outlined-required"
            label="이름"
            defaultValue={signUpUserData.user_name}
            className="text-field"
            variant="outlined"
            placeholder="이름"
            fullWidth={true}
            onChange={OnChangeHandler('user_name')}
          />
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item2">
          <TextField
            required
            id="outlined-password-input"
            label="비밀번호"
            className="textField"
            type="password"
            autoComplete="current-password"
            defaultValue={signUpUserData.password_1}
            variant="outlined"
            placeholder="비밀번호"
            fullWidth={true}
            onChange={OnChangeHandler('password_1')}
          />
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item2">
          <TextField
            required
            id="outlined-password-input"
            label="비밀번호 확인"
            className="textField"
            type="password"
            autoComplete="current-password"
            defaultValue={signUpUserData.password_2}
            variant="outlined"
            placeholder="비밀번호 확인"
            fullWidth={true}
            onChange={OnChangeHandler('password_2')}
          />
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item2">
          <TextField
            required
            id="outlined-password-input"
            label="핸드폰 번호"
            className="textField"
            type="text"
            autoComplete="current-password"
            defaultValue={signUpUserData.user_phone}
            variant="outlined"
            placeholder="010-0000-0000"
            fullWidth={true}
            onChange={OnChangeHandler('user_phone')}
          />
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item3">
          <Button
            variant="contained"
            disabled={disabled}
            fullWidth={true}
            color="primary"
            onClick={onSignUpHandler}
            style={{
              fontSize: 14,
              fontFamily: 'Noto Sans KR',
              fontWeight: 500,
            }}
          >
            회원가입
          </Button>
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item4">
          <Typography
            align="center"
            className="sign-up-grid-item4-typography"
          ></Typography>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SignUpSection03 = () => {
  return (
    <Wrapper>
      <Grid item xs={12} className="sign-up3-grid">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
          className="sign-up3-grid-item"
        >
          <Grid item xs={5}>
            <Divider />
          </Grid>

          <Grid item xs={2}>
            <Typography
              align="center"
              className="sign-up3-grid-item-typography"
            >
              또는
            </Typography>
          </Grid>

          <Grid item xs={5}>
            <Divider />
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SignUpSection04 = () => {
  const { setIsSignUp } = useContext(ViewContext);

  const onClickHandler = e => {
    setIsSignUp('SignIn');
  };

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        className="sign-up4-grid"
      >
        <Grid item xs={2} />
        <Grid item xs={5}>
          <Typography align="center" className="sign-up4-grid-item-typography">
            {'계정이 있으세요?'}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Button
            fullWidth={true}
            onClick={onClickHandler}
            className="sign-up4-grid-item-button"
          >
            {'로그인'}
          </Button>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SignUpGroupComponent = () => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={12}>
        <SignUpSection01 />
      </Grid>
      <Grid item xs={12}>
        <SignUpSection02 />
      </Grid>
      <Grid item xs={12}>
        <SignUpSection03 />
      </Grid>
      <Grid item xs={12}>
        <SignUpSection04 />
      </Grid>
      <Grid item xs={12}>
        <div>&nbsp;</div>
      </Grid>
    </Grid>
  );
};

// ForgotPw
const ForgotPwGroupComponent = () => {
  const { serverUrl } = useContext(CommonContext);
  const { recoverPwUserData, setRecoverPwUserData } = useContext(ViewContext);
  const { setIsSignUp } = useContext(ViewContext);

  const inputRef = useRef('');

  const onClickHandler = whichGroup => {
    setIsSignUp(whichGroup);
  };
  const sendSearchWordHandler = async searchWord => {
    if (!regExp.test(searchWord)) {
      alert('이메일 형식이 유효하지 않습니다.');
      return;
    } else {
      let res = {
        user_email: searchWord,
      };
      Axios.post('https://i3b309.p.ssafy.io/api/auth/find_pwd', res).then(
        res => {
          alert(res.data.message);
        },
      );

      // setRecoverPwUserData({ ...recoverPwUserData, email: searchWord });
      // alert('Authentication code has been sent to you by email');
      // setIsSignUp('RecoverPw');
    }
  };
  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        className="forgot-pw"
      >
        <h3>등록하신 이메일을 입력해주세요.</h3>
        <input type="text" placeholder="이메일" ref={inputRef} />
        <button
          type="button"
          className="btn-link"
          onClick={() => {
            sendSearchWordHandler(inputRef.current.value);
          }}
        >
          인증번호 보내기
        </button>

        <Grid item xs={12} className="grid-item">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={0}
          >
            <Grid item xs={5}>
              <Divider />
            </Grid>

            <Grid item xs={2}>
              <Typography align="center" className="grid-item-typography1">
                또는
              </Typography>
            </Grid>

            <Grid item xs={5}>
              <Divider />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Typography align="center" className="sign-up4-grid-item-typography">
            {'계정이 없으세요?'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth={true}
            onClick={() => {
              onClickHandler(`SignUp`);
            }}
            className="sign-up4-grid-item-button"
          >
            {'회원가입'}
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        className="grid2"
      >
        <Grid item xs={12}>
          <Button
            fullWidth={true}
            onClick={() => {
              onClickHandler(`SignIn`);
            }}
            className="grid2-item-button"
          >
            {`로그인`}
          </Button>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

// RecoverPw
const RecoverPwGroupComponent = () => {
  const { recoverPwUserData } = useContext(ViewContext);
  const emailRef = useRef('');
  const verificationCodeRef = useRef('');
  const newPasswordRef = useRef('');

  const sendRecoverPw = async () => {
    const user_id = emailRef.current.value;
    const code = verificationCodeRef.current.value;
    const pwd = newPasswordRef.current.value;

    if (code === '') {
      alert('Please enter the verification code');
      return;
    } else if (pwd === '') {
      alert('Please enter a new password');
      return;
    } else {
      let hashedPassword = '';
      try {
        hashedPassword = crypto
          .createHash('sha512')
          .update(pwd)
          .digest('hex');
      } catch (error) {
        // console.log('PPAP: signInHandler -> error', error);
      }

      alert('Not implemented yet.');
      // setIsSignUp('SignIn');
    }
  };

  const sendSearchWordHandler = async searchWord => {
    if (searchWord === '') {
      alert('Please enter your e-mail');
      return;
    } else {
      alert('Not implemented yet.');
      // setRecoverPwUserData({ ...recoverPwUserData, email: searchWord });
    }
  };

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        className="recover-box-wrap"
      >
        <Grid item xs={12} className="recover-box">
          <h2>Reset your password</h2>
          <h3>
            Enter the code you received from Amazon and set a new password.
          </h3>
          <Grid className="input-box">
            <h2>E-mail</h2>
            <input
              type="text"
              value={recoverPwUserData.email}
              ref={emailRef}
              readOnly
            />
          </Grid>
          <Grid className="input-box">
            <h2>Verification Code</h2>
            <input
              type="text"
              placeholder="enter code"
              ref={verificationCodeRef}
            />
          </Grid>
          <Grid className="input-box">
            <h2>New Password</h2>
            <input
              type="password"
              placeholder="Enter new password"
              ref={newPasswordRef}
            />
          </Grid>
          <Grid className="btn_box">
            <Grid
              className="Text"
              onClick={() => {
                sendSearchWordHandler(emailRef.current.value);
              }}
            >
              Resend Code
            </Grid>
            <Grid className="btn">
              <button type="button" onClick={sendRecoverPw}>
                VERIFY
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const ResponsiveDialogSign = () => {
  const fullScreen = useMediaQuery(theme => theme.breakpoints.down('xs'));
  let history = useHistory();

  const { signDialogOpen, setSignDialogOpen, serverImgUrl } = useContext(
    CommonContext,
  );

  const handleClose = () => {
    setSignDialogOpen(false);

    history.goBack();
  };

  const [isSignUp, setIsSignUp] = useState('SignIn');
  const [signInUserData, setSignInUserData] = useState({
    user_email: '',
    status: '',
    token: '',
  });
  const [signUpUserData, setSignUpUserData] = useState({
    user_email: '',
    user_name: '',
    password_1: '',
    password_2: '',
    user_phone: '',
  });
  const [recoverPwUserData, setRecoverPwUserData] = useState({
    email: '',
    code: '',
    pwd: '',
  });

  return (
    <ViewContext.Provider
      value={{
        signUpUserData,
        setSignUpUserData,
        signInUserData,
        setSignInUserData,
        isSignUp,
        setIsSignUp,
        recoverPwUserData,
        setRecoverPwUserData,
      }}
    >
      <Dialog
        fullScreen={fullScreen}
        maxWidth={'xs'}
        open={signDialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: 'white',
            boxShadow: 'none',
          },
        }}
        BackdropProps={{
          style: {
            boxShadow: 'none',
            backgroundImage: `url(${serverImgUrl}thumb-1920-731946.jpg)`,
            backgroundSize: 'cover',
            filter: 'brightness(0.4)',
          },
        }}
      >
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12}>
            <DialogTitle id="responsive-dialog-title">
              <DialogTitleComponent />
            </DialogTitle>
            <DialogContent>
              {isSignUp === 'SignUp' && <SignUpGroupComponent />}
              {isSignUp === 'SignIn' && <SignInGroupComponent />}
              {isSignUp === 'ForgotPw' && <ForgotPwGroupComponent />}
              {isSignUp === 'RecoverPw' && <RecoverPwGroupComponent />}
            </DialogContent>
          </Grid>
        </Grid>
      </Dialog>
    </ViewContext.Provider>
  );
};
export default ResponsiveDialogSign;
