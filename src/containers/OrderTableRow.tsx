import React, { ChangeEvent, useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles, Theme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';

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
	},
	notVisible: {
		display: 'none'
	}
}));

const OrderTableRow: React.FC<Props> = ({ product, changeCount, isOrder }) => {
	const classes = useStyles();
	const [valid, setValid] = useState(true);
	const [notVisibleCount, setNotVisibleCount] = useState<string>('');
	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setNotVisibleCount(e.target.value);
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
					<TableCell align="left">
						{product.quantity} {product.quantityType}
					</TableCell>
					<TableCell align="right">
						<span className={classes.notVisible}>
							{notVisibleCount} {product.quantityType}
						</span>
						<Input
							type="number"
							value={product.count}
							onChange={handleChange}
							endAdornment={<InputAdornment position="end">{product.quantityType}</InputAdornment>}
						/>
					</TableCell>
				</TableRow>
			)}
		</>
	);
};

export default OrderTableRow;
