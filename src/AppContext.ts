import React from "react";

interface IApp {
    drawerOpened: boolean
}

type Action = { type: string; payload: object };

export const initialState: IApp = {
    drawerOpened: true
};

export const reducer = (state: IApp = initialState, action: Action) => {
    switch (action.type) {
        case "SET_DRAWER_OPEN":
            return {
                ...state,
                drawerOpened: true
            };
        case "SET_DRAWER_CLOSED":
            return {
                ...state,
                drawerOpened: false
            };
        default:
            throw new Error();
    }
};

export const AppContext = React.createContext<{
    state: typeof initialState;
    dispatch: (action: Action) => void;
}>({
    state: initialState,
    dispatch: () => {}
});

export const AppProvider = AppContext.Provider;

export default AppContext;