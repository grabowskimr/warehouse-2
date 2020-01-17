import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useCookies } from 'react-cookie';

import { getData } from '../actions/dbActions';
import DownloadFabButton from '../components/DonwloadFabButton';

const useStyles = makeStyles((theme: Theme) => ({
	topPaper: {
		padding: theme.spacing(2),
		marginBottom: theme.spacing(3)
	}
}));

type TOrder = {
	id: number;
	name: string;
	order_products: string;
	type: string;
	user_id: number;
	date: string;
	user_name: string;
};

type MatchParams = {
	id: string;
};

type THistoryProduct = {
	productId: number;
	count: number;
	newQ: number;
	name: string;
	price: string;
	quantity: number;
	index: string;
};

type Props = RouteComponentProps<MatchParams>;

const SingleOrder: React.FC<Props> = (props): JSX.Element => {
	const classes = useStyles();
	const cookies = useCookies(['login']);
	console.log(cookies);
	const [order, setOrder] = useState<TOrder>({
		id: 0,
		name: '',
		order_products: '',
		type: '',
		user_id: 0,
		date: '',
		user_name: ''
	});
	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			let { data, status } = await getData({
				action: 'getOrder',
				id: props.match.params.id
			});

			if (status) {
				setOrder(data[0]);
			}
		};

		fetchData();
	}, [props.match.params.id]);

	return (
		<>
			{order.id && (
				<Grid>
					<Paper className={classes.topPaper}>
						<Typography variant="h4">Order: {order.name}</Typography>
						<Typography variant="subtitle2">date: {order.date}</Typography>
						{cookies[0].login.profile === 'admin' ? <Typography variant="subtitle1">User: {order.user_name}</Typography> : null}
					</Paper>
					<TableContainer component={Paper}>
						<Table aria-label="history table" id="print">
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Index</TableCell>
									<TableCell>Price</TableCell>
									<TableCell>Quantity</TableCell>
									<TableCell>Count</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{JSON.parse(order.order_products).map((product: THistoryProduct) => (
									<TableRow key={product.productId}>
										<TableCell>{product.name}</TableCell>
										<TableCell>{product.index}</TableCell>
										<TableCell>{product.price}</TableCell>
										<TableCell>{product.quantity}</TableCell>
										<TableCell>{product.count}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<DownloadFabButton single={true} name={order.name} user={order.user_name} date={order.date} />
				</Grid>
			)}
		</>
	);
};

export default SingleOrder;
