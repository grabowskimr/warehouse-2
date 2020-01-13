import React, { ChangeEvent, useState, FormEvent, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Md5 } from 'ts-md5/dist/md5';

import { sendData } from '../actions/dbActions';
import AppContext from '../AppContext';

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
	const { dispatch } = useContext(AppContext);
	const classes = useStyles();
	const [name, setName] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [profile, setProfile] = useState<string>('');
	const [login, setLogin] = useState('');

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setName(e.target.value);
	};

	const handlePasswordName = (e: ChangeEvent<HTMLInputElement>): void => {
		setPassword(e.target.value);
	};

	const handleLoginChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setLogin(e.target.value);
	};

	const handleProfileChange = (e: any): void => {
		setProfile(e.target.value);
	};

	const handleSubmit = async (e: FormEvent): Promise<void> => {
		e.preventDefault();
		const { message, status } = await sendData({
			action: 'addUser',
			login: login,
			name: name,
			password: Md5.hashStr(password),
			profile: profile
		});

		if (status) {
			setName('');
			setPassword('');
			setProfile('');
		}

		dispatch({
			type: 'SET_MESSAGE_VISIBLE',
			payload: {
				message: message
			}
		});

		dispatch({
			type: 'UPDATE_USERS'
		});
	};

	return (
		<Paper className={classes.paper}>
			<Typography variant="h6">Add User</Typography>
			<form onSubmit={handleSubmit}>
				<FormControl fullWidth className={classes.formControll}>
					<TextField name="login" label="Login" value={login} onChange={handleLoginChange} required />
				</FormControl>
				<FormControl fullWidth className={classes.formControll}>
					<TextField name="name" label="Name" value={name} onChange={handleNameChange} required />
				</FormControl>
				<FormControl fullWidth className={classes.formControll}>
					<TextField name="password" label="Password" type="password" value={password} onChange={handlePasswordName} required />
				</FormControl>
				<FormControl fullWidth>
					<InputLabel id="profile">Type</InputLabel>
					<Select labelId="profile" value={profile} name="profile" onChange={handleProfileChange} required>
						<MenuItem value="user">User</MenuItem>
						<MenuItem value="admin">Admin</MenuItem>
					</Select>
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
