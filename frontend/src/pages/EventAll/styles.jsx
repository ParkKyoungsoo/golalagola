import styled from 'styled-components';

const Wrapper = styled.div`
  .eventitemHeight {
    height:35vh;
  }
  .Centering{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .eventall__layout--container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .eventall__layout--coupon_button {

  }
  .mobile_eventall__item--part_event {
    position: absolute;
    background-color: gray;
    width: 100%;
    height: 35vh;
    opacity: 70%;
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    color: white;
    z-index: 3;
  }
  .eventall__item--part_event {
    position: absolute;
    background-color: gray;
    width: 75%;
    height: 35vh;
    opacity: 70%;
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    color: white;
    z-index: 3;
  }

  .mobileEventall__item {
    height: 35vh;
  }
  .eventall__item {
    height: 35vh;
  }
  .eventall__item--part_mention {
    color: white;
    opacity: none;
    font-size: 3vh;
  }


  .eventall__item--vs {
    text-align: center;
    font-weight: 300;
    font-size: 1.5rem;
  }

  .mobileEventall__item--title {
    font-weight: 400;
    font-size: 0.5rem;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .eventall__item--title {
    font-weight: 400;
    font-size: 1rem;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
    overflow:hidden;
    text-overflow:ellipsis;
  }

  .mobileEventall__item--sale {
    color: red;
    font-weight: 700;
    font-size: 0.75rem;
  }
  .eventall__item--sale {
    color: red;
    font-weight: 700;
    font-size: 1.5rem;
  }

  .mobileEventall__item--sale_p {
    color: red;
    font-weight: 400;
    font-size: 0.6rem;
  }
  .eventall__item--sale_p {
    color: red;
    font-weight: 400;
    font-size: 1.2rem;
  }

  .mobileEventall__item--price {
    font-weight: 700;
    font-size: 0.65rem;
  }
  .eventall__item--price {
    font-weight: 700;
    font-size: 1.3rem;
  }

  .mobileEventall__item--price_line {
    text-decoration: line-through
    font-size: 0.45rem;
  }
  .eventall__item--price_line {
    text-decoration: line-through
    font-size: 0.9rem;
  }

  .eventall__item--check_item {
    // border: 1px solid gray
    // border-radius: 0.5rem;
    opacity: 0.5;
  }

  .eventall__check_box {
    position: absolute;
    background-color: green;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    text-align: center;
  }

  .eventall__check_box--none {
    display: none;
  }

  .eventall__check_icon {
    color: white;
    font-size: 3rem;
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
  .mobiletmp {
    -webkit-user-drag: none;
    width: 50%;
    // height: 15vh;
    border-radius: 0.5rem;
    // margin: 0 1vw 0 1vw;
  }
  .tmp {
    -webkit-user-drag: none;
    width: 100%;
    // height: 15vh;
    border-radius: 0.5rem;
    // margin: 0 1vw 0 1vw;
  }

  .mobileEventall__button--column {
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    height: 3vh;
  }
  .eventall__button--column {
    display: flex;
    flex-direction: column;
    font-size: 1rem;
  }

  .eventall__button--icon {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  .eventall__button--icon {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
`;

export default Wrapper;
