import React, { useState, useEffect, forwardRef } from 'react';
import Axios from 'axios';

import AdminNav from '../Layout/nav.jsx';
import NestedList from '../Layout/sidebar.jsx';

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

  const classes = useStyles();
  return (
    <div>
      <AdminNav></AdminNav>
      <h1>재고 페이지</h1>
      <div classes={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <NestedList></NestedList>
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <MaterialTable
                icons={tableIcons}
                title="재고 목록"
                columns={products.columns}
                data={products.data}
                editable={{
                  onRowAdd: newData =>
                    new Promise(resolve => {
                      setTimeout(() => {
                        resolve();
                        setProducts(prevState => {
                          const data = [...prevState.data];
                          data.push(newData);
                          return { ...prevState, data };
                        });
                      }, 600);
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                      setTimeout(() => {
                        resolve();
                        if (oldData) {
                          setProducts(prevState => {
                            const data = [...prevState.data];
                            data[data.indexOf(oldData)] = newData;
                            return { ...prevState, data };
                          });
                        }
                      }, 600);
                    }),
                  onRowDelete: oldData =>
                    new Promise(resolve => {
                      setTimeout(() => {
                        resolve();
                        setProducts(prevState => {
                          const data = [...prevState.data];
                          data.splice(data.indexOf(oldData), 1);
                          return { ...prevState, data };
                        });
                      }, 600);
                    }),
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default AdminProduct;
