import React, {
  useState,
  useEffect,
  Fragment,
  useCallback,
  useContext,
} from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { CommonContext } from '../../../context/CommonContext';
import { ViewContext } from '../../../context/ViewContext';

import {
  Avatar,
  TextField,
  Button,
  Grid,
  Typography,
  Fab,
} from '@material-ui/core';
import Wrapper from './styles';

const MyInfoUploadImageComponent = () => {
  const { user, serverImgUrl } = useContext(CommonContext);
  const { thumbnailImageData, setThumbnailImageData } = useContext(ViewContext);

  const onDrop = useCallback(acceptedFiles => {
    console.log('Basic -> acceptedFiles', acceptedFiles);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone(onDrop);

  useEffect(() => {
    for (const file of acceptedFiles) {
      setThumbnailImageData({
        img: URL.createObjectURL(file),
        file: file,
      });
      console.log(
        'setThumbnailImageData',
        thumbnailImageData.img,
        ' ',
        thumbnailImageData.file,
      );
    }
  }, [acceptedFiles]);

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12}>
        <section className="container">
          <div {...getRootProps({ className: 'dropzone' })}>
            <Avatar
              variant="circle"
              src={
                thumbnailImageData.img
                  ? thumbnailImageData.img
                  : `${serverImgUrl}${user.user_name}`
              }
              className="cover-avatar"
            />
            <input {...getInputProps()} />
          </div>
        </section>
      </Grid>
      <Grid item xs={12}>
        <Fragment>
          <Typography> {user.user_name} </Typography>
          <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
              <Button
                size={'small'}
                className="my-info-upload-image-component-button"
              >
                EDIT PROFILE
              </Button>
              <input {...getInputProps()} />
            </div>
          </section>
        </Fragment>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};

const MyInfoInputComponent = props => {
  let { keyValue, title, rows } = props;

  const { inputValue, setInputValue } = useContext(ViewContext);

  const OnChangeHandler = e => {
    setInputValue({ ...inputValue, [keyValue]: e.target.value });
  };

  return (
    <MyInfoContentDefaultComponent
      LefetComponent={
        <Typography variant="body1" className="title">
          {title}
        </Typography>
      }
      RightComponet={
        <TextField
          disabled={keyValue === 'user_id' ? true : false}
          id={`outlined-basic-${keyValue}`}
          defaultValue={inputValue[keyValue]}
          variant="outlined"
          fullWidth={true}
          onChange={OnChangeHandler}
          multiline={rows !== null ? true : false}
          rows={rows !== null ? rows : 1}
          rowsMax={3}
        />
      }
    />
  );
};

const MyInfoButtonGroupComponent = props => {
  let history = useHistory();
  const { setUserDetailDialogOpen, user, serverUrl, setUser } = useContext(
    CommonContext,
  );
  const { inputValue, thumbnailImageData } = useContext(ViewContext);

  const [isReadyToUpload, setIsReadyToUpload] = useState(false);

  const handleClose = () => {
    setUserDetailDialogOpen(false);
    history.goBack();
  };

  const onMyInfoSaveHandelr = async props => {
    let respone = [];
    let data = {};
    const formData = new FormData();
    formData.append('image', thumbnailImageData.file); // 파일명
    console.log('thumbnailImageData.file', thumbnailImageData.file);

    let body = {
      ...inputValue,
      ...thumbnailImageData,
    };
    console.log('userLLLL: ', body);
    console.log(
      'update ',
      inputValue,
      'thumbnailImageData',
      thumbnailImageData,
      user.token,
    );

    // console.log('formDAta', formData);

    Axios({
      method: 'PUT',
      url: 'https://i3b309.p.ssafy.io/api/auth/update',
      headers: {
        token: user.token,
        user_email: inputValue.user_email,
      },
      data: {
        user_email: inputValue.user_email,
        update_name: inputValue.user_name,
        update_phone: inputValue.user_phone,
        user_image: `images/${inputValue.user_name}`,
      },
    })
      .then(async res => {
        console.log('aaa', `images/${inputValue.user_name}`);
        console.log('form Data', formData);
        await Axios.post(
          'https://i3b309.p.ssafy.io/api/auth/imageupload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
          .then(response => {
            console.log('Response', response.data);
            alert('회원정보가 수정되었습니다.');

            history.push('/');
          })
          .catch(err => {
            console.log('Error: ', err);
          });
      })
      .catch(err => {
        console.log('err', err.response.data.message);
      });

    formData.append('optionData', JSON.stringify(body));

    // setUser({ ...data, status: 'login' });
  };

  useEffect(() => {
    if (inputValue.user_email !== user.user_id) {
      setIsReadyToUpload(true);
      return;
    }

    if (inputValue.user_name !== user.user_name) {
      setIsReadyToUpload(true);
      return;
    }

    if (inputValue.user_phone !== '') {
      setIsReadyToUpload(true);
      return;
    }

    if (thumbnailImageData.img !== user.user_image) {
      setIsReadyToUpload(true);
      return;
    }

    if (thumbnailImageData.file !== '') {
      setIsReadyToUpload(true);
      return;
    }

    setIsReadyToUpload(false);
  }, [
    inputValue.user_email,
    inputValue.user_name,
    inputValue.user_phone,
    thumbnailImageData.img, // blob:http://localhost:3000/9dcfe061-4161-41f9-9e9f-b4c163393536
    thumbnailImageData.file, // File
  ]);

  return (
    <Grid
      container
      direction="row"
      justify="flex-end"
      alignItems="center"
      className="on-my-info-save-handelr-grid"
    >
      <Fab
        variant="extended"
        aria-label="like"
        onClick={handleClose}
        className="cancel-fab on-my-info-save-handelr-grid-fab1"
      >
        CANCEL
      </Fab>

      <Fab
        variant="extended"
        aria-label="like"
        color="inherit"
        onClick={() => {
          if (isReadyToUpload) {
            onMyInfoSaveHandelr();
          }
        }}
        className="upload-fab"
        style={{
          backgroundColor: isReadyToUpload ? '#4248b5' : '#E0E0E0',
        }}
      >
        UPLOAD
      </Fab>
    </Grid>
  );
};

const MyInfoContentDefaultComponent = props => {
  const { LefetComponent, RightComponet } = props;
  return (
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
      <Grid item xs={7}>
        {RightComponet}
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};

const MyInfoContentComponent = () => {
  return (
    <form noValidate autoComplete="off">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <MyInfoUploadImageComponent />
        </Grid>

        <Grid item xs={12}>
          <MyInfoInputComponent title="ID" keyValue="user_email" />
        </Grid>
        <Grid item xs={12}>
          <MyInfoInputComponent title="Name" keyValue="user_name" />
        </Grid>

        <Grid item xs={12}>
          <MyInfoInputComponent title="Phone" keyValue="user_phone" />
        </Grid>

        <Grid item xs={12}>
          <MyInfoButtonGroupComponent />
        </Grid>
      </Grid>
    </form>
  );
};

const MyInfo = () => {
  const { user } = useContext(CommonContext);

  const [thumbnailImageData, setThumbnailImageData] = useState({
    img: '',
    file: '',
  });

  const [inputValue, setInputValue] = useState({
    user_email: user.user_email,
    user_name: user.user_name,
    user_phone: user.user_phone,
  });
  return (
    <ViewContext.Provider
      value={{
        inputValue,
        setInputValue,
        thumbnailImageData,
        setThumbnailImageData,
      }}
    >
      <Wrapper>
        <MyInfoContentComponent />
      </Wrapper>
    </ViewContext.Provider>
  );
};

export default MyInfo;
