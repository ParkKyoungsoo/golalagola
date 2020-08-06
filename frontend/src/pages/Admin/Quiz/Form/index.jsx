import React, { useState, useContext, useCallback, useEffect } from 'react';
import {
  Paper,
  Grid,
  Avatar,
  Fab,
  Input,
  Select,
  MenuItem,
  FormControl,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from '@material-ui/core';
import Wrapper from './styles';
import { useDropzone } from 'react-dropzone';
import NavigationIcon from '@material-ui/icons/Navigation';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import { useHistory } from 'react-router-dom';
import Axios from 'axios';

import AdminNav from '../../Nav/index.jsx';

const AdminQuizForm = () => {
  const [forceRender, setForceRender] = useState({});

  const [title, setTitle] = useState({
    value: '',
    error: false,
  });
  const [hint, setHint] = useState({
    value: '',
    error: false,
  });
  const [answer, setAnswer] = useState(true);

  const handleTitleChange = event => {
    if (event.target.value !== '') {
      setTitle({ value: event.target.value, error: false });
    } else {
      setTitle({ value: event.target.value, error: true });
    }
    setForceRender({});
  };

  const handleHintChange = event => {
    if (event.target.value !== '') {
      setHint({ value: event.target.value, error: false });
    } else {
      setHint({ value: event.target.value, error: true });
    }
    setForceRender({});
  };

  const handleAnswerChange = event => {
    setAnswer(event.target.value);
  };

  const [thumbnailImageData, setThumbnailImageData] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    console.log('PPAP: Basic -> acceptedFiles', acceptedFiles);
    // Do something with the files
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone(onDrop);

  useEffect(() => {
    for (const file of acceptedFiles) {
      console.log('TCL: Basic -> file', file);
      setThumbnailImageData({
        img: URL.createObjectURL(file),
        file: file,
      });
    }
  }, [acceptedFiles]);

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  let history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    console.log(title, hint, answer);
    if (title.value === '' || !hint.valye === '') {
      if (title.value === '') {
        setTitle({ value: '', error: true });
      }
      if (hint.value === '') {
        setTitle({ value: '', error: true });
      }
      setForceRender({});
      alert('validation error');
    } else {
      Axios.post('https://i3b309.p.ssafy.io/api/quiz/insert', {
        quiz_question: title.value,
        quiz_answer: answer,
        quiz_hint: hint.value,
      })
        .then(response => {
          console.log('Response', response.data);
          alert('퀴즈가 등록 되었습니다.');
        })
        .catch(e => {
          console.log('Error: ', e.response.data);
        });
      history.push('/admin/quiz');
    }
  }

  return (
    <div>
      <AdminNav></AdminNav>
      <Grid container justify="center" alignItems="flex-start" spacing={2}>
        <Grid item xs={12} sm={3}>
          <p>그리드 3</p>
          <h4 className="ThumbnailImageComponentH4">corver preview</h4>
          <Paper>
            <section className="container">
              <div {...getRootProps({ className: 'dropzone' })}>
                {thumbnailImageData.img ? (
                  <Avatar
                    variant="square"
                    src={thumbnailImageData.img}
                    className="coverAvatar"
                  />
                ) : (
                  <Fab variant="extended" className="cover-upload-fab">
                    <NavigationIcon className="extended-icon" />
                    Upload Image
                  </Fab>
                )}
                <input {...getInputProps()} />
              </div>
              <aside className="thumbnail-image-component-aside">
                <h4>Image Requirement</h4>
                <h4>Minimum size of "800x600"</h4>
                <ul>{files}</ul>
              </aside>
            </section>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={9}>
          <p>그리드 9</p>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <FormControl
              // className={classes.root}
              noValidate
            >
              <Grid item xs={12}>
                <TextField
                  required
                  error={title.error ? true : false}
                  id="standard-required"
                  label="Quiz Title"
                  type="text"
                  multiline
                  rowsMax={4}
                  value={title.value}
                  onChange={handleTitleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={hint.error ? true : false}
                  id="standard-required"
                  label="Quiz Hint"
                  type="text"
                  multiline
                  rowsMax={4}
                  value={hint.value}
                  onChange={handleHintChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="answer"
                  name="answer"
                  value={hint.value}
                  onChange={handleAnswerChange}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="ture"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="false"
                  />
                </RadioGroup>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Primary
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminQuizForm;
