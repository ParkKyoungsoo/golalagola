import React, { useContext, useState } from 'react';
import Axios from 'axios';

import { Grid, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Wrapper from './styles';
import { useHistory, useParams } from 'react-router-dom';
import { ViewContext } from '../../../context/ViewContext';
import { CommonContext } from '../../../context/CommonContext';
import { ContinuousColorLegend } from 'react-vis';
import { BsSearch } from 'react-icons/bs';
const Search = () => {
  return <BsSearch />;
};
const SearchComponent = () => {
  let history = useHistory();
  let location = useParams();
  const { mainUrl } = useContext(CommonContext);
  const TopSearchCloseHandler = e => {
    if (e.target.type !== 'text') {
      return;
    }
  };
  const click = () => {
    console.log(123);
  };
  const onKeyPress = currentPathname => e => {
    if (e.key === 'Enter') {
      // 만약에 서치에서 또 서치를 하면
      if (currentPathname.pathname.includes('SearchResult')) {
        history.replace(`${e.target.value}`);
      }
      // 만약에 디테일에서 서치를 하면
      else if (currentPathname.pathname.includes('VoteItemDetail')) {
        history.replace('');
        history.replace('');
        history.replace(`SearchResult/${e.target.value}`);
      }
      // 아니라면
      else {
        history.replace(`SearchResult/${e.target.value}`);
      }
    }
  };

  return (
    <Wrapper>
      <Grid
        container
        // direction="row"
        className="search-component-grid"
        onClick={TopSearchCloseHandler}
      >
        {/* <Grid item>
          <Grid container spacing={1} alignItems="flex-end"> */}
        {/* <Grid item xs={3}>
              <SearchIcon
                className="search-component-grid-item-se-icon"
                fontSize="large"
              />
            </Grid> */}

        <Grid item xs={9}>
          <TextField
            placeholder="Search..."
            autoFocus={true}
            onKeyPress={onKeyPress(history.location)}
            className="input2"
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default SearchComponent;
