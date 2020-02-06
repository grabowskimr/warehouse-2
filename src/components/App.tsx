import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import RouteComponent from './Route';

const outerTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#cc3649'
		}
	}
});

require('../types/api.d.ts');

const App: React.FC = (): JSX.Element => {
	return (
		<ThemeProvider theme={outerTheme}>
			<CookiesProvider>
				<BrowserRouter>
					<RouteComponent />
				</BrowserRouter>
			</CookiesProvider>
		</ThemeProvider>
	);
};

export default App;
