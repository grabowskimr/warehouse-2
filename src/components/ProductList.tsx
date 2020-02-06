import React, { useEffect, useState, ChangeEvent } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import { RouteComponentProps } from 'react-router';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import TextField from '@material-ui/core/TextField';

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
	},
	search: {
		marginBottom: theme.spacing(3)
	}
}));

type Props = RouteComponentProps;

const ProductList: React.FC<Props> = (props): JSX.Element => {
	const classes = useStyles();
	let [products, setProducts] = useState<TProduct[]>([]);
	const tableLabels = ['ID', 'Product Id', 'Name', 'Quantity', 'Suppiler'];
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(25);
	const [filter, setFilter] = useState('');

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			let data = await getData({
				action: 'getProducts'
			});
			if (data.status) {
				let sordedData = sortData(data.data);
				setProducts(sordedData);
			}
		};
		fetchData();
		return () => {
			setProducts([]);
		};
	}, []);

	const sortData = (data: TProduct[]): TProduct[] => {
		let sortedData = data;
		sortedData.sort((a: TProduct, b: TProduct): any => {
			let aQ = a.quantity - a.quantityAlert;
			let bQ = b.quantity - b.quantityAlert;
			if (a.quantity == 0) {
				return -1;
			} else if (b.quantity == 0) {
				return 1;
			} else {
				if (aQ > bQ) {
					return 1;
				} else if (aQ < bQ) {
					return -1;
				} else {
					return 0;
				}
			}
		});
		return sortedData;
	};

	const redirectToEditPage = (e: any): void => {
		props.history.push(`${appMainPath}/product/${e.target.parentNode.dataset.id}`);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const search = (e: ChangeEvent<HTMLInputElement>): void => {
		setFilter(e.target.value);
	};

	const filterProducts = (product: TProduct): boolean => {
		return product.name.includes(filter);
	};

	return (
		<>
			<TextField fullWidth onChange={search} className={classes.search} label="Search" type="search" variant="outlined" />
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
							{products
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.filter(filterProducts)
								.map(product => (
									<TableRow
										key={product.id}
										data-id={product.id}
										onClick={redirectToEditPage}
										className={
											product.quantity > 0 && product.quantity < product.quantityAlert
												? classes.alert
												: product.quantity <= 0
												? classes.noneq
												: ''
										}
									>
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
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[25, 50, 100]}
									count={products.length}
									rowsPerPage={rowsPerPage}
									page={page}
									onChangePage={handleChangePage}
									onChangeRowsPerPage={handleChangeRowsPerPage}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>
			)}
		</>
	);
};

export default ProductList;
