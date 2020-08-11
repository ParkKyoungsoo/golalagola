import styled from 'styled-components';

const KioskCSS = styled.div`

& .Nav_bar {
  display:flex;
  justify-content: space-around;
}

& .KioskCard {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

& .buttonType {
  text-align: center;
  align-items: center;
  justify-content: center;
}

& .boxType{
  display: flex;
  flex-direction:column;
  justify-content:space-around;
  align-items: center;
  margin:1rem;
  border:1px solid;
  height: 10rem;
  // background-color: green;
`;

export default KioskCSS;
