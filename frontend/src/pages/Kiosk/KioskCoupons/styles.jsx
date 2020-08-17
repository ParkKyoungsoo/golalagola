import styled from 'styled-components';

const KioskCSS = styled.div`
  & .Nav_bar {
    display: flex;
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

  & .boxType {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 1rem;
    border: 1px solid;
    // background-color: green;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    // min-height: 100vh;
    background-color: #ffffff;
  }

  .loader {
    max-width: 8rem;
    width: 100%;
    height: auto;
    stroke-linecap: round;
  }

  circle {
    fill: none;
    stroke-width: 3.5;
    animation-name: preloader;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    transform-origin: 170px 170px;
    will-change: transform;

    &:nth-of-type(1) {
      stroke-dasharray: 550px;
    }

    &:nth-of-type(2) {
      stroke-dasharray: 500px;
    }

    &:nth-of-type(3) {
      stroke-dasharray: 450px;
    }

    &:nth-of-type(4) {
      stroke-dasharray: 300px;
    }

    @for $i from 1 through 4 {
      &:nth-of-type(#{$i}) {
        animation-delay: -#{$i * 0.15}s;
      }
    }
  }

  @keyframes preloader {
    50% {
      transform: rotate(360deg);
    }
  }
`;

export default KioskCSS;
