import styled from 'styled-components';

const Wrapper = styled.div`
  * {
    margin: 0;
    padding: 0;
  }

  button:focus {
    outline: 0;
  }

  & .admin_user__main {
    background-color: #efeff5;
    height: 100vh;
    width: 100vw;
  }

  & .admin_user__content {
    background-color: #efeff5;
    width: 84vw;
    height: 100%;
    padding: 41px 3vw 0 3vw;
    margin-left: 16vw;
    font-size: 14px;
  }

  & .admin_user__header {
    font-weight: 100;
  }

  & .admin_user__divider {
    margin: 15px 10px 10px;
  }

  & .admin_user__detail--grid {
    padding: 20px;
    // border-left: 2px solid #4d48fb;
    box-shadow: inset 0px 7px 8px -10px rgba(0, 0, 0, 0.5),
      inset 0px -7px 8px -10px rgba(0, 0, 0, 0.5);
  }

  & .admin_user__detail--image_grid {
    text-align: right;
  }

  & .admin_user__detail--image {
    width: 20vw;
    margin-right: 30px;
  }
`;

export default Wrapper;
