import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import { RouteComponentProps } from 'react-router';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { getData } from '../actions/dbActions';
import { TProduct } from '../types/types';
import { appMainPath } from '../config/config';

const useStyles = makeStyles((theme: Theme) => ({
	alert: {
		background: '#FFB74D',
		'&:hover': {
			background: '#FF9800'
		}
	},
	noneq: {
		background: '#FF7043',
		'&:hover': {
			background: '#D84315'
		}
	},
	table: {
		cursor: 'pointer'
	}
}));

type Props = RouteComponentProps;

const ProductList: React.FC<Props> = (props): JSX.Element => {
	const classes = useStyles();
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
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								{tableLabels.map((label, index) => (
									<TableCell key={index}>{label}</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{products.map(product => (
								<TableRow
									key={product.id}
									data-id={product.id}
									onClick={redirectToEditPage}
									className={product.quantity > 0 && product.quantity < product.quantityAlert ? classes.alert : product.quantity <= 0 ? classes.noneq : ''}>
									<TableCell>{product.id}</TableCell>
									<TableCell>{product.product_index}</TableCell>
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
