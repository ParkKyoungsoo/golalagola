import React, { useState, useContext, useCallback, useEffect } from 'react';
import { CommonContext } from '../../../../context/CommonContext';

import {
  Paper,
  Grid,
  Avatar,
  Fab,
  Input,
  Select,
  MenuItem,
  FormControl,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from '@material-ui/core';
import Wrapper from './styles';
import { useDropzone } from 'react-dropzone';
import NavigationIcon from '@material-ui/icons/Navigation';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { useHistory } from 'react-router-dom';
import Axios from 'axios';

import AdminNav from '../../Nav/index.jsx';

const AdminProductForm = () => {
  const [forceRender, setForceRender] = useState({});
  const { currentProductDatas, setCurrentProductDatas } = useContext(
    CommonContext,
  );

  const [title, setTitle] = useState({
    value: currentProductDatas.prod_title,
    error: false,
  });
  const [name, setName] = useState({
    value: currentProductDatas.prod_name,
    error: false,
  });
  const [category, setCategory] = useState({
    value: currentProductDatas.prod_category,
    error: false,
  });
  const [price, setPrice] = useState({
    value: currentProductDatas.prod_price,
    error: false,
  });
  const [amount, setAmount] = useState({
    value: currentProductDatas.prod_amount,
    error: false,
  });
  const [expiration, setExpiration] = useState(new Date());
  const [image, setImage] = useState({
    value: currentProductDatas.prod_image,
    error: false,
  });
  const [desc, setDesc] = useState({
    value: currentProductDatas.prod_desc,
    error: false,
  });
  const [sale, setSale] = useState({
    value: currentProductDatas.prod_sale,
    error: false,
  });
  const [weight, setWeight] = useState({
    value: currentProductDatas.prod_weight,
    error: false,
  });

  const handleTitleChange = event => {
    if (event.target.value !== '') {
      setTitle({ value: event.target.value, error: false });
    } else {
      setTitle({ value: event.target.value, error: true });
    }
    setForceRender({});
  };

  const handleNameChange = event => {
    if (event.target.value !== '') {
      setName({ value: event.target.value, error: false });
    } else {
      setName({ value: event.target.value, error: true });
    }
    setForceRender({});
  };

  const handleCategoryChange = event => {
    if (event.target.value !== '') {
      setCategory({ value: event.target.value, error: false });
    } else {
      setCategory({ value: event.target.value, error: true });
    }
    setForceRender({});
  };

  const handlePriceChange = event => {
    if (event.target.value !== '') {
      setPrice({ value: event.target.value, error: false });
    } else {
      setPrice({ value: event.target.value, error: true });
    }
    setForceRender({});
  };

  const handleAmountChange = event => {
    if (event.target.value !== '') {
      setAmount({ value: event.target.value, error: false });
    } else {
      setAmount({ value: event.target.value, error: true });
    }
    setForceRender({});
  };

  const handleExpirationChange = event => {
    console.log(event);
    setExpiration(event);
    setForceRender({});
  };

  const handleImageChange = event => {
    if (event.target.value !== '') {
      setImage({ value: event.target.value, error: false });
    } else {
      setImage({ value: event.target.value, error: true });
    }
    setForceRender({});
  };

  const handleDescChange = event => {
    if (event.target.value !== '') {
      setDesc({ value: event.target.value, error: false });
    } else {
      setDesc({ value: event.target.value, error: true });
    }
    setForceRender({});
  };

  const handleSaleChange = event => {
    if (event.target.value !== '') {
      setSale({ value: event.target.value, error: false });
    } else {
      setSale({ value: event.target.value, error: true });
    }
    setForceRender({});
  };

  const handleWeightChange = event => {
    if (event.target.value !== '') {
      setWeight({ value: event.target.value, error: false });
    } else {
      setWeight({ value: event.target.value, error: true });
    }
    setForceRender({});
  };

  // DateTimePicker
  function MaterialUIPickers() {
    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Product Expiration"
              format="yyyy-MM-dd"
              value={expiration.value}
              onChange={handleExpirationChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
    );
  }

  // ImageUproader
  const [thumbnailImageData, setThumbnailImageData] = useState('');

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

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      title.value === '' ||
      name.value === '' ||
      category.value === '' ||
      price.value === '' ||
      amount.value === '' ||
      expiration.value === '' ||
      image.value === '' ||
      desc.value === '' ||
      sale.value === '' ||
      weight.value === ''
    ) {
      if (title.value === '') {
        setTitle({ value: '', error: true });
      }
      if (name.value === '') {
        setName({ value: '', error: true });
      }
      if (category.value === '') {
        setCategory({ value: '', error: true });
      }
      if (price.value === '') {
        setPrice({ value: '', error: true });
      }
      if (amount.value === '') {
        setAmount({ value: '', error: true });
      }
      if (expiration.value === '') {
        setExpiration({ value: '', error: true });
      }
      if (image.value === '') {
        setImage({ value: '', error: true });
      }
      if (sale.value === '') {
        setDesc({ value: '', error: true });
      }
      if (weight.value === '') {
        setSale({ value: '', error: true });
      }
      if (name.value === '') {
        setWeight({ value: '', error: true });
      }
      setForceRender({});
      alert('validation error');
    } else {
      // status: create
      if (currentProductDatas.status === 'create') {
        await Axios.post('https://i3b309.p.ssafy.io/api/product', {
          prod_title: title.value,
          prod_name: name.value,
          prod_category: category.value,
          prod_price: price.value,
          prod_amount: amount.value,
          prod_expiration: expiration.value,
          prod_image: image.value,
          prod_desc: desc.value,
          prod_sale: sale.value,
          prod_weight: weight.value,
        })
          .then(response => {
            console.log('Response', response.data);
            alert('상품정보가 등록 되었습니다.');
          })
          .catch(e => {
            console.log('Error: ', e.response.data);
          });
      } else {
        // status: create
        await Axios.put('https://i3b309.p.ssafy.io/api/product', {
          prod_id: currentProductDatas.prod_id,
          prod_title: title.value,
          prod_name: name.value,
          prod_category: category.value,
          prod_price: price.value,
          prod_amount: amount.value,
          prod_expiration: expiration.value,
          prod_image: image.value,
          prod_desc: desc.value,
          prod_sale: sale.value,
          prod_weight: weight.value,
        })
          .then(response => {
            console.log('Response', response.data);
            alert('상품정보가 수정 되었습니다.');
          })
          .catch(e => {
            console.log('Error: ', e.response.data);
          });
      }
      window.location.href = '/admin/product';
    }
  }

  return (
    <div>
      <AdminNav />
      <Grid container justify="center" alignItems="flex-start" spacing={2}>
        <Grid item xs={12}>
          <p>그리드 9</p>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <FormControl
              // className={classes.root}
              noValidate
            >
              <Grid item xs={12}>
                <TextField
                  required
                  error={title.error ? true : false}
                  id="standard-required"
                  label="Product Title"
                  type="text"
                  multiline
                  rowsMax={4}
                  value={title.value}
                  onChange={handleTitleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={name.error ? true : false}
                  id="standard-required"
                  label="Product Name"
                  type="text"
                  multiline
                  rowsMax={4}
                  value={name.value}
                  onChange={handleNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={category.error ? true : false}
                  id="standard-required"
                  label="Product Category"
                  type="text"
                  multiline
                  rowsMax={4}
                  value={category.value}
                  onChange={handleCategoryChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={price.error ? true : false}
                  id="standard-required"
                  label="Product Price"
                  type="text"
                  multiline
                  rowsMax={4}
                  value={price.value}
                  onChange={handlePriceChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={amount.error ? true : false}
                  id="standard-required"
                  label="Product Amount"
                  type="text"
                  multiline
                  rowsMax={4}
                  value={amount.value}
                  onChange={handleAmountChange}
                />
              </Grid>
              <Grid item xs={12}>
                <MaterialUIPickers />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={image.error ? true : false}
                  id="standard-required"
                  label="Product Image"
                  type="text"
                  multiline
                  rowsMax={4}
                  value={image.value}
                  onChange={handleImageChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={desc.error ? true : false}
                  id="standard-required"
                  label="Product Desc"
                  type="text"
                  multiline
                  rowsMax={4}
                  value={desc.value}
                  onChange={handleDescChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={sale.error ? true : false}
                  id="standard-required"
                  label="Product Sale"
                  type="text"
                  multiline
                  rowsMax={4}
                  value={sale.value}
                  onChange={handleSaleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={weight.error ? true : false}
                  id="standard-required"
                  label="Product Weight"
                  type="text"
                  multiline
                  rowsMax={4}
                  value={weight.value}
                  onChange={handleWeightChange}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="answer"
                  name="answer"
                  value={hint.value}
                  onChange={handleAnswerChange}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="ture"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="false"
                  />
                </RadioGroup>
              </Grid> */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Primary
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminProductForm;
