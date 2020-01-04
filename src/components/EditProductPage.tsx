import React, { FormEvent, useContext, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import ProductForm from './ProductForm';
import { sendData } from '../actions/dbActions';
import { TProduct } from '../types/types';
import AppContext from '../AppContext';
import { getData } from '../actions/dbActions';

type TProductForm = {
	product: TProduct;
	file: File | null;
};

interface MatchParams {
	id: string;
}

type Props = RouteComponentProps<MatchParams>;

const EditProductPage: React.FC<Props> = (props): JSX.Element => {
	const { dispatch } = useContext(AppContext);
	const [product, setProduct] = useState<TProduct>();
	const submitForm = async (event: FormEvent<HTMLFormElement>, product: TProductForm): Promise<void> => {
		event.preventDefault();
		let data = await sendData({
			...product.product,
			id: props.match.params.id,
			file: product.file,
			action: 'updateProduct'
		});
		dispatch({
			type: 'SET_MESSAGE_VISIBLE',
			payload: {
				message: data.message
			}
		});
	};

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			let { data } = await getData({
				action: 'getProduct',
				id: props.match.params.id
			});
			setProduct(data[0]);
		};
		fetchData();
		return () => {
			setProduct(undefined);
		};
	}, [props.match.params.id]);

	return <>{product && product.name ? <ProductForm onSubmit={submitForm} title="Edit product" product={product} /> : null}</>;
};

export default EditProductPage;
