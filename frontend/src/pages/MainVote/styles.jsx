import styled from 'styled-components';

export const Wrapper = styled.div`
  .test {
    background-color: red;
  }
  .liveTimeBar {
    display: flex;
    justify-content: center;
  }

  .tiemPopularity {
    display: flex;
    // flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 20px 0px 20px 0px;
  }
  & .MuiTabs-indicator {
    display: none;
  }
  & .appbar {
    // top: 5px;
    box-shadow: none;
    /* transition: all 0.4s; */
    &.appbar-shift {
      width: calc(100% -280px);
      margin-left: 280px;
      /* transition: all 0.4s; */
    }
  }
  & .tab {
    padding: 0;
    margin: 10px 5px;
    border-radius: 5px;
    // min-width: 120px;
    // width: 200px;
  }
  & .tab-panel {
    // padding: 170px 0 20px 0;
  }
  .mainvote-orderlist {
    border: 1px solid black;
  }
  .Centering {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tmp {
    // height: 45vh;
    width: 100%;

    height: auto;
    // width: 25vw
    // max-height: 50vh;
    // min-height: 30vh;
    // border-radius:5%;
    // cursor: pointer;
    // transform: scale(1);       //default값
    // -webkit-transform: scale(1); ////default값
    // -moz-transform: scale(1);   //crome
    // transition: all 0.2s ease-in-out;
    //     &:hover {
    //         transform: scale(1.1);   //hover시 확대되는 범위 조정
    //         -webkit-transform: scale(1.1);
    //         -moz-transform: scale(1.1);
  }
`;

export const MobileWrapper = styled.div`
   {
    .liveTimeBar {
      display: flex;
      justify-content: space-evenly;
    }
    .tiemPopularity {
      display: flex;
      // flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding: 20px 0px 20px 0px;
    }
    & .MuiTabs-indicator {
      display: none;
    }
    & .appbar {
      // top: 5px;
      box-shadow: none;
      /* transition: all 0.4s; */
      &.appbar-shift {
        width: calc(100% -280px);
        margin-left: 280px;
        /* transition: all 0.4s; */
      }
    }
    & .tab {
      padding: 0;
      margin: 0px 5px;
      border-radius: 5%;
      // min-width: 120px;
      width: 120px;
    }
    & .tab-panel {
      // padding: 170px 0 20px 0;
    }
    .mainvote-orderlist {
      border: 1px solid black;
    }
    .Centering {
      display: flex;
      // flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      // background-color: green;
    }
    .mobiletmp {
      // background-color: green;
      width: 100%;
      height: auto;
      // max-height: 50vh;
      // min-height: 30vh;
      // border-radius:5%;
      // cursor: pointer;
      // transform: scale(1);       //default값
      // -webkit-transform: scale(1); ////default값
      // -moz-transform: scale(1);   //crome
      // transition: all 0.2s ease-in-out;
      //     &:hover {
      //         transform: scale(1.1);   //hover시 확대되는 범위 조정
      //         -webkit-transform: scale(1.1);
      //         -moz-transform: scale(1.1);
    }
  }
`;
