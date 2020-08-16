import styled from 'styled-components';

const Wrapper = styled.div`
  .Centering {
    display: flex;
    align-items: center;
    justify-content: center;
  }

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
  .m_price {
    font-size: 200%;
  }
  .price2 {
    font-size: 300%;
  }
  .m_unit {
    font-size: 160%;
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
    padding: 15px 20px;
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
  .button {
    text-align: right;
  }
  .w_DCT {
    font-size: 20px;
  }
  .w_DCP {
    color: #f68a09;
    font-size: 20px;
  }
  .loading1 span {
    font-size: 40px;
    color: #ef001e;
    display: inline-block;
    animation: loading1 0.8s infinite;
  }
  .loading2 span {
    font-size: 40px;
    color: #ef001e;
    display: inline-block;
    animation: loading2 1s infinite;
  }
  .loading1 span:nth-child(2) {
    animation-delay: 0.1s;
  }
  .loading1 span:nth-child(3) {
    animation-delay: 0.2s;
  }
  .loading1 span:nth-child(4) {
    animation-delay: 0.3s;
  }
  .loading1 span:nth-child(5) {
    animation-delay: 0.4s;
  }
  .loading1 span:nth-child(6) {
    animation-delay: 0.5s;
  }
  .loading2 span:nth-child(2) {
    animation-delay: 1s;
  }
  @keyframes loading2 {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(15px);
    }
  }
  @keyframes loading1 {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(15px);
    }
  }
  .mST {
    color: #ef001e;
    font-size: 40px;
  }
  .mSP {
    color: #ef001e;
    font-size: 40px;
  }
  .BOX {
    border: 1px;
  }
  & .FiberManualRecordIcon {
  }
`;

export default Wrapper;
