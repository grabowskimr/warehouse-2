import React, { ChangeEvent } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { TProduct } from '../types/types';
import OrderTableRow from './OrderTableRow';

type Order = {
	count: string;
} & TProduct;

type Props = {
	products: Order[];
	onCountChange: (e: ChangeEvent<HTMLInputElement>, id: string | undefined | number, valid: boolean) => void;
	isOrder: boolean | undefined;
};

const OrderTable: React.FC<Props> = (props): JSX.Element => {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="simple table" id="print">
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
					{props.products.map(product => (
						<OrderTableRow
							isOrder={props.isOrder}
							key={product.id}
							product={product}
							changeCount={(e: ChangeEvent<HTMLInputElement>, valid) => props.onCountChange(e, product.id, valid)}
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default OrderTable;
