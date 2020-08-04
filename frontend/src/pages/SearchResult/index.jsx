import React, { Component, useState, useContext, useEffect } from 'react';
import Header from '../../layout/Header';
import Wrapper from './styles';
import { Grid } from '@material-ui/core';
import { CommonContext } from '../../context/CommonContext';
const Result = ({ match }) => {
  const { productDatas, setProductDatas } = useContext(CommonContext);

  return (
    <Wrapper>
      <Header />
      <Grid>
        {productDatas.map((TmpData, index) => {
          if (match.params.searchValue === TmpData.prod_name) {
            console.log(TmpData);
            return (
              // <p>{TmpData.prod_name}</p>
              // <p>{TmpData.prod_image}</p>
              <Grid>
                <img src={`../../${TmpData.prod_image}`} alt="123" />
              </Grid>
            );
          }
        })}
      </Grid>
    </Wrapper>
  );
};

export default Result;
