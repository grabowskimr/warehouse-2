import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import { RouteComponentProps } from 'react-router';

import { getData } from '../actions/dbActions';
import { TProduct } from '../types/types';
import { appMainPath } from '../config/config';

type Props = RouteComponentProps;

const ProductList: React.FC<Props> = (props): JSX.Element => {
	let [products, setProducts] = useState<TProduct[]>([]);
	const tableLabels = ['ID', 'Product Id', 'Name', 'Quantity', 'Suppiler'];

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			let data = await getData({
				action: 'getProducts'
			});
			if (data.status) {
				setProducts(data.data);
			}
		};
		fetchData();
		return () => {
			setProducts([]);
		};
	}, []);

	const redirectToEditPage = (e: any): void => {
		props.history.push(`${appMainPath}/product/${e.target.parentNode.dataset.id}`);
	};

	return (
		<>
			{products.length && (
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								{tableLabels.map((label, index) => (
									<TableCell key={index}>{label}</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{products.map(product => (
								<TableRow hover key={product.id} data-id={product.id} onClick={redirectToEditPage}>
									<TableCell>{product.id}</TableCell>
									<TableCell>{product.index}</TableCell>
									<TableCell>{product.name}</TableCell>
									<TableCell>
										{product.quantity} {product.quantityType}
									</TableCell>
									<TableCell>{product.supplier}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</>
	);
};

export default ProductList;
