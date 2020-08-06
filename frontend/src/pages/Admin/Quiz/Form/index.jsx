import React, { useState, useContext, useCallback, useEffect } from 'react';
import { CommonContext } from '../../../../context/CommonContext';

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
  const { currentQuizDatas, setCurrentQuizDatas } = useContext(CommonContext);

  const [title, setTitle] = useState({
    value: currentQuizDatas.quiz_question,
    error: false,
  });
  const [hint, setHint] = useState({
    value: currentQuizDatas.quiz_hint,
    error: false,
  });
  const [answer, setAnswer] = useState(currentQuizDatas.quiz_answer);

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

  async function handleSubmit(event) {
    event.preventDefault();
    if (title.value === '' || hint.valye === '') {
      if (title.value === '') {
        setTitle({ value: '', error: true });
      }
      if (hint.value === '') {
        setTitle({ value: '', error: true });
      }
      setForceRender({});
      alert('validation error');
    } else {
      // status: create
      if (currentQuizDatas.status === 'create') {
        await Axios.post('https://i3b309.p.ssafy.io/api/quiz', {
          quiz_question: title.value,
          quiz_hint: hint.value,
          quiz_answer: answer,
        })
          .then(response => {
            console.log('Response', response.data);
            alert('퀴즈가 등록 되었습니다.');
          })
          .catch(e => {
            console.log('Error: ', e.response.data);
          });
      } else {
        // status: create
        await Axios.put('https://i3b309.p.ssafy.io/api/quiz', {
          quiz_id: currentQuizDatas.quiz_id,
          quiz_question: title.value,
          quiz_hint: hint.value,
          quiz_answer: answer,
        })
          .then(response => {
            console.log('Response', response.data);
            alert('퀴즈가 수정 되었습니다.');
          })
          .catch(e => {
            console.log('Error: ', e.response.data);
          });
      }
      window.location.href = '/admin/quiz';
    }
  }

  return (
    <div>
      <AdminNav />
      <Grid container justify="center" alignItems="flex-start" spacing={2}>
        <Grid item xs={12}>
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
