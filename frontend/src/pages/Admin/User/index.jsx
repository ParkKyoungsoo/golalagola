import React, { forwardRef, useContext } from 'react';
import { CommonContext } from '../../../context/CommonContext';
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

const AdminUser = () => {
  const { usersTableData, serverImgUrl } = useContext(CommonContext);

  const deleteProductData = targetProdId => {
    Axios.delete('https://i3b309.p.ssafy.io/api/auth', {
      data: {
        user_id: targetProdId,
      },
    })
      .then(res => {
        alert('삭제되었습니다.');
        window.location.reload(false);
      })
      .catch(e => {});
  };

  return (
    <Wrapper>
      <div className="admin_user__main">
        <Grid container>
          <Grid item>
            <NestedList index={1} />
          </Grid>
          <Grid item>
            <Grid className="admin_user__content">
              <h5 className="admin_user__header">유저 목록</h5>
              <Divider variant="middle" className="admin_user__divider" />
              <MaterialTable
                className="admin_user__table"
                icons={tableIcons}
                title=""
                columns={usersTableData.columns}
                data={usersTableData.data}
                options={{ actionsColumnIndex: -1, pageSize: 10 }}
                // detailPanel={rowData => {
                //   return (
                //     <Grid container className="admin_user__detail--grid">
                //       <Grid
                //         item
                //         xs={6}
                //         className="admin_user__detail--image_grid"
                //       >
                //         <img
                //           className="admin_user__detail--image"
                //           src={`${serverImgUrl}${rowData.user_image}`}
                //           alt={`${rowData.user_name} 이미지`}
                //         />
                //       </Grid>
                //       <Grid item xs={6}>
                //         <Divider />
                //         <h3 className="">상품: {rowData.prod_name}</h3>
                //         <h5>{rowData.prod_title}</h5>
                //         <p>품목: {rowData.prod_category}</p>
                //         <p>상품 설명: {rowData.prod_desc}</p>
                //         <Divider />
                //         <p>판매 가격: {rowData.prod_price}원</p>
                //         <p>남은 수량: {rowData.prod_amount}개</p>
                //         <p>유통 기한: {rowData.prod_expiration}</p>
                //         <p>할인율: {rowData.prod_sale}%</p>
                //         <p>무게: {rowData.prod_weight}g</p>
                //         <Divider />
                //       </Grid>
                //     </Grid>
                //   );
                // }}
                actions={[
                  rowData => ({
                    icon: DeleteOutline,
                    tooltip: 'Delete Product',
                    onClick: (event, rowData) => {
                      if (
                        window.confirm(
                          'You want to delete ' + rowData.user_name,
                        )
                      ) {
                        deleteProductData(rowData.user_id);
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
export default AdminUser;
