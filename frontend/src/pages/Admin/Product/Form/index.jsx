import React, { useState, useContext } from 'react';
import { CommonContext } from '../../../../context/CommonContext';

import { Grid, FormControl, Button } from '@material-ui/core';
import Wrapper from './styles';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { useHistory } from 'react-router-dom';
import Axios from 'axios';

// import AdminNav from '../../Nav/index.jsx';

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
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState(currentProductDatas.prod_image);
  const [uploadedImage, setUploadedImage] = useState(
    `https://i3b309.p.ssafy.io/${currentProductDatas.prod_image}`,
  );

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
  function getFormatDate(date) {
    var year = date.getFullYear(); //yyyy
    var month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : '0' + month; //month 두자리로 저장
    var day = date.getDate(); //d
    day = day >= 10 ? day : '0' + day; //day 두자리로 저장
    return year + '-' + month + '-' + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
  }
  const handleExpirationChange = event => {
    const date = getFormatDate(event);
    setExpiration(date);
    setForceRender({});
  };

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

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      title.value === '' ||
      name.value === '' ||
      category.value === '' ||
      price.value === '' ||
      amount.value === '' ||
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
      // formData 생성
      const formData = new FormData();
      formData.append('image', image);

      // status: create
      if (currentProductDatas.status === 'create') {
        await Axios.post('https://i3b309.p.ssafy.io/api/product/', {
          prod_title: title.value,
          prod_name: name.value,
          prod_category: category.value,
          prod_price: price.value,
          prod_amount: amount.value,
          prod_expiration: expiration,
          prod_image: `images/${imageName}`,
          prod_desc: desc.value,
          prod_sale: sale.value,
          prod_weight: weight.value,
        })
          .then(async response => {
            await Axios.post(
              'https://i3b309.p.ssafy.io/api/product/imageUpload',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              },
            )
              .then(response => {
                console.log('Response', response.data);
                alert('상품정보가 등록 되었습니다.');
              })
              .catch(e => {
                console.log('Error: ', e);
              });
            console.log('Response', response.data);
          })
          .catch(e => {
            console.log('Error: ', e);
          });
      } else {
        // status: update

        await Axios.put('https://i3b309.p.ssafy.io/api/product', {
          prod_id: currentProductDatas.prod_id,
          prod_title: title.value,
          prod_name: name.value,
          prod_category: category.value,
          prod_price: price.value,
          prod_amount: amount.value,
          prod_expiration: expiration,
          prod_image: `images/${imageName}`,
          prod_desc: desc.value,
          prod_sale: sale.value,
          prod_weight: weight.value,
        })
          .then(async response => {
            if (image !== '') {
              await Axios.post(
                'https://i3b309.p.ssafy.io/api/product/imageUpload',
                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                },
              )
                .then(response => {
                  console.log('Response', response.data);
                  alert('상품정보가 수정 되었습니다.');
                })
                .catch(e => {
                  console.log('Error: ', e);
                });
            }
            console.log('Response', response.data);
          })
          .catch(e => {
            console.log('Error: ', e);
          });
      }
      // window.location.href = '/admin/product';
    }
  }

  // ImageUproader

  const handleImageChange = e => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
    setUploadedImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Wrapper>
      {/* <AdminNav /> */}
      <Grid container justify="center" alignItems="flex-start" spacing={2}>
        <Grid item xs={6}>
          이미지 업로드
          <div className="custom-file mb-4">
            <input
              type="file"
              className="custom-file-input"
              id="imageUpload"
              onChange={handleImageChange}
            />
            <label className="custom-file-label" htmlFor="imageUpload">
              {imageName}
            </label>
          </div>
          {image ? (
            <div className="row mt-5">
              <div className="col-md-6 m-auto">
                <h3 className="text-center">{imageName}</h3>
                <img style={{ width: '100%' }} src={uploadedImage} alt="" />
              </div>
            </div>
          ) : null}
        </Grid>
        <Grid item xs={6}>
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
    </Wrapper>
  );
};

export default AdminProductForm;
