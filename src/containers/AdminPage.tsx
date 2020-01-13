import React from 'react';
import Grid from '@material-ui/core/Grid';

import AddUser from '../components/AddUser';
import EditUser from '../components/EditUser';

const AdminPage: React.FC = (): JSX.Element => {
	return (
		<Grid container justify="space-between" spacing={2}>
			<Grid item xs={6}>
				<AddUser />
			</Grid>
			<Grid item xs={6}>
				<EditUser />
			</Grid>
		</Grid>
	);
};

export default AdminPage;
