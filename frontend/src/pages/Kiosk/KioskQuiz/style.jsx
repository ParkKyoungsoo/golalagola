import styled from 'styled-components';

const Wrapper = styled.div`
& .quizCentering {
    display:flex;
    justify-content: center;
	// justify-content: space-around;
	// justify-content: space-evenly;
  }
& .button1 {
  // border: 4px solid red;
  background: black;
  margin: 0px 5px;
}

& .button2 {
  // border: 2px solid green;
  background: black;
  margin: 0px 5px 0px 5px;
}
& .tmp {
  width: 100%; 
  height: auto; 
  border-radius: 20%;
  
}
`;

export default Wrapper;