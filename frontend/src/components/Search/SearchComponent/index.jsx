import React, { useContext } from 'react';
import Axios from 'axios';

import { Grid, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Wrapper from './styles';
import { useHistory, useParams } from 'react-router-dom';
import { ViewContext } from '../../../context/ViewContext';
import { CommonContext } from '../../../context/CommonContext';
import { ContinuousColorLegend } from 'react-vis';

const SearchComponent = () => {
  let history = useHistory();
  let location = useParams();
  const { mainUrl } = useContext(CommonContext);
  const TopSearchCloseHandler = e => {
    if (e.target.type !== 'text') {
      return;
    }
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
        console.log(currentPathname);
        console.log(currentPathname.pathname);
      }
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
                onKeyPress={onKeyPress(history.location)}
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
