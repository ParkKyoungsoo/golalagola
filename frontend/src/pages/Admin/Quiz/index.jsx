import React, { useState, useEffect, forwardRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Axios from 'axios';
import { Grid } from '@material-ui/core';

import AdminNav from '../Layout/nav.jsx';

import MaterialTable from 'material-table';
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
  const [forceRender, setForceRender] = useState({});
  const [quizzes, setQuizzes] = useState({
    columns: [
      // { title: 'quiz_id', field: 'quiz_id' },
      { title: 'quiz_question', field: 'quiz_question' },
      { title: 'quiz_answer', field: 'quiz_answer' },
      { title: 'quiz_hint', field: 'quiz_hint' },
      { title: 'quiz_num', field: 'quiz_num' },
    ],
    data: [],
  });

  Axios.get('https://i3b309.p.ssafy.io/api/quiz/').then(({ data }) => {
    console.log('aaa', data);
    quizzes.data = data;
    setQuizzes(quizzes);
  });

  useEffect(() => {
    // renderQuizList();
    console.log('useEffect');
    console.log('quizzes', quizzes);
  }, [quizzes]);

  const deleteQuizData = targetQuizId => {
    console.log(targetQuizId);
    Axios.delete('https://i3b309.p.ssafy.io/api/quiz/delete', {
      data: {
        quiz_id: targetQuizId,
      },
    })
      .then(res => {
        console.log(res.data);
        alert('삭제되었습니다.');
        window.location.reload();
      })
      .catch(e => {
        console.log('Error: ', e.response.data);
      });
  };

  let history = useHistory();

  // const renderQuizList = () => {
  //   console.log('renderQuizList');
  //   return (
  //     <MaterialTable
  //       icons={tableIcons}
  //       title="재고 목록"
  //       columns={quizzes.columns}
  //       data={quizzes.data}
  //       options={{ actionsColumnIndex: -1 }}
  //       detailPanel={rowData => {
  //         return (
  //           <Grid>
  //             <p>{rowData.quiz_id}</p>
  //             <p>{rowData.quiz_question}</p>
  //             <p>{rowData.quiz_answer}</p>
  //             <p>{rowData.quiz_hint}</p>
  //             <p>{rowData.quiz_num}</p>
  //           </Grid>
  //         );
  //       }}
  //       actions={[
  //         {
  //           icon: AddBox,
  //           tooltip: 'Add User',
  //           isFreeAction: true,
  //           onClick: event => history.push('/admin/quiz/create'),
  //         },
  //         {
  //           icon: Edit,
  //           tooltip: 'Save User',
  //           onClick: event => history.push('/admin/quiz/create'),
  //         },
  //         rowData => ({
  //           icon: DeleteOutline,
  //           tooltip: 'Delete User',
  //           onClick: (event, rowData) => {
  //             console.log(rowData);
  //             window.confirm('You want to delete ' + rowData.quiz_question);
  //           },
  //         }),
  //       ]}
  //     />
  //   );
  // };
  console.log('quizzes', quizzes);

  return (
    <div>
      <AdminNav />
      <h1>퀴즈 페이지</h1>
      <MaterialTable
        icons={tableIcons}
        title="재고 목록"
        columns={quizzes.columns}
        data={quizzes.data}
        options={{ actionsColumnIndex: -1 }}
        // onChangeRowsPerPage="20"
        detailPanel={rowData => {
          return (
            <Grid>
              <p>{rowData.quiz_id}</p>
              <p>{rowData.quiz_question}</p>
              <p>{rowData.quiz_answer}</p>
              <p>{rowData.quiz_hint}</p>
              <p>{rowData.quiz_num}</p>
            </Grid>
          );
        }}
        actions={[
          {
            icon: AddBox,
            tooltip: 'Add Quiz',
            isFreeAction: true,
            onClick: event => history.push('/admin/quiz/create'),
          },
          {
            icon: Edit,
            tooltip: 'Update Quiz',
            onClick: event => history.push('/admin/quiz/create'),
          },
          rowData => ({
            icon: DeleteOutline,
            tooltip: 'Delete Quiz',
            onClick: (event, rowData) => {
              console.log(rowData);
              if (
                window.confirm('You want to delete ' + rowData.quiz_question)
              ) {
                deleteQuizData(rowData.quiz_id);
              }
            },
          }),
        ]}
      />
    </div>
  );
};
export default AdminQuiz;
