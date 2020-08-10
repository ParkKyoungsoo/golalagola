import React, { useContext, useState } from 'react';
import Axios from 'axios';

import { Grid, TextField, useMediaQuery } from '@material-ui/core';
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
  const isMobile = useMediaQuery('(max-width:920px)');
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
      console.log(e.target.value);
      // 만약에 서치에서 또 서치를 하면
      if (currentPathname.pathname.includes('SearchResult')) {
        history.push(`${e.target.value}`);
      }
      // 만약에 디테일에서 서치를 하면
      else if (currentPathname.pathname.includes('VoteItemDetail')) {
        history.push(`/SearchResult/${e.target.value}`);
      }
      // 아니라면
      else {
        history.push(`/SearchResult/${e.target.value}`);
      }
    }
  };

  return (
    <Wrapper>
      {isMobile ? (
        <TextField
          placeholder="Search..."
          autoFocus={true}
          onKeyPress={onKeyPress(history.location)}
          className="input2"
          style={{ width: '100px' }}
        />
      ) : (
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
      )}
    </Wrapper>
  );
};

export default SearchComponent;
