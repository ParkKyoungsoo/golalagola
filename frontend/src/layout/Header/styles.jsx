import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  z-index: 1300;
  height: 8vh;
  .mobileFont {
    font-size: 3.5vw;
    margin: auto;
  }
  .navbarBoxShdow {
    -webkit-box-shadow: 0px 0.5px 2px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0px 0.5px 2px 0px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0.5px 2px 0px rgba(0, 0, 0, 0.5);
  }
  .headerColor {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f2f2f2;
    color: black;
    height: 8vh;
  }

  .display-none {
    display: none;
  }
  .mobileHome {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-end;
  }

  & .mobileSearchIcon {
    cursor: pointer;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-end;
  }
  .navbarCentering {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    height: 8vh;
  }
  .navbarAround {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    height: 8vh;
  }

  .navbarRight {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    // justify-content: center;
  }

  & .display-none {
    display: none;
  }
  & .hide {
    display: none;
  }
  & .logo {
    cursor: pointer;
  }
  & .menu-button {
    position: fixed;
    left: 30px;
    top: 1.5vh;
    z-index: 1300;
    margin-left: 0;
    width: 23px;
    height: 20px;
    cursor: pointer;
    & div {
      width: 100%;
      height: 3px;
      background: #fff;
      border-radius: 30px;
      /* transition: all 0.4s ease; */
      &:nth-child(1) {
        /* transition: all 0.4s ease; */
      }
      &:nth-child(2) {
        /* transition: all 0.4s ease; */
      }
      &:nth-child(3) {
        /* transition: all 0.4s ease; */
      }
    }
    &.on {
      z-index: 99999;
      & div {
        background: #000;
        /* transition: all 0.4s ease; */
        &:nth-child(1) {
          transform: translateY(8.5px) rotate(-315deg);
        }
        &:nth-child(2) {
          opacity: 0;
        }
        &:nth-child(3) {
          transform: translateY(-8.5px) rotate(315deg);
        }
      }
    }
  }

  & .appbar {
    width: 80%;
    transition: all 0.3s ease;
    // box-sizing: border-box;

    &.appbar-shift {
      width: calc(100% -280px);
      margin-left: 280px;
    }
    & .title {
      flex-grow: 1;
    }
  }
  & .header-button {
    // margin-right: 12px;
    font-weight: normal;
    box-shadow: none;
    // letter-spacing: 1px;
    text-transform: none;
    opacity: 0.7;
    transition: all 0.2s;
    &:hover {
      opacity: 1;
      background: none;
      box-shadow: none;
    }
  }

  & .header-location-searchbar {
    height: 100px;
  }
  & .container {
    width: 500px;
  }

  @media (min-width: 960px) {
    & .display-none {
      display: block;
    }
  }
  @media (max-width: 960px) {
    & .logo {
      // position: absolute;
      // left: 50%;
      // top: 8px;
      transform: translate(-50%);
      padding-left: 0 !important;
    }
  }
`;

export default Wrapper;
