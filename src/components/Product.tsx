import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';

import { TProduct } from '../types/types';
import { getData } from '../actions/dbActions';

interface MatchParams {
	id: string;
}

type Props = RouteComponentProps<MatchParams>;

const Product: React.FC<Props> = (props): JSX.Element => {
	const [product, setProduct] = useState<TProduct[]>();

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			const data = await getData({
				action: 'getProduct',
				id: props.match.params.id
			});
			if (data.status) {
				setProduct(data.data[0]);
			}
		};
		fetchData();
		return () => {
			setProduct([]);
		};
	}, [props.match.params.id]);

	return <div>{JSON.stringify(product)}</div>;
};

export default Product;
