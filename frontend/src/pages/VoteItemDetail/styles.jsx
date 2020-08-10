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
  .price1 {
    font-size: 130%;
  }
  .price2 {
    font-size: 300%;
  }
  .m_unit {
    font-size: 150%;
  }
  .m_cate {
    font-size: 100%;
  }
  .m_thro {
    text-decoration: line-through;
    color: gray;
    margin-right: 10px;
    font-size: 100%;
    margin-left: 15px;
  }
  .m_sale {
    font-size: 100%;
  }
  .m_unit2 {
    font-size: 120%;
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
  .button {
    font-size: 10px;
    padding: 10px 10px;
  }
`;

export default Wrapper;
