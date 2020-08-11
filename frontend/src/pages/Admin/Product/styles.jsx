import styled from 'styled-components';

const Wrapper = styled.div`
  * {
    font-family: 'Noto sans KR', sans-serif;
    margin: 0;
    padding: 0;
  }
  & .admin_product__main {
    background-color: #efeff5;
    height: 100vh;
    width: 100vw;
  }
  & .admin_product__content {
    background-color: #efeff5;
    width: 85vw;
    height: 100%;
    padding: 41px 3vw 6vh 3vw;
    margin-left: 15vw;
  }
  & .admin_product__header {
    font-weight: 100;
  }
  & .admin_product__divider {
    margin: 15px 10px 10px;
  }
  & .admin_product__table {
    width: 2000px;
  }
  & .admin_product__detail--grid {
    padding: 20px;
    border-left: 10px solid #4d48fb;
  }
  & .admin_product__detail--image_grid {
    text-align: right;
  }
  & .admin_product__detail--image {
    width: 20vw;
    margin-right: 30px;
  }
  & .admin_product__detail--title {
    //
  }
  & .admin_product__detail--category {
    //
  }
  & .admin_product__detail--amount {
    //
  }
  & .admin_product__detail--expiration {
    //
  }
  & .admin_product__detail--desc {
    //
  }
  & .admin_product__detail--sale {
    //
  }
  & .admin_product__detail--desc {
    //
  }
`;

export default Wrapper;
