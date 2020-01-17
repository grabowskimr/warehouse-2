import React, { useState, useEffect, MouseEvent } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router-dom';

import { TProduct } from '../types/types';
import { getData } from '../actions/dbActions';
import { appMainPath } from '../config/config';

type Props = {
	product: TProduct;
} & RouteComponentProps;

type THistory = {
	id: string;
	date: string;
	type: string;
	product_id: string;
	user_id: string;
	count: string;
	order_id: number;
};

const useStyles = makeStyles((theme: Theme) => ({
	order: {
		background: '#F1F8E9',
		cursor: 'pointer',
		'&:hover': {
			background: '#AED581'
		}
	},
	addition: {
		background: '#E3F2FD',
		cursor: 'pointer',
		'&:hover': {
			background: '#90CAF9'
		}
	}
}));

const ProductHistoryTable: React.FC<Props> = ({ product, history }): JSX.Element => {
	const [historyTable, setHistoryTable] = useState<THistory[]>([]);
	const classes = useStyles();

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			let { data } = await getData({
				action: 'getProductHistory',
				productId: product.id
			});
			setHistoryTable(data);
		};

		fetchData();

		return () => {
			setHistoryTable([]);
		};
	}, [product.id]);

	const goToReport = (e: MouseEvent<HTMLElement>): void => {
		if (e.currentTarget.dataset.type !== 'edit') {
			history.push(`${appMainPath}/report/${e.currentTarget.dataset.id}`);
		}
	};

	return (
		<TableContainer component={Paper}>
			<Table aria-label="product history">
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Count</TableCell>
						<TableCell>Type</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{history.length
						? historyTable.map(record => (
								<TableRow
									key={record.id}
									data-id={record.order_id}
									data-type={record.type}
									onClick={goToReport}
									className={
										record.type === 'order'
											? classes.order
											: record.type === 'addition'
											? classes.addition
											: ''
									}
								>
									<TableCell>{record.date}</TableCell>
									<TableCell>
										<Grid container alignItems="center">
											{record.count} {'  '}{' '}
											{record.type === 'order' ? (
												<ArrowDropDownIcon />
											) : record.type === 'addition' ? (
												<ArrowDropUpIcon />
											) : null}
										</Grid>
									</TableCell>
									<TableCell>{record.type}</TableCell>
								</TableRow>
						  ))
						: null}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ProductHistoryTable;
