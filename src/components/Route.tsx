import React from 'react';
import Login from "./Login";
import { Route, Switch } from 'react-router-dom';
import { withCookies } from 'react-cookie';

const RouteComponent: React.FC = (props) => {
  console.log(props);

  return (
    <Switch>
      <Route exact path='/' component={Login}/>
    </Switch>
  );
};

export default withCookies(RouteComponent);
