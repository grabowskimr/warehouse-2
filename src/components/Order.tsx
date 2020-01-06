import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { getData } from '../actions/dbActions';
import { TProduct } from '../types/types';
import OrderTable from './OrderTable';

const useStyles = makeStyles((theme: Theme) => ({
	paper: {
		minWidth: '100%',
		minHeight: '100%',
		padding: theme.spacing(2),
		marginBottom: theme.spacing(3)
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	chip: {
		margin: 2
	},
	input: {
		width: '100%'
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		width: '100%',
		maxWidth: '100%'
	}
}));

type Order = {
	count: number;
	type: string;
} & TProduct;

const Order: React.FC = (): JSX.Element => {
	const classes = useStyles();
	const [products, setProducts] = useState<TProduct[]>([]);
	const [orderList, setOrderList] = useState<TProduct[]>([]);
	const [order, setOrder] = useState<Order[]>([]);
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
	});

	const handleSelect = (event: object, value: any): void => {
		setOrderList(value);
		setOrder(value);
	};

	const handleCountChange = (id: string | undefined | number): void => {
		let orderIndex = order.findIndex(order => (order.id = id));
		console.log(orderIndex);
	};

	return (
		<div>
			{products.length && (
				<Grid>
					<Paper className={classes.paper}>
						<form noValidate autoComplete="off">
							<FormControl className={classes.formControl}>
								<TextField className={classes.input} label="Order name" />
							</FormControl>
							<FormControl className={classes.formControl}>
								<Autocomplete
									multiple
									id="tags-standard"
									options={products}
									defaultValue={orderList}
									getOptionLabel={(option: TProduct) => option.name}
									onChange={handleSelect}
									renderInput={params => <TextField {...params} variant="standard" label="Multiple values" placeholder="Favorites" fullWidth />}
								/>
							</FormControl>
						</form>
					</Paper>
					<OrderTable onCountChange={handleCountChange} products={orderList} />
				</Grid>
			)}
		</div>
	);
};

export default Order;
