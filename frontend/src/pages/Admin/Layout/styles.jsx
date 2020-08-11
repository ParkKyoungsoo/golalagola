import styled from 'styled-components';

const Wrapper = styled.div`
  * {
    font-family: 'Noto sans KR', sans-serif;
    margin: 0;
    padding: 0;
    // position: relative;
  }
  & .sidebar__main {
    position: fixed;
    top: 0px;
    width: 15vw;
    height: 100vh;
    background-color: #4d48fb;
  }
  & .sidebar__logo {
    height: 60px;
    background-color: #4d48fb;
    color: white;
    text-align: center;
    padding: 15px;
  }

  & .sidebar__divider {
    margin: 10px 20px;
    color: white;
  }
  & .sidebar__item {
    padding: 13px 15px;
    margin-bottom: 20px;
    font-weight: 100;
    color: #bfbcff;
  }
  & .sidebar__icon {
    margin: 0 0 0 20px;
    // color: black;
  }
  & .sidebar__p {
    margin: 0 0 0 20px;
    // color: black;
  }
`;
export default Wrapper;
