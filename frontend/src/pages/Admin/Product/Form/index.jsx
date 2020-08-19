import React, { useState, useContext } from 'react';
import { CommonContext } from '../../../../context/CommonContext';

import {
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormControl,
  Button,
  Divider,
  Paper,
} from '@material-ui/core';
import Wrapper from './styles';
import NestedList from '../../Layout/sidebar.jsx';

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
  const [expiration, setExpiration] = useState(getFormatDate(new Date()));
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
  const handleExpirationChange = async event => {
    const date = getFormatDate(event);
    await setExpiration(date);
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
              label="유통기한"
              format="yyyy-MM-dd"
              value={expiration}
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

  // 잘못된 경우에는 이전 페이지로 보내기
  if (
    currentProductDatas.status === undefined ||
    currentProductDatas.status === null
  ) {
    window.location.href = '/admin/product';
  }

  function handleSubmit(event) {
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
      alert('입력하지 않은 내용이 존재합니다.');
    } else if (sale.value > 99) {
      setSale({ value: sale.value, error: true });
      setForceRender({});
      alert('할인율을 99% 이하로 다시 입력해주세요.');
    } else {
      // formData 생성
      const formData = new FormData();
      formData.append('image', image);
      formData.append('prod_id', currentProductDatas.prod_id);

      // status: create
      if (currentProductDatas.status === 'create') {
        Axios.post('https://i3b309.p.ssafy.io/api/product/', {
          prod_title: title.value,
          prod_name: name.value,
          prod_category: category.value,
          prod_price: price.value,
          prod_amount: amount.value,
          prod_expiration: expiration,
          prod_image: `${imageName}`,
          prod_desc: desc.value,
          prod_sale: sale.value,
          prod_weight: weight.value,
        })
          .then(async response => {
            Axios.post(
              'https://i3b309.p.ssafy.io/api/product/imageUpload',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              },
            )
              .then(response => {
                // console.log('Response', response.data);
                alert('상품정보가 등록 되었습니다.');
              })
              .catch(e => {
                // console.log('Error: ', e);
              });
            // console.log('Response', response.data);
          })
          .catch(e => {
            // console.log('Error: ', e);
          });
      } else if (currentProductDatas.status === 'update') {
        // status: update

        Axios.put('https://i3b309.p.ssafy.io/api/product', {
          prod_id: currentProductDatas.prod_id,
          prod_title: title.value,
          prod_name: name.value,
          prod_category: category.value,
          prod_price: price.value,
          prod_amount: amount.value,
          prod_expiration: expiration,
          prod_image: `${imageName}`,
          prod_desc: desc.value,
          prod_sale: sale.value,
          prod_weight: weight.value,
        })
          .then(async response => {
            if (image !== '') {
              Axios.post(
                'https://i3b309.p.ssafy.io/api/product/imageUpload',
                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                },
              )
                .then(response => {
                  // console.log('Response', response.data);
                  alert('상품정보가 수정 되었습니다.');
                })
                .catch(e => {
                  // console.log('Error: ', e);
                  alert('이미지가 수정되지 않았습니다. 다시 시도해주세요.');
                });
            }
            // console.log('Response', response.data);
            alert('상품정보가 수정 되었습니다.');
          })
          .catch(e => {
            // console.log('Error: ', e);
            alert('상품 정보가 수정되지 않았습니다. 다시 시도해주세요.');
          });
      } else {
        alert('다시 시도해주세요.');
      }
      setCurrentProductDatas([]);
      window.location.href = '/admin/product';
    }
  }

  // ImageUproader
  const handleImageChange = e => {
    // console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
    setUploadedImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Wrapper>
      <div className="admin_product_form__main">
        <Grid container>
          <Grid item>
            <NestedList index={2} />
          </Grid>
          <Grid item>
            <Grid className="admin_product_form__content">
              <h5 className="admin_product_form__header">상품 등록</h5>
              <Divider
                variant="middle"
                className="admin_product_form__divider"
              />
              <Paper elevation={2} className="admin_product_form__paper">
                <Grid
                  container
                  justify="center"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Grid item xs={6}>
                    이미지 업로드
                    <div className="custom-file mb-4">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="imageUpload"
                        onChange={handleImageChange}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="imageUpload"
                      >
                        {imageName}
                      </label>
                    </div>
                    {image ? (
                      <div className="row mt-5">
                        <div className="col-md-6 m-auto">
                          <h3 className="text-center">{imageName}</h3>
                          <img
                            style={{ width: '100%' }}
                            src={uploadedImage}
                            alt=""
                          />
                        </div>
                      </div>
                    ) : null}
                  </Grid>
                  <Grid item xs={6}>
                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      spacing={1}
                    >
                      <FormControl
                      // className={classes.root}
                      >
                        <Grid item xs={12}>
                          <InputLabel id="category-label">카테고리</InputLabel>
                          <Select
                            className="admin_product_form__input"
                            required
                            label="카테고리"
                            labelId="category-label"
                            id="demo-simple-select"
                            value={category.value}
                            error={category.error ? true : false}
                            onChange={handleCategoryChange}
                          >
                            <MenuItem value={1}>간편식</MenuItem>
                            <MenuItem value={2}>과일/채소</MenuItem>
                            <MenuItem value={3}>곡류/견과</MenuItem>
                            <MenuItem value={4}>정육/계란</MenuItem>
                            <MenuItem value={5}>수산물/건해산</MenuItem>
                            <MenuItem value={6}>우유/유제품</MenuItem>
                            <MenuItem value={7}>김치/반찬</MenuItem>
                            <MenuItem value={8}>면류/통조림</MenuItem>
                            <MenuItem value={9}>생수/음료</MenuItem>
                            <MenuItem value={10}>조미료/오일</MenuItem>
                            <MenuItem value={11}>과자/빙과</MenuItem>
                            <MenuItem value={12}>빵/샐러드</MenuItem>
                            <MenuItem value={13}>세제/위생용품</MenuItem>
                          </Select>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            className="admin_product_form__input"
                            error={title.error ? true : false}
                            id="standard-required"
                            label="상품 제목"
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
                            className="admin_product_form__input"
                            error={name.error ? true : false}
                            id="standard-required"
                            label="상품 이름"
                            type="text"
                            multiline
                            rowsMax={4}
                            value={name.value}
                            onChange={handleNameChange}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <TextField
                            required
                            className="admin_product_form__input"
                            error={price.error ? true : false}
                            id="standard-required"
                            label="가격"
                            type="number"
                            multiline
                            rowsMax={4}
                            value={price.value}
                            onChange={handlePriceChange}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            required
                            className="admin_product_form__input"
                            error={amount.error ? true : false}
                            id="standard-required"
                            label="수량"
                            type="number"
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
                            className="admin_product_form__input"
                            error={desc.error ? true : false}
                            id="standard-required"
                            label="상품 설명"
                            type="text"
                            multiline
                            rowsMax={4}
                            value={desc.value}
                            onChange={handleDescChange}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            required
                            className="admin_product_form__input"
                            error={sale.error ? true : false}
                            id="standard-required"
                            label="할인율"
                            type="number"
                            value={sale.value}
                            onChange={handleSaleChange}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            required
                            className="admin_product_form__input"
                            error={weight.error ? true : false}
                            id="standard-required"
                            label="제품 무게"
                            type="number"
                            value={weight.value}
                            onChange={handleWeightChange}
                          />
                        </Grid>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSubmit}
                          className="admin_product_form__button"
                        >
                          제품 등록
                        </Button>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Wrapper>
  );
};

export default AdminProductForm;
