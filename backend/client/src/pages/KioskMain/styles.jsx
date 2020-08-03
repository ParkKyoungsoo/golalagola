import styled from 'styled-components';

const Wrapper = styled.div`
  & .KisokCentering {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  & .tmp {
    width: 100%; 
    height: auto; 
    
    transform: scale(1);       //default값
    -webkit-transform: scale(1); ////default값
    -moz-transform: scale(1);   //crome
    transition: all 0.2s ease-in-out;
        &:hover {
            transform: scale(1.1);   //hover시 확대되는 범위 조정
            -webkit-transform: scale(1.1);
            -moz-transform: scale(1.1);
  }
`;

export default Wrapper;
