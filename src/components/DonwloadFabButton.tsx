import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { HTMLtoPDF } from '../utils/pdf';

const useStyles = makeStyles((theme: Theme) => ({
	fab: {
		position: 'fixed',
		bottom: '20px',
		right: '20px'
	}
}));

const DownloadFabButton: React.FC = (): JSX.Element => {
	const classes = useStyles();
	const downloadPdf = (): void => {
		HTMLtoPDF();
	};

	return (
		<Fab color="primary" aria-label="add" onClick={downloadPdf} className={classes.fab}>
			<AddIcon />
		</Fab>
	);
};

export default DownloadFabButton;
