import React, { useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppContext } from '../AppContext';

const useStyles = makeStyles((theme: Theme) => ({
	close: {
		padding: theme.spacing(0.5)
	}
}));

const Message: React.FC = () => {
	const classes = useStyles();
	const { state, dispatch } = useContext(AppContext);

	const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) : void => {
		if (reason === 'clickaway') {
			return;
		}
		dispatch({
			type: 'SET_MESSAGE_HIDE'
		});
	};

	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right'
			}}
			open={state.messageVisible}
			autoHideDuration={6000}
			onClose={handleClose}
			ContentProps={{
				'aria-describedby': 'message-id'
			}}
			message={<span id="message-id">{state.message}</span>}
			action={[
				<IconButton key="close" aria-label="close" color="inherit" className={classes.close} onClick={handleClose}>
					<CloseIcon />
				</IconButton>
			]}
		/>
	);
};

export default Message;
