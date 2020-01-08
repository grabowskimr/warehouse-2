import React, { FormEvent, useContext } from 'react';

import ProductForm from './ProductForm';
import { sendData } from '../actions/dbActions';
import { TProduct } from '../types/types';
import AppContext from '../AppContext';

type TProductForm = {
	product: TProduct;
	file: File | null;
};

const AddProductPage: React.FC = (props): JSX.Element => {
	const { dispatch } = useContext(AppContext);
	const submitForm = async (event: FormEvent<HTMLFormElement>, product: TProductForm): Promise<void> => {
		event.preventDefault();
		let { message } = await sendData({
			...product.product,
			file: product.file,
			action: 'addProduct'
		});
		dispatch({
			type: 'SET_MESSAGE_VISIBLE',
			payload: {
				message: message
			}
		});
	};

	return <ProductForm onSubmit={submitForm} title="Add product" />;
};

export default AddProductPage;
