import React from 'react';
import { AppConsumer } from '../AppContext';

const withContext = (Component: React.ComponentClass) => {
	return (props: any) => {
		return (
			<AppConsumer>
				{({ state, dispatch }) => {
					return <Component {...props} contextState={state} dispatch={dispatch} />;
				}}
			</AppConsumer>
		);
	};
};

export default withContext;
