import React, { useContext } from 'react';
import Axios from 'axios';

import { Grid, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Wrapper from './styles';
import { useHistory } from 'react-router-dom';
import { ViewContext } from '../../../context/ViewContext';
import { CommonContext } from '../../../context/CommonContext';

const SearchComponent = () => {
  // const { searchValue, setSearchValue } = useContext(ViewContext);
  let history = useHistory();
  const {
    mainUrl,
  } = useContext(CommonContext);
  const TopSearchCloseHandler = e => {
    if (e.target.type !== 'text') {
      return;
    }
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log(e.target.value)

        // while
        // e.preventDefault()
        // window.location.href = `${mainUrl}/SearchResult/${e.target.value}`
        // if
        history.replace(`SearchResult/${e.target.value}`)
      
    }
  };

  return (
    <Wrapper>
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
        className="search-component-grid"
        onClick={TopSearchCloseHandler}
      >
        <Grid item>
          <Grid container spacing={1} alignItems="flex-end">
            {/* <Grid item xs={3}>
              <SearchIcon
                className="search-component-grid-item-se-icon"
                fontSize="large"
              />
            </Grid> */}
            <Grid item xs={10}>
              <TextField
                placeholder="Search..."
                autoFocus={true}
                onKeyPress={onKeyPress}
                className="input2"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default SearchComponent;
