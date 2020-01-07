import React, { ChangeEvent } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';

import { TProduct } from '../types/types';

type Order = {
	count: string;
} & TProduct;

type Props = {
	product: Order;
	changeCount: (e: ChangeEvent<HTMLInputElement>) => void;
};

const OrderTableRow: React.FC<Props> = ({ product, changeCount }) => {
	return (
		<>
			{product && (
				<TableRow>
					<TableCell component="th" scope="row">
						{product.name}
					</TableCell>
					<TableCell align="left">{product.product_index}</TableCell>
					<TableCell align="left">{product.price}</TableCell>
					<TableCell align="left">{product.quantity}</TableCell>
					<TableCell align="right">
						<TextField label="Count" value={product.count} onChange={changeCount} />
					</TableCell>
				</TableRow>
			)}
		</>
	);
};

export default OrderTableRow;
