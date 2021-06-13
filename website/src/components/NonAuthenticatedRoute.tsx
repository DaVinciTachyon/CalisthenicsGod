import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface Props {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

const NonAuthenticatedRoute = ({ component: Component, ...rest }: Props) => (
  <Route
    {...rest}
    render={(props: any) =>
      !localStorage.getItem('authToken') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default NonAuthenticatedRoute;
