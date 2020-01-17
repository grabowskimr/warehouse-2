import React, { MouseEvent } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { RouteComponentProps } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core';

import { THistoryRecord, THistoryProduct } from '../types/types';
import { appMainPath } from '../config/config';

type Props = {
	records: THistoryRecord[];
} & RouteComponentProps;

const useStyles = makeStyles((theme: Theme) => ({
	row: {
		cursor: 'pointer'
	}
}));

const OrderHistoryTable: React.FC<Props> = ({ records, history }): JSX.Element => {
	const classes = useStyles();
	const goToRecord = (e: MouseEvent<HTMLElement>): void => {
		history.push(`${appMainPath}/report/${e.currentTarget.dataset.id}`);
	};

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
								<TableRow hover data-id={row.id} key={row.id} onClick={goToRecord} className={classes.row}>
									<TableCell component="th" scope="row" style={{ fontWeight: 500 }}>
										{row.name}
									</TableCell>
									<TableCell>{row.id}</TableCell>
									<TableCell>
										{products.map(product => (
											<span key={product.productId}>
												<span style={{ fontWeight: 500 }}>{product.name}:</span>
												<br />
												<span>
													Order:{product.count} {product.quantityType}
												</span>
												{' / '}
												<span>
													New value:{product.newQ} {product.quantityType}
												</span>
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
