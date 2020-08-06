import styled from 'styled-components';

const Wrapper = styled.div`
  .Nav_bar {
    display: flex;
    // justify-content: flex-start;
    // justify-content: flex-end;
    justify-content: center;
    // justify-content: space-between;
    // justify-content: space-around;
    // justify-content: space-evenly;
    margin: 2vh;
  }

  .KisokCentering {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    // background-color: green;
  }

  .tmp {
    width: 35vw;
    height: auto;
    border-radius: 5%;
    margin: 0 1vw 0 1vw;
  }
`;

export default Wrapper;
