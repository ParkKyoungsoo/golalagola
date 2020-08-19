import styled from 'styled-components';
const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  flex-grow: 1;
  .titleHeight {
    height: 10vh;
  }
  .doubleLine {
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .mobilefontMedium {
    padding: 1vh 0 0 0;
    font-size: 3vw;
    font-weight: 500;
  }
  .mobilefontLarge {
    font-size: 5vw;
    font-weight: bold;
  }
  .fontMedium {
    padding: 1vh 0 0 0;
    font-size: 1.5vw;
    font-weight: 500;
  }
  .fontLarge {
    font-size: 2vw;
    font-weight: bold;
  }
  .fontCancelLine {
    text-decoration:line-through;
    opacity:50%;
  }
  .fontVerticalMiddle {
    margin: auto 0;
    padding : 0;
  }
  .btn-check {
    position: absolute;
    left: 0;
    top: 0;
    width: 32px;
    height: 32px;
    padding: 0;
    background: #44b700;
    border: none;
    outline: none;
    cursor: pointer;
    & .check {
      display: none;
      padding: 0;
      margin: 0 auto;
      color: #fff;
    }
    &.on {
      & .check {
        display: block;
        color: #fff;
      }
    }
  }
  .date {
    position: absolute;
    right: 2px;
    top: -30px;
    height: 30px;
    line-height: 30px;
    padding: 0 10px 0 40px;
    background: #fff url('/images/timer_icon.png') no-repeat left 5px center;
    background-size: 24px;
    font-size: 14px;
    transition: all 0.3s ease;
    border-radius: 4px;
    opacity: 0;
    border: 1px solid #e1e1e1;
  }
  .img-box {
    cursor: pointer;
    &:hover {
      & .date {
        &.on {
          top: 2px;
          opacity: 1;
        }
      }
    }
  }
  .large {
    width: 100%
    height: 100%;
    border-radius: 5px;
  }
  .large2 {
  }
  .large3 {
    border: solid 5px green;
  }
  // .img {
  //   // width: 100%;
  //   object-fit: cover;
  //   // height: 395px;
  //   border-radius: 5px;
  //   transition: transform 0.3s ease;
  //   &:hover {
  //     transform: scale(1.1);
  //     & .date {
  //       max-width: 200px;
  //       width: 100%;
  //       height: 40px;
  //       background: #fff;
  //     }
  //   }
    &.deactivated {
      filter: brightness(1);
    }
  }
  .info-open-handler-grid {
  }
  .info-open-handler-grid-item-bottom {
    &.deactivated {
      opacity: 0.5;
    }
  }
  .info-open-handler-grid-item-typography1 {
    padding: 10px 0 0 0;
    font-weight: bold;
    font-size: 13px;
    font-family: 'Noto Sans KR', sans-serif;
    color: #191919;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }
  .info-open-handler-grid-item-typography2 {
    font-size: 11px;
    font-weight: 700;
    // padding: 0 10px 0 2px;
    color: #696969;
  }
  .info-open-handler-grid-item-typography3 {
    font-size: 11px;
    font-weight: 700;
    color: #696969;
  }
  .info-open-handler-grid-item-grid {
    margin-top: 5px;
  }
  .info-open-handler-grid-item-fa-icon {
    font-size: 17px;
    color: #696969;
  }
  .info-open-handler-grid-item-vi-icon {
    font-size: 21px;
    padding-right: 5px;
    color: #696969;
  }
  @media (max-width: 600px) {
    img {
      height: unset;
      // min-height: 480px;
    }
  }
  .effect {
    position: relative;
    display: inline-block;
    overflow: hidden; /* 불필요한 부분 가리기 */
    padding: 1px;
  }
  .effect:after {
    content: '';
    position: absolute;
    font-size: 20px;
    z-index: 1;
    width: 300px;
    height: auto;
    background: green;
    content: 'Event'; /* 보여주는 텍스트 */
    text-align: center;
    color: #fff;
    font-family: 'Arial';
    font-weight: bold;
    padding: 10px 15px;
    left: -90px;
    top: 3px;
    transform: rotate(-30deg);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
  .m_effect {
    position: relative;
    display: inline-block;
    overflow: hidden; /* 불필요한 부분 가리기 */
    padding: 1px;
    
  }
  .m_effect:after {
    content: '';
    position: absolute;
    font-size: 20px;
    z-index: 1;
    width: 300px;
    height: auto;
    background: green;
    content: 'Event'; /* 보여주는 텍스트 */
    text-align: center;
    color: #fff;
    font-family: 'Arial';
    font-weight: bold;
    padding: 10px 15px;
    left: -90px;
    top: 3px;
    transform: rotate(-30deg);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
`;
export default Wrapper;
