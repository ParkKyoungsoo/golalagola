import styled from 'styled-components';

const Wrapper = styled.div`
  * {
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

  & .admin_event__item--title {
    text-align: center;
    font-weight: 700;
    font-size: 18px;
  }

  & .admin_event__item--desc {
    text-align: center;
    font-weight: 300;
    font-size: 12px;
  }

  & .admin_event__item--image_A {
    max-width: 100px;
    width: auto;
    height: auto;
    border: 1.5px solid #5646ff;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  & .admin_event__item--image_B {
    max-width: 100px;
    width: auto;
    height: auto;
    border: 1.5px solid #fd636d;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  & .admin_event__item--percent_A {
    text-align: center;
    width: 75px;
    color: #5646ff;
    font-size: 30px;
    transform: translateY(-100px);
  }

  & .admin_event__item--percent_B {
    text-align: center;
    width: 75px;
    color: #fd636d;
    font-size: 30px;
    transform: translateY(-100px);
  }

  & .admin_event__item--amount {
    text-align: center;
    width: 75px;
    color: #9097c4;
    font-size: 15px;
    transform: translateY(-100px);
  }

  & .admin_event__item--chart_box {
    overflow: hidden;
    width: 400px;
    height: 200px;
  }

  & .admin_event__item--chart {
    width: 180px;
    transform: translateY(-100px);
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
