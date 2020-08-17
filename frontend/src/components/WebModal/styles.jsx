import styled from 'styled-components';

const Wrapper = styled.div`
  & .inputCss {
    margin-top: 10px;
    justify-content: center;
    text-align: center;
    
  }

  & .imgCss {
    backgroundColor: #f2f2f2;
  }

  & .eventImg {
    border-radius:5px;
    max-width;
    -webkit-box-shadow: 3px 3px 5px 1px rgba(189,189,189,0.68);
  }

  & .EM {
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    backgroundColor: #f2f2f2;
    position:relative;
  }

  & .butt{
    width: 20px;
    height: 20px;
    margin-top:10px;
  }

  & .desCss {
    width: 18vw;
    margin-top: 1vh;
    font-size: 1em;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap; 
  }

  & .textCss {
    display: flex;
    justify-content: center;
    margin-bottom: 1vh;
  }

  & .BtnCss {
    display: flex;
    justify-content: center;
    margin-top: 3vh;
  }

  & .quizCentering {
    display: flex;
    align-items: center;
    justify-content: center;
    position: buttom:
  }

  & .discount {
    color: red;
    justify-content: space-evenly;
    margin-right: 1vw;
  }

  & .price {
    text-decoration: line-through
    color: black;
  }

  & .price2 {
    color: black;
  }

  & .quizCss{
    font-size: 1.5em;
  }
`;

export default Wrapper;
