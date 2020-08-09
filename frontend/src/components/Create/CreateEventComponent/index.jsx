import React, { useState, useContext, useCallback, useEffect } from 'react';
import {
  Paper,
  Grid,
  Avatar,
  createMuiTheme,
  ThemeProvider,
  Fab,
  Divider,
  FormControlLabel,
  Checkbox,
  Input,
  Select,
  MenuItem,
  FormControl,
} from '@material-ui/core';
import Wrapper from './styles';
import RadioButtonsGroup from './../RadioButtonsGroup/index';
import StartDateTimePicker from '../StartDateTimePicker';
import EndDateTimePicker from '../EndDateTimePicker';
import { CommonContext } from '../../../context/CommonContext';
import { ViewContext } from '../../../context/ViewContext';
import { useDropzone } from 'react-dropzone';
import NavigationIcon from '@material-ui/icons/Navigation';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

import categoryDats from './dump.json';

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
  const { newEventData, setNewEventData } = useContext(CommonContext);
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const [productImage, setProductImage] = useState();

  return (
    <Wrapper>
      <Grid style={{ display: 'flex' }}>
        <Grid item xs={5}>
          {Object(productDatas[newEventData.event_prod_A - 1]).prod_image !==
          undefined ? (
            <img
              src={`https://i3b309.p.ssafy.io/${
                Object(productDatas[newEventData.event_prod_A - 1]).prod_image
              }`}
              alt="productA.jpg"
              style={{ height: '200px', width: '200px' }}
            />
          ) : (
            <h1>상품 A</h1>
          )}
        </Grid>
        <Grid item xs={2}>
          <h1>VS</h1>
        </Grid>
        <Grid item xs={5}>
          {Object(productDatas[newEventData.event_prod_B - 1]).prod_image !==
          undefined ? (
            <img
              src={`https://i3b309.p.ssafy.io/${
                Object(productDatas[newEventData.event_prod_B - 1]).prod_image
              }`}
              alt="productA.jpg"
              style={{ height: '200px', width: '200px' }}
            />
          ) : (
            <h1>상품 B</h1>
          )}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SubTitleGroupComponent = () => {
  const { newEventData, setNewEventData } = useContext(CommonContext);
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const { currentEventDatas, setCurrentEventDatas } = useContext(CommonContext);
  const [allEventItem, setAllEventItem] = useState([]);

  const [filterADatas, setFilterADatas] = useState([]);
  const [filterBDatas, setFilterBDatas] = useState([]);

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
          product.prod_category === newEventData.event_category &&
          product.prod_id !== newEventData.event_prod_B,
      ),
    );
  };

  const test2 = () => {
    setFilterBDatas(
      productDatas.filter(
        product =>
          product.prod_category === newEventData.event_category &&
          product.prod_id !== newEventData.event_prod_A,
      ),
    );
  };
  useEffect(() => {
    test();
  }, [newEventData]);

  useEffect(() => {
    test2();
  }, [newEventData]);

  return (
    <Wrapper>
      <ThemeProvider theme={themeSubTitleGroupComponent}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={6}>
            <h2>Select Item A</h2>
            <Divider
              variant="fullWidth"
              orientation="horizontal"
              className="sub-title-group-component-divider"
            />
            <Select
              value={productDatas.prod_id}
              onChange={handleChangeA}
              displayEmpty
              className="select-empty"
              required
            >
              <MenuItem value={0} disabled>
                Select category
              </MenuItem>

              {filterADatas.map((data, index) => (
                <MenuItem key={index} value={data.prod_id}>
                  {data.prod_name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <h2>Select Item B</h2>
            <Divider
              variant="fullWidth"
              orientation="horizontal"
              className="sub-title-group-component-divider"
            />
            <Select
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
          </Grid>
        </Grid>
      </ThemeProvider>
    </Wrapper>
  );
};

const useGetCategoryDatas = url => {
  const { serverUrl, user, setUser } = useContext(CommonContext);
  const [data, setData] = useState([]);

  const getDatas = async () => {
    setData(categoryDats);
  };

  useEffect(() => {
    getDatas();
  }, []);

  return data;
};

const SelectCategoryComponent = () => {
  const { categoryDatas, setCategoryDatas } = useContext(CommonContext);
  const { newEventData, setNewEventData } = useContext(CommonContext);

  const [category, setCategory] = useState(newEventData.event_category);

  const handleChange = e => {
    setNewEventData({
      ...newEventData,
      event_category: e.target.value,
    });
  };

  return (
    <Wrapper>
      <FormControl className="form-control">
        <Select
          value={newEventData.event_category}
          onChange={handleChange}
          displayEmpty
          className="select-empty"
          required
        >
          <MenuItem value={0} disabled>
            Select category
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
          <InputTitleComponent />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <SelectCategoryComponent />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="create-vote-main-component-grid-item">
          <SubTitleGroupComponent />
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
