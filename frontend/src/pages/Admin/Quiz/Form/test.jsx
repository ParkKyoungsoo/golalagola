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
import RadioButtonsGroup from '../../../../components/Create/RadioButtonsGroup/index';
import BasicDateTimePicker from '../../../../components/Create/DateTimePicker';
import { CommonContext } from '../../../../context/CommonContext';
import { ViewContext } from '../../../../context/ViewContext';
import { useDropzone } from 'react-dropzone';
import NavigationIcon from '@material-ui/icons/Navigation';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

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
  const onChangeDescriptionTitleHandler = e => {
    setDescription(e.target.value);
  };

  const onChangeTitleHandler = e => {
    setTitle(e.target.value);
  };

  return (
    <Wrapper>
      <Input
        placeholder="Vote Title"
        defaultValue={title}
        inputProps={{
          'aria-label': 'description',
        }}
        fullWidth={true}
        onChange={onChangeTitleHandler}
        className="input-title-component-input1"
      />
      <Input
        placeholder="Description of this vote."
        defaultValue={description}
        multiline={true}
        inputProps={{
          'aria-label': 'description',
        }}
        fullWidth={true}
        onChange={onChangeDescriptionTitleHandler}
        className="input-title-component-input2"
      />
    </Wrapper>
  );
};

const SubTitleGroupComponent = () => {
  const {
    isMultipleChoice,
    setIsMultipleChoice,
    isPowerVoteChoice,
    setIsPowerVoteChoice,
  } = useContext('');

  const onChangeIsMultipleChoiceHandler = name => e => {
    setIsMultipleChoice(e.target.checked);
  };

  const onChangeIsPowerVoteChoiceHandler = name => e => {
    setIsPowerVoteChoice(e.target.checked);
  };

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
          <Grid item xs={12}>
            <h2>
              Question
              <Divider
                variant="fullWidth"
                orientation="horizontal"
                className="sub-title-group-component-divider"
              />
            </h2>
          </Grid>

          <Grid item xs={12}>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isMultipleChoice}
                    onChange={onChangeIsMultipleChoiceHandler('checkedBt')}
                    value="checkedBt"
                    color="primary"
                  />
                }
                label="Multiple choice"
              />
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Wrapper>
  );
};

const useGetCategoryDatas = url => {
  const getDatas = async () => {
    setData('');
  };

  useEffect(() => {
    getDatas();
  }, []);

  return data;
};

const SelectCategoryComponent = () => {
  const [category, setCategory] = useContext('');
  const categoryDatas = useGetCategoryDatas('/category');
  const handleChange = e => {
    setCategory(e.target.value);
  };

  return (
    <Wrapper>
      <FormControl className="form-control">
        <Select
          value={category}
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
              {data.cat_type}
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
          <RadioButtonsGroup />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const ThumbnailImageComponent = props => {
  const { thumbnailImageData, setThumbnailImageData } = useContext('');

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

const AdminQuizForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isMultipleChoice, setIsMultipleChoice] = useState('');
  const [isPowerVoteChoice, setIsPowerVoteChoice] = useState('');
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [thumbnailImageData, setThumbnailImageData] = useContext('');

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

export default AdminQuizForm;
