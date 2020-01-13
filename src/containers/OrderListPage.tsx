import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import OrderHistoryWeek from '../components/OrderHistoryWeek';
import OrderHistoryDay from '../components/OrderHistoryDay';
import OrderHistoryMonth from '../components/OrderHistoryMonth';

interface TabPanelProps {
	children?: React.ReactNode;
	index: any;
	value: any;
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper
	}
}));

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div role="tabpanel" hidden={value !== index} id={`scroll-tab-${index}`} {...other}>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

const OrderListPage: React.FC = (): JSX.Element => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" color="default">
				<Tabs value={value} onChange={handleChange} centered indicatorColor="primary" textColor="primary" scrollButtons="auto" aria-label="orders history">
					<Tab label="Day" id="scroll-tab-1" />
					<Tab label="Week" id="scroll-tab-2" />
					<Tab label="Mounth" id="scroll-tab-3" />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<OrderHistoryDay />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<OrderHistoryWeek />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<OrderHistoryMonth />
			</TabPanel>
		</div>
	);
};

export default OrderListPage;
