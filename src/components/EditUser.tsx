import React, { useContext, useState, useEffect, FormEvent, ChangeEvent } from 'react';
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

import { sendData, getData } from '../actions/dbActions';
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
	},
	removeButton: {
		marginRight: '10px',
		marginTop: '20px'
	}
}));

type TUser = {
	id: number;
	login: string;
	password: string;
	profile: string;
};

const EditUser: React.FC = (): JSX.Element => {
	const [user, setUser] = useState<number>(0);
	const [users, setUsers] = useState<TUser[]>([]);
	const [password, setPassword] = useState<string>('');
	const { state, dispatch } = useContext(AppContext);
	const classes = useStyles();

	useEffect(() => {
		const fetchData = async () => {
			const { data, status } = await getData({
				action: 'getUsers'
			});

			if (status) {
				let users: TUser[] = [
					{
						id: 0,
						login: 'None',
						password: 'none',
						profile: ''
					},
					...data
				];
				setUsers(users);
			}

			return () => {
				setUsers([]);
			};
		};

		fetchData();
	}, [state.updateUsers, user]);

	const handleUserChange = (e: any): void => {
		setUser(e.target.value);
	};

	const handlePasswordName = (e: ChangeEvent<HTMLInputElement>): void => {
		setPassword(e.target.value);
	};

	const handleEdit = async (e: FormEvent): Promise<void> => {
		e.preventDefault();
		let { message } = await sendData({
			action: 'editUser',
			id: user,
			password: Md5.hashStr(password)
		});

		dispatch({
			type: 'SET_MESSAGE_VISIBLE',
			payload: {
				message: message
			}
		});
	};

	const handleRemove = async (): Promise<void> => {
		let confirmValue = window.confirm('Remove user?');
		if (confirmValue) {
			let { message, status } = await sendData({
				action: 'removeUser',
				id: user
			});

			if (status) {
				setUser(0);
			}

			dispatch({
				type: 'SET_MESSAGE_VISIBLE',
				payload: {
					message: message
				}
			});
		}
	};

	return (
		<Paper className={classes.paper}>
			<Typography variant="h6">Edit user</Typography>
			<form onSubmit={handleEdit}>
				<FormControl fullWidth className={classes.formControll}>
					<InputLabel id="user">Type</InputLabel>
					<Select labelId="user" value={user} name="users" onChange={handleUserChange} required>
						{users.map(user => (
							<MenuItem key={user.id} value={user.id}>
								{user.login}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				{!!user && (
					<FormControl fullWidth className={classes.formControll}>
						<TextField name="password" label="Password" type="password" value={password} onChange={handlePasswordName} required />
					</FormControl>
				)}
				<Grid container justify="flex-end">
					<Button variant="contained" color="secondary" type="button" disabled={!!!user} onClick={handleRemove} className={classes.removeButton}>
						Remove
					</Button>
					<Button variant="contained" color="primary" type="submit" disabled={!!!user} className={classes.submitButton}>
						Change Password
					</Button>
				</Grid>
			</form>
		</Paper>
	);
};

export default EditUser;
