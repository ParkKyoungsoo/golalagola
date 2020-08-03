import styled from 'styled-components';

const Wrapper = styled.div`
  & .MuiTabs-indicator {
    display: none;
  }
  & .appbar {
    top: 48px;
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
    min-width: 140px;
    width: 140px;
  }
  & .tab-panel {
    padding: 170px 0 20px 0;
  }
  .mainvote-orderlist {
    border: 1px solid black;
  }
`;

export default Wrapper;
