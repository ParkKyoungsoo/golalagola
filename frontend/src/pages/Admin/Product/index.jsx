import React, { useState, useEffect, forwardRef, useContext } from 'react';
import { CommonContext } from '../../../context/CommonContext';
import { useHistory, Link } from 'react-router-dom';
import Axios from 'axios';

import AdminNav from '../Layout/nav.jsx';

import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const AdminProduct = () => {
  const { currentProductDatas, setCurrentProductDatas } = useContext(
    CommonContext,
  );
  const [categories, setCategories] = useState({});
  const [products, setProducts] = useState({
    columns: [
      { title: 'prod_title', field: 'prod_title' },
      { title: 'prod_name', field: 'prod_name' },
      {
        title: 'prod_category',
        field: 'prod_category',
        lookup: categories,
      },
      { title: 'prod_price', field: 'prod_price' },
      { title: 'prod_amount', field: 'prod_amount' },
      { title: 'prod_expiration', field: 'prod_expiration' },
      { title: 'prod_image', field: 'prod_image' },
      { title: 'prod_desc', field: 'prod_desc' },
      { title: 'prod_sale', field: 'prod_sale', type: 'numeric' },
      { title: 'prod_weight', field: 'prod_weight' },
    ],
    data: [],
  });
  Axios.get('https://i3b309.p.ssafy.io/api/product/').then(({ data }) => {
    products.data = data;
    setProducts(products);
  });

  var obj = categories;
  let index = 1;
  Axios.get('https://i3b309.p.ssafy.io/api/category/').then((req, res) => {
    for (var i = 0; i < req.data.length; i++) {
      obj[index] = req.data[i].cat_title;
      index += 1;
    }
    setCategories(obj);
  });

  let history = useHistory();

  const createProductData = () => {
    const productData = {
      prod_title: '',
      prod_name: '',
      prod_category: '',
      prod_price: '',
      prod_amount: '',
      prod_expiration: '',
      prod_image: '',
      prod_desc: '',
      prod_sale: '',
      prod_weight: '',
      status: 'create',
    };
    setCurrentProductDatas(productData);
    history.push('/admin/product/form');
  };
  const updateProductData = rowData => {
    // console.log('rowData', rowData);
    const productData = {
      prod_id: rowData.prod_id,
      prod_title: rowData.prod_title,
      prod_name: rowData.prod_name,
      prod_category: rowData.prod_category,
      prod_price: rowData.prod_price,
      prod_amount: rowData.prod_amount,
      prod_expiration: rowData.prod_expiration,
      prod_image: rowData.prod_image,
      prod_desc: rowData.prod_desc,
      prod_sale: rowData.prod_sale,
      prod_weight: rowData.prod_weight,
      status: 'update',
    };
    setCurrentProductDatas(productData);
    history.push('/admin/product/form');
  };

  const deleteProductData = targetProdId => {
    Axios.delete('https://i3b309.p.ssafy.io/api/product', {
      data: {
        prod_id: targetProdId,
      },
    })
      .then(res => {
        console.log(res);
        alert('삭제되었습니다.');
        // window.location.reload();
      })
      .catch(e => {
        console.log('Error: ', e.response.data);
      });
  };

  const classes = useStyles();
  return (
    <div>
      <AdminNav />
      <h1>재고 상품 페이지</h1>
      <MaterialTable
        icons={tableIcons}
        title="재고 목록"
        columns={products.columns}
        data={products.data}
        options={{ actionsColumnIndex: -1, pageSize: 20 }}
        detailPanel={rowData => {
          return (
            <Grid>
              <p>{rowData.prod_title}</p>
              <p>{rowData.prod_name}</p>
              <p>{rowData.prod_category}</p>
              <p>{rowData.prod_price}</p>
              <p>{rowData.prod_amount}</p>
              <p>{rowData.prod_expiration}</p>
              <p>{rowData.prod_image}</p>
              <p>{rowData.prod_desc}</p>
              <p>{rowData.prod_sale}</p>
              <p>{rowData.prod_weight}</p>
            </Grid>
          );
        }}
        actions={[
          {
            icon: AddBox,
            tooltip: 'Add Product',
            isFreeAction: true,
            onClick: event => createProductData(),
          },
          rowData => ({
            icon: Edit,
            tooltip: 'Update Product',
            onClick: (event, rowData) => updateProductData(rowData),
          }),
          rowData => ({
            icon: DeleteOutline,
            tooltip: 'Delete Product',
            onClick: (event, rowData) => {
              console.log(rowData);
              if (window.confirm('You want to delete ' + rowData.prod_name)) {
                deleteProductData(rowData.prod_id);
              }
            },
          }),
        ]}
      />
    </div>
  );
};
export default AdminProduct;
