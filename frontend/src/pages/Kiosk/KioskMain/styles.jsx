import styled from 'styled-components';

const Wrapper = styled.div`

  & .Nav_bar {
    display:flex;
    // justify-content: flex-start;
	  // justify-content: flex-end;
    // justify-content: center;
	  // justify-content: space-between;
    justify-content: space-around;
    // justify-content: space-evenly;
    
  }

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
    padding: 0px 10px 0px 10px;
  }
`;

export default Wrapper;