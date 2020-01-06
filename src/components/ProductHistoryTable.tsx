import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { TProduct } from '../types/types';

type Props = {
	product: TProduct;
};

const ProductHistoryTable: React.FC<Props> = ({ product }): JSX.Element => {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="product history">
				<TableHead>
					<TableRow>
						<TableCell>Test</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>test</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ProductHistoryTable;
