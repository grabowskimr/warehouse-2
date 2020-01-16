import React from 'react';
import Fab from '@material-ui/core/Fab';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { HTMLtoPDF, singleHTMLtoPDF } from '../utils/pdf';

const useStyles = makeStyles((theme: Theme) => ({
	fab: {
		position: 'fixed',
		bottom: '20px',
		right: '20px'
	}
}));

type Props = {
	single?: boolean;
	name?: string;
	user?: string;
	date?: string;
};

const DownloadFabButton: React.FC<Props> = (props): JSX.Element => {
	const classes = useStyles();
	const downloadPdf = (): void => {
		if (props.single) {
			let name = props.name || '';
			let user = props.user || '';
			singleHTMLtoPDF(name, user, props.date);
		} else {
			HTMLtoPDF();
		}
	};

	return (
		<Fab color="primary" aria-label="add" onClick={downloadPdf} className={classes.fab}>
			<VerticalAlignBottomIcon />
		</Fab>
	);
};

export default DownloadFabButton;
