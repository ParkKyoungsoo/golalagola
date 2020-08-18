import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  GridList,
  Grid,
  MenuItem,
  FormControl,
  Select,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import Wrapper from './styles';
import { useHistory } from 'react-router-dom';
import { CommonContext } from '../../../context/CommonContext';
import { ViewContext } from '../../../context/ViewContext';
import { useNowCols } from '../../../common/MediaQueryHooks';
import { usePrevious } from '../../../common/CommonHooks';
import { useInfiniteScroll } from '../../../common/InfiniteScroll';
import VoteGridItem from './../VoteGridItem/';

const useGetdata = (value, index, categoryData, itemType, itemValue) => {
  const { serverUrl, user, setUser } = useContext(CommonContext);

  const [filterItem, setFilterItem] = useState('default');
  const filterItemPrevious = usePrevious(filterItem);
  const [gridItemDatas, setGridItemDatas] = useState([]);
  const nextToken = useRef(null);
  const isScrollBottom = useInfiniteScroll();

  // commonContext에서 꺼내쓰기 위해 App.js에서 선언한 이름과 똑같이 해줍니다(중괄호 주의)
  //    이부분이 중괄호로 선언되어야 함(App.js에서 선언 : const [productDatas , setProductDatas])
  const { productDatas, setProductDatas } = useContext(CommonContext);

  const getDatas = async () => {
    setGridItemDatas(productDatas);
  };

  const getNextPage = async () => {
    await getDatas();
  };

  const onChangeFilterItem = event => {
    setFilterItem(event.target.value);
  };

  useEffect(() => {
    getDatas();
  }, [value, filterItem, itemValue, user.status, isScrollBottom]);

  return [gridItemDatas, filterItem, onChangeFilterItem];
};

const ImageGridFilter = props => {
  const { filterItem, onChangeFilterItem } = props;

  const items = [
    { key: 'default', value: 'Filter', disabled: true },
    { key: 'recently', value: 'Recently', disabled: false },
    { key: 'comments', value: 'Most comments', disabled: false },
    { key: 'votes', value: 'Most Votes', disabled: false },
  ];

  return (
    <FormControl className="form-control">
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={filterItem}
        onChange={onChangeFilterItem}
        className="image-grid-filter-select"
      >
        {items.map((item, index) => (
          <MenuItem key={item.key} value={item.key} disabled={item.disabled}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const VoteGridList = props => {
  const nowCols = useNowCols();

  const { categoryData, value, index, itemType, itemValue } = props;

  const { productDatas, setProductDatas } = useContext(CommonContext);

  const [gridItemDatas, filterItem, onChangeFilterItem] = useGetdata(
    value,
    index,
    categoryData,
    itemType,
    itemValue,
  );
  const isMobile = useMediaQuery('(max-width:960px)');
  if (value === -1) {
    return (
      <Wrapper className="root">
        {isMobile ? (
          <GridList
            className="grid-list"
            cols={Number.isInteger(nowCols) ? nowCols : 1}
            cellHeight={'auto'}
            style={{
              marginTop: '10px',
            }}
          >
            {productDatas.map((itemData, index) => {
              return (
                <Grid
                  key={index}
                  item
                  xs={6}
                  style={{
                    padding: '0 5vw',
                  }}
                >
                  <VoteGridItem
                    itemData={itemData}
                    index={index}
                    itemType={itemType}
                  />
                </Grid>
              );
            })}
          </GridList>
        ) : (
          <GridList
            className="grid-list"
            cols={Number.isInteger(nowCols) ? nowCols : 1}
            cellHeight={'auto'}
          >
            {productDatas.map((itemData, index) => {
              return (
                <Grid key={index} item xs={3} style={{ padding: '1vh 1vw' }}>
                  <VoteGridItem
                    itemData={itemData}
                    index={index}
                    itemType={itemType}
                  />
                </Grid>
              );
            })}
          </GridList>
        )}
      </Wrapper>
    );
  } else {
    return (
      <Wrapper className="root">
        {isMobile ? (
          <GridList
            className="grid-list"
            cols={Number.isInteger(nowCols) ? nowCols : 1}
            cellHeight={'auto'}
            style={{
              marginTop: '10px',
            }}
          >
            {gridItemDatas.map((itemData, index) => {
              if (itemData.prod_category === value + 1) {
                return (
                  <Grid
                    key={index}
                    item
                    xs={6}
                    style={{
                      padding: ' 5vw',
                    }}
                  >
                    <VoteGridItem
                      itemData={itemData}
                      index={index}
                      itemType={itemType}
                    />
                  </Grid>
                );
              } else {
                return;
              }
            })}
          </GridList>
        ) : (
          <GridList
            className="grid-list"
            cols={Number.isInteger(nowCols) ? nowCols : 1}
            cellHeight={'auto'}
          >
            {gridItemDatas.map((itemData, index) => {
              if (itemData.prod_category === value + 1) {
                return (
                  <Grid key={index} item xs={3}>
                    <VoteGridItem
                      itemData={itemData}
                      index={index}
                      itemType={itemType}
                    />
                  </Grid>
                );
              } else {
                return;
              }
            })}
          </GridList>
        )}
      </Wrapper>
    );
  }
};

export default VoteGridList;
