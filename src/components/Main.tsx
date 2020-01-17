import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import PersonIcon from '@material-ui/icons/Person';
import NotesIcon from '@material-ui/icons/Notes';
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
import OrderListPage from '../containers/OrderListPage';
import Report from '../containers/Report';

type Props = { cookies: any } & RouteComponentProps;

class Main extends React.Component<Props> {
	cookie = this.props.cookies.cookies.login ? JSON.parse(this.props.cookies.cookies.login) : null;
	menuItems: TMenuItem[] = [
		{ label: 'Home', url: '/', iconComponent: HomeIcon },
		{ label: 'Orders', url: '/orders', iconComponent: NotesIcon },
		{ label: 'Add product', url: '/add', iconComponent: AddCircleIcon },
		{ label: 'Create order', url: '/order', iconComponent: AssignmentIcon },
		{ label: 'Addition', url: '/addition', iconComponent: LibraryAddIcon },
		{ label: 'Admin', url: '/admin', iconComponent: PersonIcon, adminLink: true, isAdmin: this.cookie && this.cookie.profile === 'admin' ? true : false }
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
						<Route exact path={`${appMainPath}/order`} component={OrderPage} />
						<Route path={`${appMainPath}/addition`} component={AdditionPage} />
						{this.cookie && this.cookie.profile === 'admin' ? <Route path={`${appMainPath}/admin`} component={AdminPage} /> : null}
						<Route path={`${appMainPath}/orders`} component={OrderListPage} />
						<Route path={`${appMainPath}/report/:id`} component={Report} />
					</Switch>
				</Layout>
				<Message />
			</ContextProvider>
		);
	}
}

export default withCookies(Main);
