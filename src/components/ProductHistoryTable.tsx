import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { TProduct } from '../types/types';
import { getData } from '../actions/dbActions';

type Props = {
	product: TProduct;
};

type THistory = {
	id: string;
	date: string;
	type: string;
	product_id: string;
	user_id: string;
	count: string;
};

const ProductHistoryTable: React.FC<Props> = ({ product }): JSX.Element => {
	const [history, setHistory] = useState<THistory[]>([]);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			let { data } = await getData({
				action: 'getProductHistory',
				productId: product.id
			});
			setHistory(data);
		};

		fetchData();

		return () => {
			setHistory([]);
		};
	}, [product.id]);

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
						? history.map(record => (
								<TableRow key={record.id}>
									<TableCell>{record.date}</TableCell>
									<TableCell>{record.count}</TableCell>
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
