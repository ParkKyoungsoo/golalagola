import React, { forwardRef, useContext } from 'react';
import { CommonContext } from '../../../context/CommonContext';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { Grid, Divider } from '@material-ui/core';
import MaterialTable from 'material-table';

import Wrapper from './styles';

import NestedList from '../Layout/sidebar.jsx';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const AdminQuiz = () => {
  const { setCurrentQuizDatas, quizzesTableData } = useContext(CommonContext);

  let history = useHistory();

  const createQuizData = () => {
    const QuizData = {
      quiz_question: '',
      quiz_desc: '',
      quiz_answer: true,
      status: 'create',
    };
    setCurrentQuizDatas(QuizData);
    history.push('/admin/quiz/form');
  };
  const updateQuizData = rowData => {
    const QuizData = {
      quiz_id: rowData.quiz_id,
      quiz_question: rowData.quiz_question,
      quiz_hint: rowData.quiz_hint,
      quiz_desc: rowData.quiz_desc,
      quiz_answer: rowData.quiz_answer,
      status: 'update',
    };
    setCurrentQuizDatas(QuizData);
    history.push('/admin/quiz/form');
  };

  const deleteQuizData = targetQuizId => {
    Axios.delete('https://i3b309.p.ssafy.io/api/quiz', {
      data: {
        quiz_id: targetQuizId,
      },
    })
      .then(res => {
        alert('삭제되었습니다.');
        window.location.reload();
      })
      .catch(e => {
        alert('퀴즈가 삭제되지 않았습니다. 서비스 관리자에게 문의해 주세요.');
        window.location.reload();
      });
  };

  return (
    <Wrapper>
      <div className="admin_quiz__main">
        <Grid container>
          <Grid item>
            <NestedList index={4} />
          </Grid>
          <Grid item>
            <Grid className="admin_quiz__content">
              <h5 className="admin_quiz__header">퀴즈 목록</h5>
              <Divider variant="middle" className="admin_quiz__divider" />
              <MaterialTable
                icons={tableIcons}
                title=""
                columns={quizzesTableData.columns}
                data={quizzesTableData.data}
                options={{ actionsColumnIndex: -1, pageSize: 10 }}
                actions={[
                  {
                    icon: AddBox,
                    tooltip: 'Add Quiz',
                    isFreeAction: true,
                    onClick: event => createQuizData(),
                  },
                  rowData => ({
                    icon: Edit,
                    tooltip: 'Update Quiz',
                    onClick: (event, rowData) => updateQuizData(rowData),
                  }),
                  rowData => ({
                    icon: DeleteOutline,
                    tooltip: 'Delete Quiz',
                    onClick: (event, rowData) => {
                      if (
                        window.confirm(
                          `"${rowData.quiz_question}" 퀴즈를 삭제하시겠습니까?`,
                        )
                      ) {
                        deleteQuizData(rowData.quiz_id);
                      }
                    },
                  }),
                ]}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Wrapper>
  );
};
export default AdminQuiz;
