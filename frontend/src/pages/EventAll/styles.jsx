import styled from 'styled-components';

const Wrapper = styled.div`
  .eventall__layout-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .eventall__item--part_event {
    position: absolute;
    display: flex;
    background-color: gray;
    width: 100%;
    height: 25vh;
    opacity: 70%;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    color: white;
    z-index: 3;
  }

  .eventall__item--part_mention {
    color: white;
    opacity: none;
    font-size: 3vh;
  }

  .eventall__item {
    // position: absolute;
    height: 25vh;
  }

  .eventall__item--check_item {
    border: 1px solid green;
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
    width: 100%;
    // height: 15vh;
    // border-radius: 5%;
    // margin: 0 1vw 0 1vw;
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
