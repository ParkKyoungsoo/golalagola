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
import BasicDateTimePicker from './../DateTimePicker';
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
  const { title, setTitle, description, setDescription } = useContext(
    ViewContext,
  );

  const { newEventData, setNewEventData } = useContext(CommonContext);
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const [productImage, setProductImage] = useState();

  const onChangeDescriptionTitleHandler = e => {
    setDescription(e.target.value);
  };

  const onChangeTitleHandler = e => {
    setTitle(e.target.value);
  };

  return (
    <Wrapper>
      <Grid Stlye={{ display: 'flex' }}>
        <Grid>
          <img
            src={Object(productDatas[newEventData.event_prod_A]).prod_image}
            alt="productA.jpg"
            style={{ height: '200px', width: '200px' }}
          />
        </Grid>
        <Grid>
          <h1>VS</h1>
        </Grid>
        <Grid>
          <img
            src={Object(productDatas[newEventData.event_prod_B]).prod_image}
            alt="productA.jpg"
            style={{ height: '200px', width: '200px' }}
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SubTitleGroupComponent = () => {
  const {
    isMultipleChoice,
    setIsMultipleChoice,
    isPowerVoteChoice,
    setIsPowerVoteChoice,
  } = useContext(ViewContext);

  const onChangeIsMultipleChoiceHandler = name => e => {
    setIsMultipleChoice(e.target.checked);
  };

  const onChangeIsPowerVoteChoiceHandler = name => e => {
    setIsPowerVoteChoice(e.target.checked);
  };

  const { newEventData, setNewEventData } = useContext(CommonContext);
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const [filterDatas, setFilterDatas] = useState([]);
  const [filterDatas2, setFilterDatas2] = useState([]);

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
    setFilterDatas(
      productDatas.filter(
        product => product.prod_category === newEventData.event_category,
      ),
    );
  };

  const test2 = () => {
    setFilterDatas(
      productDatas.filter(
        product => product.prod_category === newEventData.event_category,
        // && product.prod_id !== newEventData.event_prod_B,
      ),
    );
  };
  useEffect(() => {
    test();
  }, [newEventData.event_category]);

  useEffect(() => {
    test2();
  }, [newEventData.event_category]);

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

              {filterDatas.map((data, index) => (
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

              {filterDatas.map((data, index) => (
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
            <MenuItem key={index} value={data.cat_no}>
              {data.cat_title}
            </MenuItem>
          ))}
        </Select>
        {/* <FormHelperText>Select category</FormHelperText> */}
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
            <Grid item>
              <BasicDateTimePicker />
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

const ThumbnailImageComponent = props => {
  const { thumbnailImageData, setThumbnailImageData } = useContext(ViewContext);

  const onDrop = useCallback(acceptedFiles => {
    console.log('PPAP: Basic -> acceptedFiles', acceptedFiles);
    // Do something with the files
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone(onDrop);

  useEffect(() => {
    for (const file of acceptedFiles) {
      console.log('TCL: Basic -> file', file);
      setThumbnailImageData({
        img: URL.createObjectURL(file),
        file: file,
      });
    }
  }, [acceptedFiles]);

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <Wrapper>
      <h4 className="ThumbnailImageComponentH4">corver preview</h4>
      <Paper>
        <section className="container">
          <div {...getRootProps({ className: 'dropzone' })}>
            {thumbnailImageData.img ? (
              <Avatar
                variant="square"
                src={thumbnailImageData.img}
                className="coverAvatar"
              />
            ) : (
              <Fab variant="extended" className="cover-upload-fab">
                <NavigationIcon className="extended-icon" />
                Upload Image
              </Fab>
            )}
            <input {...getInputProps()} />
          </div>
          <aside className="thumbnail-image-component-aside">
            <h4>Image Requirement</h4>
            <h4>Minimum size of "800x600"</h4>
            <ul>{files}</ul>
          </aside>
        </section>
      </Paper>
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
      <Grid item xs={12} sm={3}>
        <ThumbnailImageComponent />
      </Grid>
    </Grid>
  );
};

export default CreateVoteComponent;
