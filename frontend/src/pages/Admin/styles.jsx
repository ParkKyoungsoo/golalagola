import styled from 'styled-components';

const Wrapper = styled.div`
  * {
    margin: 0;
    padding: 0;
  }

  button:focus {
    outline: 0;
  }

  & .admin_chart__main {
    background-color: #efeff5;
    height: 100vh;
    // width: 100vw;
  }

  & .admin_chart__content {
    background-color: #efeff5;
    // width: 84vw;
    height: 100%;
    padding: 41px 3vw 0 3vw;
    // margin-left: 16vw;
    font-size: 14px;
  }

  & .admin_chart__header {
    font-weight: 100;
  }

  & .admin_chart__divider {
    margin: 15px 10px 10px;
  }

  & .admin_chart__chart_box {
    overflow: hidden;
  }

  & .admin_chart__chart_1 {
    transform: translateY(20px);
  }

  & .admin_chart__chart_2 {
    transform: translateY(50px);
  }

  & .admin_chart__detail--image_grid {
    text-align: right;
  }

  & .admin_chart__detail--image {
    width: 20vw;
    margin-right: 30px;
  }
`;

export default Wrapper;
