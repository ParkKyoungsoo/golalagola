import React, { useContext, useEffect } from 'react';

import Layout from '../../layout/';

import { CommonContext } from '../../context/CommonContext';

const Auth = () => {
  const { user, setSignDialogOpen, setUserDetailDialogOpen } = useContext(
    CommonContext,
  );
  console.log('pages/Auth의 user: ', user);
  useEffect(() => {
    if (user.status === '' || user.status === undefined) {
      console.log('pages/Auth: in1');
      console.log('pages/Auth: user', user);
      setSignDialogOpen(true);
    } else if (user.status === 'login' || user.status === 200) {
      console.log('pages Auth: in2');
      setUserDetailDialogOpen(true);
    } else if (user.status === 'default') {
      console.log('pages Auth: in3');
      setSignDialogOpen(false);
    } else {
      console.log('pages Auth: in4');
      console.log('user', user);
      alert('More than');
    }
  }, []);

  return <Layout />;
};

export default Auth;
