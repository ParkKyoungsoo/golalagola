import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const RouteIf = props => {
  const { path, authorizations, component: Component } = props;
  return (
    <Route
      exact
      path={path}
      render={() => {
        return authorizations ? (
          <>
            <Component />
          </>
        ) : (
          <>
            {alert('접근 권한이 없습니다.')}
            <Redirect to="/" />
          </>
        );
      }}
    />
  );
};

export default RouteIf;
