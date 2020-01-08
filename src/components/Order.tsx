import React, { ChangeEvent, useEffect, useState, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import { useCookies } from 'react-cookie';

import { getData, sendData } from '../actions/dbActions';
import { TProduct } from '../types/types';
import OrderTable from '../containers/OrderTable';
import { AppContext } from '../AppContext';

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
	},
	submitButton: {
		marginTop: '20px'
	}
}));

type Order = {
	count: string;
} & TProduct;

const Order: React.FC = (): JSX.Element => {
	const classes = useStyles();
	const [products, setProducts] = useState<TProduct[]>([]);
	const [orderList, setOrderList] = useState<Order[]>([]);
	const [order, setOrder] = useState<Order[]>([]);
	const [name, setName] = useState<string>('');
	const [cookies] = useCookies();
	const { dispatch } = useContext(AppContext);
	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			let data = await getData({
				action: 'getProducts'
			});

			if (data.status && !products.length) {
				setProducts(data.data);
			}
		};
		fetchData();
	});

	const handleSelect = (event: object, value: any): void => {
		setOrderList(value);
		let values = value.map((value: TProduct): TProduct | Order => {
			let index = order.findIndex(o => o.id === value.id);
			if (index >= 0) {
				return order[index];
			} else {
				return value;
			}
		});

		setOrder(values);
	};

	const handleCountChange = (e: ChangeEvent<HTMLInputElement>, id: string | undefined | number): void => {
		let list = order.map(product => {
			if (product.id === id) {
				product = {
					...product,
					count: e.target.value
				};
			}
			return product;
		});
		setOrder(list);
	};

	const submitOrder = async (): Promise<void> => {
		let orderProducts = order.map(product => ({
			productId: product.id,
			count: product.count,
			newQ: product.quantity - parseInt(product.count)
		}));
		let products = order.map(product => ({
			...product,
			productId: product.id,
			count: product.count,
			newQuantity: product.quantity - parseInt(product.count)
		}));

		let { status, message } = await sendData({
			action: 'createOrder',
			products: products,
			orderProducts: JSON.stringify(orderProducts),
			type: 'order',
			userId: cookies.login.id,
			name: name,
			date: new Date()
				.toISOString()
				.slice(0, 19)
				.replace('T', ' ')
		});
		if (status) {
			dispatch({
				type: 'SET_MESSAGE_VISIBLE',
				payload: {
					message: message
				}
			});
		}
	};

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setName(e.target.value);
	};

	return (
		<div>
			{products.length && (
				<Grid>
					<Paper className={classes.paper}>
						<form noValidate autoComplete="off">
							<FormControl className={classes.formControl}>
								<TextField className={classes.input} label="Order name" value={name} onChange={handleNameChange} />
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
					<Grid container justify="flex-end">
						<Button variant="contained" color="primary" className={classes.submitButton} onClick={submitOrder}>
							Submit
						</Button>
					</Grid>
				</Grid>
			)}
		</div>
	);
};

export default Order;
