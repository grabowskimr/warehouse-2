import React from 'react';
import { AppConsumer } from '../AppContext';
import { TContext } from '../AppContext';

const withContext = (Component: React.ComponentClass | React.FC<TContext>) => {
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
