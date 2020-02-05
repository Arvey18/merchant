import * as React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}: any) => {
  // variables
  const login = localStorage.getItem('login');

  return (
    <Route
      {...rest}
      render={(props: any) =>
        login === 'true' ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
