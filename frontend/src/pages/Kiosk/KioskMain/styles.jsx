import styled from 'styled-components';

const Wrapper = styled.div`
  & .Nav_bar {
    display: flex;
    justify-content: space-around;
  }

  & .KisokCentering {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  & .tmp {
    width: 35vw 
    height: auto;
    border-radius: 5%;
    padding: 0px 10px 0px 10px;
  }
`;

export default Wrapper;
