import styled from 'styled-components';

const Wrapper = styled.div`
  .mobilefontMedium {
    font-size: 3vw;
    font-weight: 500;
  }
  .mobilefontLarge {
    font-size: 5vw;
    font-weight: bold;
  }
  .fontMedium {
    font-size: 2vw;
    font-weight: 500;
  }
  .fontLarge {
    font-size: 4vw;
    font-weight: bold;
  }
  .fontCancelLine {
    text-decoration:line-through;
    opacity:50%;
  }
  .fontVerticalMiddle {
    margin: auto 0;
  }
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
