import React from 'react';

import Order from '../components/Order';

const OrderPage: React.FC = (): JSX.Element => {
	return <Order action="createOrder" order={true} />;
};

export default OrderPage;
