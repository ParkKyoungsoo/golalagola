import React, { useState, useContext } from 'react';
import { CommonContext } from '../../../../context/CommonContext';

import {
  Paper,
  Grid,
  FormControl,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Divider,
} from '@material-ui/core';
import Wrapper from './styles';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import NestedList from '../../Layout/sidebar.jsx';

// import AdminNav from '../../Nav/index.jsx';

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
  const [desc, setDesc] = useState({
    value: currentQuizDatas.quiz_desc,
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

  const handleDescChange = event => {
    if (event.target.value !== '') {
      setDesc({ value: event.target.value, error: false });
    } else {
      setDesc({ value: event.target.value, error: true });
    }
    setForceRender({});
  };

  const handleAnswerChange = event => {
    setAnswer(event.target.value);
  };

  // 잘못된 경우에는 이전 페이지로 보내기
  if (
    currentQuizDatas.status === undefined ||
    currentQuizDatas.status === null
  ) {
    window.location.href = '/admin/quiz';
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (title.value === '' || hint.valye === '') {
      if (title.value === '') {
        setTitle({ value: '', error: true });
      }
      if (hint.value === '') {
        setHint({ value: '', error: true });
      }
      if (desc.value === '') {
        setDesc({ value: '', error: true });
      }
      setForceRender({});
      alert('입력하지 않은 내용이 존재합니다.');
    } else {
      // status: create
      if (currentQuizDatas.status === 'create') {
        await Axios.post('https://i3b309.p.ssafy.io/api/quiz', {
          quiz_question: title.value,
          quiz_hint: hint.value,
          quiz_desc: desc.value,
          quiz_answer: answer,
        })
          .then(response => {
            alert('퀴즈가 등록 되었습니다.');
          })
          .catch(e => {
            alert('퀴즈가 등록 되지 않았습니다. 다시 시도해주세요.');
          });
      } else if (currentQuizDatas.status === 'update') {
        // status: create
        await Axios.put('https://i3b309.p.ssafy.io/api/quiz', {
          quiz_id: currentQuizDatas.quiz_id,
          quiz_question: title.value,
          quiz_hint: hint.value,
          quiz_desc: desc.value,
          quiz_answer: answer,
        })
          .then(response => {
            alert('퀴즈가 수정 되었습니다.');
          })
          .catch(e => {
            alert('퀴즈 정보가 수정되지 않았습니다. 다시 시도해주세요.');
          });
      }
      setCurrentQuizDatas([]);
      window.location.href = '/admin/quiz';
    }
  }

  return (
    <Wrapper>
      <div className="admin_quiz_form__main">
        <Grid container>
          <Grid item>
            <NestedList index={4} />
          </Grid>
          <Grid item>
            <Grid className="admin_quiz_form__content">
              <h5 className="admin_quiz_form__header">퀴즈 등록</h5>
              <Divider variant="middle" className="admin_quiz_form__divider" />
              <Paper elevation={2} className="admin_quiz_form__paper">
                <Grid
                  container
                  justify="center"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <FormControl
                      // className={classes.root}
                      >
                        <Grid item xs={12}>
                          <TextField
                            required
                            className="admin_quiz_form__input"
                            error={title.error ? true : false}
                            id="standard-required"
                            label="퀴즈 제목"
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
                            className="admin_quiz_form__input"
                            error={hint.error ? true : false}
                            id="standard-required"
                            label="퀴즈 힌트"
                            type="text"
                            multiline
                            rowsMax={4}
                            value={hint.value}
                            onChange={handleHintChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            className="admin_quiz_form__input"
                            error={hint.error ? true : false}
                            id="standard-required"
                            label="퀴즈 설명"
                            type="text"
                            multiline
                            rowsMax={4}
                            value={desc.value}
                            onChange={handleDescChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormLabel component="answer">정답</FormLabel>
                          <RadioGroup
                            className="admin_quiz_form__input"
                            aria-label="answer"
                            color="primary"
                            name="answer"
                            value={hint.value}
                            onChange={handleAnswerChange}
                          >
                            <FormControlLabel
                              value="true"
                              color="primary"
                              control={<Radio />}
                              label="O"
                            />
                            <FormControlLabel
                              value="false"
                              color="primary"
                              control={<Radio />}
                              label="X"
                            />
                          </RadioGroup>
                        </Grid>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSubmit}
                        >
                          퀴즈 등록
                        </Button>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Wrapper>
  );
};

export default AdminQuizForm;
