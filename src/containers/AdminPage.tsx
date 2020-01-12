import React from 'react';
import Grid from '@material-ui/core/Grid';

import AddUser from '../components/AddUser';

const AdminPage: React.FC = (): JSX.Element => {
	return (
		<Grid container>
			<Grid item xs={6}>
				<AddUser />
			</Grid>
		</Grid>
	);
};

export default AdminPage;
