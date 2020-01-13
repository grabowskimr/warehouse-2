import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { THistoryRecord } from '../types/types';

type THistoryProduct = {
	productId: number;
	count: number;
	newQ: number;
	name: string;
};

type Props = {
	records: THistoryRecord[];
};

const OrderHistoryTable: React.FC<Props> = ({ records }): JSX.Element => {
	return (
		<TableContainer>
			{records.length && (
				<Table aria-label="history table" id="print">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Id</TableCell>
							<TableCell>Products</TableCell>
							<TableCell>User</TableCell>
							<TableCell>Date</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{records.map((row: THistoryRecord) => {
							let products: THistoryProduct[] = JSON.parse(row.order_products);
							return (
								<TableRow key={row.id}>
									<TableCell component="th" scope="row" style={{ fontWeight: 500 }}>
										{row.name}
									</TableCell>
									<TableCell>{row.id}</TableCell>
									<TableCell>
										{products.map(product => (
											<span key={product.productId}>
												<span style={{ fontWeight: 500 }}>{product.name}:</span>
												<br />
												<span>Order:{product.count}</span>
												{' / '}
												<span>New value:{product.newQ}</span>
												<br />
											</span>
										))}
									</TableCell>
									<TableCell>{row.user_name}</TableCell>
									<TableCell>{row.date}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			)}
		</TableContainer>
	);
};

export default OrderHistoryTable;
