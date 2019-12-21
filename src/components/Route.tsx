import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import Login from './Login';
import Main from './Main';

const RouteComponent: React.FC = (): JSX.Element => {
	return (
		<Switch>
			<Route exact path="/" component={Login} />
			<Route path="/app" component={Main} />
		</Switch>
	);
};

export default withCookies(RouteComponent);
