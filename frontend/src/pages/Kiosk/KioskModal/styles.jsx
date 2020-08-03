import styled from 'styled-components';

const Wrapper = styled.div`
  & .KisokCentering {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    // background-color: green;
  }

  & .tmp {
    width: 100%; 
    height: auto; 
    border-radius: 5%;
    padding: 10px
  }
`;

export default Wrapper;