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
    padding: 10px 10px;
  }
  .info {
    padding: 10px;
    height: auto;
  }
  .center {
    text-align: center;
  }
  .priceinfo {
    text-align: right;
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
    font-size: 30px;
    z-index: 1;
    width: 300px;
    height: auto;
    background: green;
    content: 'Event'; /* 보여주는 텍스트 */
    text-align: center;
    color: #fff;
    font-family: 'Arial';
    font-weight: bold;
    padding: 15px 20px;
    left: -90px;
    top: 3px;
    transform: rotate(-30deg);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
`;

export default Wrapper;
