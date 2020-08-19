import React from 'react';

import { Grid, TextField, useMediaQuery } from '@material-ui/core';
import Wrapper from './styles';
import { useHistory } from 'react-router-dom';
const SearchComponent = () => {
  let history = useHistory();
  const isMobile = useMediaQuery('(max-width:960px)');
  const TopSearchCloseHandler = e => {
    if (e.target.type !== 'text') {
      return;
    }
  };

  const onKeyPress = currentPathname => e => {
    if (e.key === 'Enter') {
      // 만약에 서치에서 또 서치를 하면
      if (currentPathname.pathname.includes('searchresult')) {
        history.push(`${e.target.value}`);
      }
      // 만약에 디테일에서 서치를 하면
      else if (currentPathname.pathname.includes('voteitemdetail')) {
        history.push(`/searchresult/${e.target.value}`);
      }
      // 아니라면
      else {
        history.push(`/searchresult/${e.target.value}`);
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
          // className="input2"
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
              // className="input2"
              style={{
                height: '5vh',
                width: '10vw',
              }}
            />
          </Grid>
        </Grid>
      )}
    </Wrapper>
  );
};

export default SearchComponent;
