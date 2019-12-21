import React, { useContext } from 'react';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';

import { drawerWidth } from '../config/config';
import AppContext from '../AppContext';

const useStyles = makeStyles(theme => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginRight: 36
	},
	menuButtonHidden: {
		display: 'none'
	},
	title: {
		flexGrow: 1
	}
}));

const TopBar: React.FC = props => {
	const classes = useStyles();
	const { state, dispatch } = useContext(AppContext);
	const handleDrawerOpen = () => {
		dispatch({
			type: 'SET_DRAWER_OPEN',
			payload: {
				drawerOpened: true
			}
		});
	};

	const logoutUser = () => {
		console.log('logout');
	};

	return (
		<AppBar position="absolute" className={clsx(classes.appBar, state.drawerOpened && classes.appBarShift)}>
			<Toolbar>
				<IconButton edge="start" className={classes.menuButton} onClick={handleDrawerOpen} color="inherit" aria-label="menu">
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" className={classes.title}>
					Warestore
				</Typography>
				<Button color="inherit" onClick={logoutUser}>
					Logout
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default TopBar;
