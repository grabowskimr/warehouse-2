import React, { FormEvent, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withCookies } from 'react-cookie';
import { Md5 } from 'ts-md5/dist/md5';
import { RouteComponentProps } from 'react-router-dom';

import { sendData } from '../actions/dbActions';
import { makeId } from '../utils/session';
import Logo from '../static/images/logo.png';

const useStyles = makeStyles((theme: Theme) => ({
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto'
	},
	paper: {
		minWidth: '300px'
	},
	insideContent: {
		padding: theme.spacing(3, 2)
	},
	form: {
		flexGrow: 1,
		textAlign: 'right'
	},
	submitBtn: {
		marginTop: theme.spacing(2)
	},
	error: {
		width: '100%',
		textAlign: 'center',
		color: 'red'
	},
	logo: {
		marginBottom: '20px'
	}
}));

type Props = { cookies: any } & RouteComponentProps;

const Login: React.FC<Props> = (props): JSX.Element => {
	const classes = useStyles();
	const [login, setLogin] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');

	const loginToApp = async (event: FormEvent): Promise<void> => {
		event.preventDefault();
		let sessionId = makeId(35);
		let data = await sendData({ login, password: Md5.hashStr(password), sessionId, action: 'login' }, false);
		if (data.status) {
			let user: LoginData = data.data[0];
			let oneHour = new Date();
			oneHour.setHours(oneHour.getHours() + 1);
			props.cookies.set(
				'login',
				{
					login: user.login,
					id: user.id,
					session_id: user.session_id,
					profile: user.profile,
					name: user.name
				},
				{ path: '/', expires: oneHour }
			);
			props.history.push('/app');
		} else {
			setError(data.message);
		}
	};

	return (
		<div>
			<CssBaseline />
			<AppBar position="fixed">
				<Toolbar>
					<Typography variant="h6">Login</Typography>
				</Toolbar>
			</AppBar>
			<Grid container direction="column" justify="center" alignItems="center" className={classes.content}>
				<div className={classes.logo}>
					<img src={Logo} alt="copy" />
				</div>
				<Paper square={true} className={classes.paper}>
					<div className={classes.insideContent}>
						<Typography align="center" variant="h6">
							Insert credentials
						</Typography>
						<form className={classes.form} onSubmit={loginToApp}>
							<TextField label="Login" fullWidth margin="normal" value={login} onChange={e => setLogin(e.target.value)} />
							<TextField
								label="Password"
								type="password"
								fullWidth
								margin="normal"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
							<Button variant="contained" color="primary" type="submit" className={classes.submitBtn}>
								Sign In
							</Button>
							{error.length ? <p className={classes.error}>{error}</p> : null}
						</form>
					</div>
				</Paper>
			</Grid>
		</div>
	);
};

export default withCookies(Login);
