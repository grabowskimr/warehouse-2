import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import { TProduct } from '../types/types';

type Props = {
	products: TProduct[];
	onCountChange: (id: string | undefined | number) => void;
};

const OrderTable: React.FC<Props> = (props): JSX.Element => {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell align="left">Index</TableCell>
						<TableCell align="left">Price</TableCell>
						<TableCell align="left">Quantity</TableCell>
						<TableCell align="right">Count</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.products.map((product, index) => (
						<TableRow key={index}>
							<TableCell component="th" scope="row">
								{product.name}
							</TableCell>
							<TableCell align="left">{product.product_index}</TableCell>
							<TableCell align="left">{product.price}</TableCell>
							<TableCell align="left">{product.quantity}</TableCell>
							<TableCell align="right">
								<TextField label="Count" data-id={product.id} onChange={() => props.onCountChange(product.id)} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default OrderTable;
