import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { withCookies } from 'react-cookie';

import { checkAccess } from '../actions/dbActions';
import { appMainPath } from '../config/config';
import Layout from '../containers/Layout';
import ContextProvider from './ContextProvider';
import { TMenuItem } from '../types/types';
import AddProductPage from './AddProductPage';
import Message from './Message';
import ProductList from './ProductList';
import Product from './Product';
import EditProductPage from './EditProductPage';
import OrderPage from '../containers/OrderPage';
import AdditionPage from '../containers/AdditionPage';
import AdminPage from '../containers/AdminPage';

type Props = { cookies: any } & RouteComponentProps;

class Main extends React.Component<Props> {
	menuItems: TMenuItem[] = [
		{ label: 'Home', url: '/', iconComponent: DashboardIcon },
		{ label: 'Add product', url: '/add', iconComponent: AddCircleIcon },
		{ label: 'Order', url: '/order', iconComponent: AddCircleIcon },
		{ label: 'Addition', url: '/addition', iconComponent: AddCircleIcon },
		{ label: 'Admin', url: '/admin', iconComponent: AddCircleIcon }
	];

	componentDidMount(): void {
		if (this.props.cookies.cookies.login) {
			checkAccess().then(({ status }) => {
				if (!status) {
					this.props.history.push('/');
				}
			});
		} else {
			this.props.history.push('/');
		}
	}

	render() {
		return (
			<ContextProvider>
				<Layout menuItems={this.menuItems}>
					<Switch>
						<Route exact path={appMainPath} component={ProductList} />
						<Route exact path={`${appMainPath}/product/:id`} component={Product} />
						<Route path={`${appMainPath}/add`} exact component={AddProductPage} />
						<Route path={`${appMainPath}/edit/:id`} component={EditProductPage} />
						<Route path={`${appMainPath}/order`} component={OrderPage} />
						<Route path={`${appMainPath}/addition`} component={AdditionPage} />
						<Route path={`${appMainPath}/admin`} component={AdminPage} />
					</Switch>
				</Layout>
				<Message />
			</ContextProvider>
		);
	}
}

export default withCookies(Main);
