import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';

import AdminNav from '../Nav/index.jsx';

const AdminUser = props => {
  return (
    <div>
      <AdminNav></AdminNav>
      <h1>유저 페이지</h1>
    </div>
  );
};
export default AdminUser;
