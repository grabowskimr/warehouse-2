import React, { useReducer } from 'react';

import { AppProvider, initialState, reducer } from '../AppContext';

const ContextProvider: React.FC = props => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = { state, dispatch };
	return <AppProvider value={value}>{props.children}</AppProvider>;
};

export default ContextProvider;
