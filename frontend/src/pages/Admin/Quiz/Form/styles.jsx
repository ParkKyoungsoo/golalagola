import styled from 'styled-components';

const Wrapper = styled.div`
  * {
    margin: 0;
    padding: 0;
  }

  button:focus {
    outline: 0;
  }

  & .admin_quiz_form__main {
    background-color: #efeff5;
    height: 100vh;
    width: 100vw;
  }

  & .admin_quiz_form__content {
    background-color: #efeff5;
    width: 84vw;
    height: 100%;
    padding: 41px 3vw 0 3vw;
    margin-left: 16vw;
    font-size: 14px;
  }

  & .admin_quiz_form__header {
    font-weight: 100;
  }

  & .admin_quiz_form__paper {
    // margin: 18px 0 0 0;
    padding: 50px;
  }

  & .admin_quiz_form__divider {
    margin: 15px 10px 10px;
  }

  & .admin_quiz_form__table {
    width: 500px;
  }

  & .admin_quiz_form__input {
    width: 100%;
  }

  & .admin_quiz_form__button {
    margin: 15px 0 0 0;
    width: 100%;
  }
`;

export default Wrapper;
