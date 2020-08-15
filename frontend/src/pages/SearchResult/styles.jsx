import styled from 'styled-components';

const Wrapper = styled.div`

  .Centering {
    display: flex;
    align-items: center;
    justify-content: center;
  }


& .tmp {
  width: 70%; 
  height: auto; 
  cursor: pointer;
  transform: scale(1);       //default값
  -webkit-transform: scale(1); ////default값
  -moz-transform: scale(1);   //crome
  transition: all 0.2s ease-in-out;
      &:hover {
          transform: scale(1.1);   //hover시 확대되는 범위 조정
          -webkit-transform: scale(1.1);
          -moz-transform: scale(1.1);
}
  .root {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow: hidden;
  }
  .grid-list {
    width: 100%;
  }
  .image-grid-filter-select {
    color: #5d5d5d;
    font-weight: bold;
  }
  .vote-grid-list-grid {
    margin-bottom: 10px;
  }
  .vote-grid-list-grid-item {
    padding: 5px 5px 0 10px;
    color: #5d5d5d;
  }
  .vote-grid-list-grid-item-typography {
    margin-left: 10px;
    font-weight: bold;
  }
`;
export default Wrapper;
