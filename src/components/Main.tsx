import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { checkAccess } from '../actions/dbActions';
import { appMainPath } from '../config/config';
import Layout from '../containers/Layout';
import ContextProvider from './ContextProvider';
import { TMenuItem } from '../types/types';
import AddProductPage from './AddProductPage';
import Message from './Message';

class Main extends React.Component<RouteComponentProps> {
	menuItems: TMenuItem[] = [
		{ label: 'Home', url: '/', iconComponent: DashboardIcon },
		{ label: 'Add product', url: '/add', iconComponent: AddCircleIcon }
	];

	componentDidMount(): void {
		checkAccess().then(({ status }) => {
			if (!status) {
				this.props.history.push('/');
			}
		});
	}

	render() {
		return (
			<ContextProvider>
				<Layout menuItems={this.menuItems}>
					<Switch>
						<Route path={`${appMainPath}/add`} exact component={AddProductPage} />
					</Switch>
				</Layout>
				<Message />
			</ContextProvider>
		);
	}
}

export default Main;
