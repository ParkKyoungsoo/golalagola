import styled from 'styled-components';

export const Wrapper = styled.div`
  .Nav_bar {
    // background-color: blue;
    display: flex;
    // justify-content: flex-start;
    justify-content: flex-end;
    // justify-content: center;
    // justify-content: space-between;
    // justify-content: space-around;
    // justify-content: space-evenly;
    padding: 20px 0px 20px 0px;
  }
  & .icon_pointer {
    cursor: pointer;
  }
`;

export const Close = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;

export const Date = styled.span`
  position: absolute;
  right: 44px;
  top: -2px;
  z-index: 99999;
  & > span {
    display: block;
    padding: 0 10px 0 40px;
    height: 30px;
    line-height: 30px;
    background: url('/images/timer_icon_w.png') no-repeat left 3px center;
    background-size: 24px;
    color: #fff;
    font-size: 14px;
  }
`;
