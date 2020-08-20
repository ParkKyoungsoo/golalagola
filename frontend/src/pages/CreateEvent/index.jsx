import React, { useContext } from 'react';

import { Grid, Paper, Divider } from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import CreateEventComponent from '../../components/Create/CreateEventComponent/index';

import Wrapper from './styles';

import NestedList from '../Admin/Layout/sidebar';

import axios from 'axios';
import { CommonContext } from '../../context/CommonContext';
import { useHistory } from 'react-router-dom';

const CreateVote = props => {
  let history = useHistory();

  const { newEventData, setNewEventData } = useContext(CommonContext);

  const createEvent = () => {
    if (newEventData.event_category === '') {
      alert('카테고리를 선택 해 주세요');
    } else if (newEventData.event_prod_A === '') {
      alert('A 상품을 선택해주세요');
    } else if (newEventData.event_prod_B === '') {
      alert('B 상품을 선택해주세요');
    } else {
      if (newEventData.event_id === undefined) {
        axios
          .post('https://i3b309.p.ssafy.io/api/event/', newEventData)
          .then(function(response) {
            setNewEventData({
              event_prod_A: '',
              event_prod_B: '',
              event_date: '',
              event_expire: '',
              event_category: '',
            });
            // history.push('/Admin/VS');
            alert('이벤트가 등록되었습니다.');

            window.location.href = '/admin/vs';
          })
          .catch(error => {
            alert('이벤트가 등록되지 않았습니다. 다시 시도해주세요.');
          });
      } else {
        axios
          .put('https://i3b309.p.ssafy.io/api/event/', newEventData)
          .then(function(response) {
            setNewEventData({
              event_prod_A: '',
              event_prod_B: '',
              event_date: '',
              event_expire: '',
              event_category: '',
              event_id: '',
            });
            // history.push('/Admin/VS');
            window.location.href = '/admin/vs';
          })
          .catch(error => {});
      }
    }
  };

  return (
    <Wrapper>
      <div className="admin_event_form__main">
        <Grid container>
          <Grid item>
            <NestedList index={3} />
          </Grid>
          <Grid item>
            <Grid className="admin_event_form__content">
              <h5 className="admin_event_form__header">이벤트 등록</h5>
              <Divider variant="middle" className="admin_event_form__divider" />
              <Paper elevation={2} className="admin_event_form__paper">
                <Grid container justify="flex-end" alignItems="center">
                  <Grid className="admin_event_form__button_group">
                    <Button
                      variant="primary"
                      onClick={createEvent}
                      className="admin_event_form__button"
                    >
                      등록하기
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => history.push('/admin/vs')}
                      className="admin_event_form__button"
                    >
                      뒤로가기
                    </Button>
                  </Grid>
                  <CreateEventComponent className="admin_event_form__table" />
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Wrapper>
  );
};

export default CreateVote;
