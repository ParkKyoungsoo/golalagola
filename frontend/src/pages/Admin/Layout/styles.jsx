import styled from 'styled-components';

const Wrapper = styled.div`
  * {
    margin: 0;
    padding: 0;
    // position: relative;
  }

  & .sidebar__main {
    position: fixed;
    top: 0px;
    width: 16vw;
    height: 100vh;
    background-color: #4d48fb;
    box-shadow: 1px 1px 10px 0px rgba(94, 94, 94, 1);
    padding: 10px 0 10px;
  }

  & .sidebar__logo_box {
    height: 60px;
    padding-top: 15px;
  }

  & .sidebar__logo {
    max-width: 50%;
    height: auto;
  }

  & .sidebar__item {
    padding: 13px 20px;
    margin: 5px 0;
    font-size: small;
    font-weight: 100;
    color: #bfbbff;
  }

  & .sidebar__icon {
    margin: 0 0 0 20px;
    font-size: 22px;
    // color: black;
  }

  & .sidebar__p {
    margin: 0 0 0 15px;
    // color: black;
  }

  & .sidebar__admin_grid {
    position: absolute;
    width: 16vw;
    bottom: 0;
  }

  & .sidebar__admin_item {
    text-align: center;
    width: 17vw;
    margin-bottom: 10px;
    font-weight: 100;
    color: #bfbbff;
  }

  & .sidebar__admin_title {
    color: white;
    font-size: 14px;
    font-weight: 100;
  }

  & .sidebar__admin_avatar {
    margin: 15px;
  }

  & .sidebar__admin_desc {
    color: #bfbbff;
    font-size: 12px;
    font-weight: 100;
    margin: 0 0 20px;
  }

  & .sidebar__logout_button {
    text-align: center;
    width: 130px;
    height: 35px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 100;
    color: white;
    border: 0;
    background-color: #3023d5;
    margin-bottom: 55px;
    padding: 0 0 0px;
  }

  button:focus {
    outline: 0;
  }

  button:hover {
    box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
  }
`;
export default Wrapper;
