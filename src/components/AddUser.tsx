import React, { ChangeEvent, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
	paper: {
		minWidth: '100%',
		minHeight: '100%',
		padding: theme.spacing(2),
		marginBottom: theme.spacing(3)
	},
	submitButton: {
		marginTop: '20px'
	},
	formControll: {
		marginBottom: '10px'
	}
}));

const AddUser: React.FC = (): JSX.Element => {
	const classes = useStyles();
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setName(e.target.value);
	};

	const handlePasswordName = (e: ChangeEvent<HTMLInputElement>): void => {
		setPassword(e.target.value);
	};

	const handleSubmit = (): void => {};

	return (
		<Paper className={classes.paper}>
			<Typography variant="h6">Add User</Typography>
			<form onSubmit={handleSubmit}>
				<FormControl fullWidth className={classes.formControll}>
					<TextField name="name" label="Name" value={name} onChange={handleNameChange} required />
				</FormControl>
				<FormControl fullWidth className={classes.formControll}>
					<TextField name="name" label="Password" value={password} onChange={handlePasswordName} required />
				</FormControl>
				<Grid container justify="flex-end">
					<Button variant="contained" color="primary" type="submit" className={classes.submitButton}>
						Submit
					</Button>
				</Grid>
			</form>
		</Paper>
	);
};

export default AddUser;
