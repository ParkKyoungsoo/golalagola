import React, { useContext } from 'react';
import Axios from 'axios';

import { Grid, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Wrapper from './styles';

import { ViewContext } from '../../../context/ViewContext';
import { useHistory, Link, Redirect } from 'react-router-dom';

const SearchComponent = () => {
  const { searchValue, setSearchValue } = useContext(ViewContext);

  const TopSearchCloseHandler = e => {
    if (e.target.type !== 'text') {
      return;
    }
  };
  // const onClick = () => {
  //   return <Link to={`SearchResult/${searchValue}`}></Link>;
  // };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log(e.target.value)
      window.location.href=`SearchResult/${e.target.value}`;
      // return <Redirect to={`SearchResult/${e.target.value}`}/>;
      // return <Link to={`SearchResult/${e.target.value}`}/>;
    }
    // setSearchValue(e.target.value);
    // console.log(searchValue);
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
