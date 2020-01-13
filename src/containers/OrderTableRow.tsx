import React, { ChangeEvent, useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { TProduct } from '../types/types';

type Order = {
	count: string;
} & TProduct;

type Props = {
	product: Order;
	changeCount: (e: ChangeEvent<HTMLInputElement>, valid: boolean) => void;
	isOrder: boolean | undefined;
};

const useStyles = makeStyles((theme: Theme) => ({
	danger: {
		background: '#FF8A65'
	}
}));

const OrderTableRow: React.FC<Props> = ({ product, changeCount, isOrder }) => {
	const classes = useStyles();
	const [valid, setValid] = useState(true);
	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		if (parseInt(e.target.value) > product.quantity && isOrder) {
			setValid(false);
			changeCount(e, false);
		} else {
			setValid(true);
			changeCount(e, true);
		}
	};

	return (
		<>
			{product && (
				<TableRow className={!valid ? classes.danger : ''}>
					<TableCell component="th" scope="row">
						{product.name}
					</TableCell>
					<TableCell align="left">{product.product_index}</TableCell>
					<TableCell align="left">{product.price}</TableCell>
					<TableCell align="left">{product.quantity}</TableCell>
					<TableCell align="right">
						<TextField label="Count" type="number" value={product.count} onChange={handleChange} />
					</TableCell>
				</TableRow>
			)}
		</>
	);
};

export default OrderTableRow;
