import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { getData } from '../actions/dbActions';

type TService = {
	id: number;
	product_id: number;
	user_id: number;
	title: string;
	description: string;
	type: string;
	status: number;
	image: string;
	date: string;
	service_id: number;
	resolve: string;
	end_date: string;
	record_index: string;
};

const useStyles = makeStyles((theme: Theme) => ({
	title: {
		marginBottom: theme.spacing(3)
	}
}));

const Services: React.FC = (): JSX.Element => {
	const classes = useStyles();
	const [services, setServices] = useState([]);
	const [downloaded, setDownloaded] = useState(false);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			let { data, status } = await getData({
				action: 'getOpenServices'
			});

			if (status) {
				setDownloaded(true);
				setServices(data);
			}
		};

		fetchData();
		return () => {
			setServices([]);
		};
	}, [downloaded]);

	return (
		<>
			<Typography variant="h4" className={classes.title}>
				Serwis
			</Typography>
			<TableContainer component={Paper}>
				<Table aria-label="history table" id="print">
					<TableHead>
						<TableRow>
							<TableCell>Id</TableCell>
							<TableCell>Typ</TableCell>
							<TableCell>Data</TableCell>
							<TableCell>Tytuł</TableCell>
							<TableCell>Opis</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{services.map((service: TService) => (
							<TableRow key={service.id}>
								<TableCell>{service.id}</TableCell>
								<TableCell>{service.type}</TableCell>
								<TableCell>{service.date}</TableCell>
								<TableCell>{service.title}</TableCell>
								<TableCell>{service.description}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default Services;
