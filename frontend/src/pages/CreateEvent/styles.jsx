import styled from 'styled-components';

const Wrapper = styled.div`
  * {
    margin: 0;
    padding: 0;
  }

  button:focus {
    outline: 0;
  }

  & .admin_event_form__main {
    background-color: #efeff5;
    height: 100vh;
    width: 100vw;
  }

  & .admin_event_form__content {
    background-color: #efeff5;
    width: 84vw;
    height: 100%;
    padding: 41px 3vw 0 3vw;
    margin-left: 16vw;
    font-size: 14px;
  }

  & .admin_event_form__header {
    font-weight: 100;
  }

  & .admin_event_form__divider {
    margin: 15px 10px 10px;
  }

  & .admin_event_form__paper {
    // margin: 18px 0 0 0;
    padding: 30px;
  }

  & .admin_event_form__table {
    // position: relative;
  }

  & .admin_event_form__button_group {
    position: absolute;
    top: 120px;
  }

  & .admin_event_form__button {
    // position: absolute;
    width: 100px;
    height: 50px;
    margin: 10px;
    font-size: 18px;
  }
`;

export default Wrapper;
