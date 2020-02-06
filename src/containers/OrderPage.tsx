import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Order from '../components/Order';

const OrderPage: React.FC<RouteComponentProps> = (props): JSX.Element => {
	return <Order action="createOrder" order={true} title="Zamówienie" {...props} />;
};

export default OrderPage;
