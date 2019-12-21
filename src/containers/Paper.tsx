import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3, 2)
	}
}));

const PaperContainer: React.FC = props => {
	const classes = useStyles();
	return <Paper className={classes.root}>{props.children}</Paper>;
};

export default PaperContainer;
