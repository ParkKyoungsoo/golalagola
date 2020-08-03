import styled from 'styled-components';

const Wrapper = styled.div`
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
    top: 5px;
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
    min-width: 120px;
    width: 200px;
    // height: 150px;
    
    
      // min-width: 160px;
      // width: 200px;
    
  }
  & .tab-panel {
    // padding: 170px 0 20px 0;
  }
  .mainvote-orderlist {
    border: 1px solid black;
  }
  & .KisokCentering {
    display: flex;
    // flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    // background-color: green;
  }

  & .tmp {
    width: 70%; 
    // height: auto;
    max-height: 50vh; 
    // min-height: 40vh;
    border-radius:5%;
    cursor: pointer;
    transform: scale(1);       //default값
    -webkit-transform: scale(1); ////default값
    -moz-transform: scale(1);   //crome
    transition: all 0.2s ease-in-out;
        &:hover {
            transform: scale(1.1);   //hover시 확대되는 범위 조정
            -webkit-transform: scale(1.1);
            -moz-transform: scale(1.1);
  }
`;

export default Wrapper;
