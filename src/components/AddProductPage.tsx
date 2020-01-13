import React, { FormEvent, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import ProductForm from './ProductForm';
import { sendData } from '../actions/dbActions';
import { TProduct } from '../types/types';
import AppContext from '../AppContext';

type TProductForm = {
	product: TProduct;
	file: File | null;
};

const AddProductPage: React.FC<RouteComponentProps> = (props): JSX.Element => {
	const { dispatch } = useContext(AppContext);
	const submitForm = async (event: FormEvent<HTMLFormElement>, product: TProductForm): Promise<void> => {
		event.preventDefault();
		let { message, status } = await sendData({
			...product.product,
			file: product.file,
			action: 'addProduct'
		});
		if (status) {
			props.history.push(`/app`);
		}
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
