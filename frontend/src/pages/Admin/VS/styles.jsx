import styled from 'styled-components';

const Wrapper = styled.div`
  * {
    font-family: 'Noto sans KR', sans-serif;
    margin: 0;
    padding: 0;
  }
  button:focus {
    outline: 0;
  }
  & .admin_event__main {
    background-color: #efeff5;
    height: 100vh;
    width: 100vw;
  }
  & .admin_event__content {
    background-color: #efeff5;
    width: 84vw;
    height: 100%;
    padding: 41px 3vw 0 3vw;
    margin-left: 16vw;
    font-size: 14px;
  }
  & .admin_event__header {
    font-weight: 100;
  }
  & .admin_event__divider {
    margin: 15px 10px 10px;
  }
  & .admin_event__table {
    padding: 0 10px;
    background-color: white;
    width: 100%;
  }
  & .admin_event__table--title {
    font-size: 14px;
  }
  & .admin_event__item--image {
    max-width: 100px;
    width: auto;
    height: auto;
    // border-radius: 5%;
    border-radius: 50%;
  }
  & .admin_event__item--chart {
    max-width: 200px;
    max-height: 200px;
    width: auto;
    height: auto;
    // border-radius: 5%;
    border-radius: 50%;
  }
  & .admin_event__item--divider {
    margin: 15px 0px 10px;
    width: 78vw;
  }
  & .admin_event__detail--grid {
    padding: 20px;
    // border-left: 2px solid #4d48fb;
    box-shadow: inset 0px 7px 8px -10px rgba(0, 0, 0, 0.5),
      inset 0px -7px 8px -10px rgba(0, 0, 0, 0.5);
  }
  & .admin_event__detail--image_grid {
    text-align: right;
  }
  & .admin_event__detail--image {
    width: 20vw;
    margin-right: 30px;
  }
`;

export default Wrapper;
