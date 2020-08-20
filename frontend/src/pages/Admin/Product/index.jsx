import React, { useState, forwardRef, useContext } from 'react';
import { CommonContext } from '../../../context/CommonContext';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { Grid, Divider } from '@material-ui/core';
import MaterialTable from 'material-table';

import Wrapper from './styles';

import NestedList from '../Layout/sidebar.jsx';

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

import CanvasJSReact from '../asset/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

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
  const {
    setCurrentProductDatas,
    productsTableData,
    buyDatas,
    serverImgUrl,
  } = useContext(CommonContext);

  const [categories, setCategories] = useState({});
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
      uploadedImage: '',
      status: 'create',
    };
    setCurrentProductDatas(productData);
    history.push('/admin/product/form');
  };
  const updateProductData = rowData => {
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
        alert('삭제되었습니다.');
        window.location.reload();
      })
      .catch(e => {
        alert(
          '상품 정보가 삭제되지 않았습니다. 서비스 관리자에게 문의해 주세요.',
        );
      });
  };

  // 차트 데이터
  const options = rowData => {
    return {
      title: {
        text: '판매 현황',
      },
      data: [
        {
          // Change type to "doughnut", "line", "splineArea", etc.
          type: 'column',
          dataPoints: [
            {
              label: '총 개수',
              y: rowData.prod_amount,
            },
            {
              label: '판매 개수',
              y: buyDatas[`${rowData.prod_id}`],
            },
          ],
        },
      ],
    };
  };

  return (
    <Wrapper>
      <div className="admin_product__main">
        <Grid container>
          <Grid item>
            <NestedList index={2} />
          </Grid>
          <Grid item>
            <Grid className="admin_product__content">
              <h5 className="admin_product__header">상품 목록</h5>
              <Divider variant="middle" className="admin_product__divider" />
              <MaterialTable
                className="admin_product__table"
                icons={tableIcons}
                title=""
                columns={productsTableData.columns}
                data={productsTableData.data}
                options={{ actionsColumnIndex: -1, pageSize: 10 }}
                detailPanel={rowData => {
                  return (
                    <Grid container className="admin_product__detail--grid">
                      <Grid
                        item
                        xs={4}
                        className="admin_product__detail--image_grid"
                      >
                        <CanvasJSChart options={options(rowData)} />
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        className="admin_product__detail--image_grid"
                      >
                        <img
                          className="admin_product__detail--image"
                          src={`${serverImgUrl}${rowData.prod_image}`}
                          alt={`${rowData.prod_name} 이미지`}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Divider />
                        <h3 className="">상품: {rowData.prod_name}</h3>
                        <h5>{rowData.prod_title}</h5>
                        <p>품목: {rowData.prod_category}</p>
                        <p>상품 설명: {rowData.prod_desc}</p>
                        <Divider />
                        <p>판매 가격: {rowData.prod_price}원</p>
                        <p>남은 수량: {rowData.prod_amount}개</p>
                        <p>유통 기한: {rowData.prod_expiration}</p>
                        <p>할인율: {rowData.prod_sale}%</p>
                        <Divider />
                      </Grid>
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
                      if (
                        window.confirm(
                          `${rowData.prod_name}를 삭제하시겠습니까?`,
                        )
                      ) {
                        deleteProductData(rowData.prod_id);
                      }
                    },
                  }),
                ]}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Wrapper>
  );
};
export default AdminProduct;
