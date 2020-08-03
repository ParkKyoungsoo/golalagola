import styled from 'styled-components';

const Wrapper = styled.div`
  & .textCss {
    text-align: center;
    margin-top: 120px;
    // vertical-align: middle;
  }

  & .checkBox {
    display: flex;
    justify-content: space-around;

    // align-items: space-around;
    // background-color: black;
  }

  & .radio1 {
    margin-right: 230px;
  }

  & .radio2 {
    margin-right: 5px;
  }

  & .BtnCss {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    // background-color: black;
  }

  // & .tmp {
  //   display: block;
  //   width: 500px;
  //   height: auto;
  //   align-items: center;
  //   justify-content: center;
  // }

  & .quizCentering {
    display: flex;
    align-items: center;
    justify-content: center;
    position: buttom:
  }
`;

export default Wrapper;
