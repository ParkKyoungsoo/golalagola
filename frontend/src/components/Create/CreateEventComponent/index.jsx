import React, { useState, useContext, useEffect } from 'react';
import {
  Grid,
  createMuiTheme,
  ThemeProvider,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import Wrapper from './styles';
import { CommonContext } from '../../../context/CommonContext';
import axios from 'axios';

const themeSubTitleGroupComponent = createMuiTheme({
  overrides: {
    MuiFormControlLabel: {
      root: {
        marginLeft: 0,
        marginRight: 0,
      },
    },
  },
});

const InputTitleComponent = () => {
  const { newEventData, productDatas, serverImgUrl } = useContext(
    CommonContext,
  );

  return (
    <Wrapper>
      <Grid style={{ display: 'flex' }}>
        <Grid item xs={4}>
          {Object(productDatas[newEventData.event_prod_A - 1]).prod_image !==
          undefined ? (
            <img
              src={`${serverImgUrl}${
                Object(productDatas[newEventData.event_prod_A - 1]).prod_image
              }`}
              alt="productA.jpg"
              style={{ height: '100%', width: '100%' }}
            />
          ) : // <h2>상품 A 사진</h2>
          null}
        </Grid>
        <Grid item xs={2} container justify="center" alignItems="center">
          <h1>VS</h1>
        </Grid>
        <Grid item xs={4}>
          {Object(productDatas[newEventData.event_prod_B - 1]).prod_image !==
          undefined ? (
            <img
              src={`${serverImgUrl}${
                Object(productDatas[newEventData.event_prod_B - 1]).prod_image
              }`}
              alt="productA.jpg"
              style={{ height: '100%', width: '100%' }}
            />
          ) : // <h2>상품 B 사진</h2>
          null}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SubTitleGroupComponent = () => {
  const { newEventData, setNewEventData, productDatas } = useContext(
    CommonContext,
  );

  const [filterADatas, setFilterADatas] = useState([]);
  const [filterBDatas, setFilterBDatas] = useState([]);

  const [progressedItem, setProgressedItem] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`https://i3b309.p.ssafy.io/api/event/eventProd`)
        .then(res => {
          setProgressedItem(res.data);
        });
    }
    fetchData();
  }, []);

  const handleChangeA = e => {
    setNewEventData({
      ...newEventData,
      event_prod_A: e.target.value,
    });
  };
  const handleChangeB = e => {
    setNewEventData({
      ...newEventData,
      event_prod_B: e.target.value,
    });
  };

  const test = () => {
    setFilterADatas(
      productDatas.filter(
        product =>
          !progressedItem.includes(product.prod_id) &&
          product.prod_category === newEventData.event_category &&
          product.prod_id !== newEventData.event_prod_B,
      ),
    );
  };

  const test2 = () => {
    setFilterBDatas(
      productDatas.filter(
        product =>
          !progressedItem.includes(product.prod_id) &&
          product.prod_category === newEventData.event_category &&
          product.prod_id !== newEventData.event_prod_A,
      ),
    );
  };
  useEffect(() => {
    test();
    test2();
  }, [newEventData]);

  return (
    <Wrapper>
      <ThemeProvider theme={themeSubTitleGroupComponent}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={4}>
            <h2>상품 A 선택</h2>
            <Divider
              variant="fullWidth"
              orientation="horizontal"
              className="sub-title-group-component-divider"
            />
            <FormControl className="form-control">
              <InputLabel id="A-label">상품 A</InputLabel>
              <Select
                labelId="A-label"
                value={productDatas.prod_id}
                onChange={handleChangeA}
                displayEmpty
                className="select-empty"
                required
              >
                <MenuItem value={0} disabled>
                  카테고리
                </MenuItem>

                {filterADatas.map((data, index) => (
                  <MenuItem key={index} value={data.prod_id}>
                    {data.prod_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}>
            <h2>상품 B 선택</h2>
            <Divider
              variant="fullWidth"
              orientation="horizontal"
              className="sub-title-group-component-divider"
            />
            <FormControl className="form-control">
              <InputLabel id="B-label">상품 B</InputLabel>
              <Select
                labelId="B-label"
                value={productDatas.prod_id}
                onChange={handleChangeB}
                displayEmpty
                className="select-empty"
                required
              >
                <MenuItem value={0} disabled>
                  Select category
                </MenuItem>

                {filterBDatas.map((data, index) => (
                  <MenuItem key={index} value={data.prod_id}>
                    {data.prod_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Wrapper>
  );
};

const SelectCategoryComponent = () => {
  const { categoryDatas, newEventData, setNewEventData } = useContext(
    CommonContext,
  );

  const handleChange = e => {
    setNewEventData({
      event_prod_A: '',
      event_prod_B: '',
      event_date: '',
      event_expire: '',
      event_category: e.target.value,
    });
  };

  return (
    <Wrapper>
      <FormControl className="form-control">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={newEventData.event_category}
          onChange={handleChange}
          displayEmpty
          className="select-empty"
          required
        >
          <MenuItem value={0} disabled>
            카테고리 선택
          </MenuItem>

          {categoryDatas.map((data, index) => (
            <MenuItem key={index} value={data.cat_id}>
              {data.cat_title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Wrapper>
  );
};

const CreateVoteMainComponent = () => {
  return (
    <Wrapper className="create-vote-main-component">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3} style={{ margin: '20px' }}>
              <SelectCategoryComponent />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          className="create-vote-main-component-grid-item"
          style={{ margin: '20px' }}
        >
          <SubTitleGroupComponent />
        </Grid>
        <Grid item xs={12} style={{ margin: '20px' }}>
          <InputTitleComponent />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const CreateVoteComponent = () => {
  return (
    <Grid
      container
      direction="row-reverse"
      justify="center"
      alignItems="flex-start"
      spacing={2}
    >
      <Grid item xs={12} sm={9}>
        <CreateVoteMainComponent />
      </Grid>
    </Grid>
  );
};

export default CreateVoteComponent;
