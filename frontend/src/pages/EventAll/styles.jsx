import styled from 'styled-components';

const Wrapper = styled.div`
  .Nav_bar {
    display: flex;
    // justify-content: flex-start;
    // justify-content: flex-end;
    // justify-content: center;
    // justify-content: space-between;
    // justify-content: space-around;
    justify-content: space-evenly;
    margin: 10px 0px;
  }

  .Event1 {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    // background-color: green;
  }
  .Event2 {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    // justify-content: space-evenly;
    // background-color: green;
  }
  .tmp {
    width: 15vw;
    // height: 15vh;
    border-radius: 5%;
    margin: 0 1vw 0 1vw;
  }
  .mobileButton {
    position: fixed;
    right: 10px;
    // top: 3.5vh;
  }
  .webButton {
    position: fixed;
    right: 0px;
    // top: 3.5vh;
  }
  .sideBarColumn {
    display: flex;
    flex-direction: column;
  }
  .sideBarIcon {
    display: flex;
    justify-content: center;
  }
`;

export default Wrapper;
