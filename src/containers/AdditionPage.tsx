import React from 'react';

import Order from '../components/Order';

const AdditionPage: React.FC = (): JSX.Element => {
	return <Order action="createAddition" title="Addition" />;
};

export default AdditionPage;
