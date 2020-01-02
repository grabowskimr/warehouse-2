import React, { FormEvent } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '../containers/Paper';

import ProductForm from './ProductForm';
import { sendData } from '../actions/dbActions';
import withContext from '../utils/withContext';
import { TProduct } from '../types/types';
import { TContext } from '../AppContext';

type TProductForm = {
	product: TProduct;
	file: File | null;
};

const AddProductPage: React.FC<TContext> = (props): JSX.Element => {
	const product = {
		product: {
			name: '',
			product_index: '',
			supplier: '',
			quantity: 0,
			quantityType: '',
			quantityAlert: 0,
			price: '',
			picture: null
		},
		file: null
	};

	const submitForm = async (event: FormEvent<HTMLFormElement>, product: TProductForm): Promise<void> => {
		event.preventDefault();
		let data = await sendData({
			...product.product,
			file: product.file,
			action: 'addProduct'
		});
		props.dispatch({
			type: 'SET_MESSAGE_VISIBLE',
			payload: {
				message: data.message
			}
		});
	};

	return (
		<Paper>
			<Typography variant="h5">Add Product</Typography>
			<ProductForm onSubmit={submitForm} product={product} />
		</Paper>
	);
};

export default withContext(AddProductPage);
