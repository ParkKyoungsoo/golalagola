import React, { Component, useState, useContext, useEffect } from 'react';
import Header from '../../layout/Header';
import Wrapper from './styles';

const Result = ({match}) => {
  return(
    <Wrapper>
      < Header />
      <h1><p>{match.params.searchValue}</p></h1>
    </Wrapper>
  )
};

export default Result;
