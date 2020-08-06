import styled from 'styled-components';

const Wrapper = styled.div`
  // & .BoxCss {
  //   border: 1px solid red;
  // }

  & .img-box {
    height: 100%;
    width: 100%;
  }

  .thro {
    text-decoration: line-through;
    color: gray;
    margin-right: 10px;
    font-size: 180%;
    margin-left: 15px;
  }
  .cate {
    font-size: 120%;
  }
  .price {
    font-size: 300%;
  }
  .unit1 {
    font-size: 200%;
  }
  .unit2 {
    font-size: 150%;
  }
  .sale {
    font-size: 200%;
  }
  .select {
    word-break: break-all;
  }
`;

export default Wrapper;
