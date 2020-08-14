import styled from 'styled-components';

const Wrapper = styled.div`
  * {
    margin: 0;
    padding: 0;
  }

  button:focus {
    outline: 0;
  }

  & .admin_quiz__main {
    background-color: #efeff5;
    height: 100vh;
    width: 100vw;
  }

  & .admin_quiz__content {
    background-color: #efeff5;
    width: 84vw;
    height: 100%;
    padding: 41px 3vw 0 3vw;
    margin-left: 16vw;
    font-size: 14px;
  }

  & .admin_quiz__header {
    font-weight: 100;
  }

  & .admin_quiz__divider {
    margin: 15px 10px 10px;
  }
`;

export default Wrapper;
