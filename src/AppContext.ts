import React from "react";

interface IApp {
    drawerOpened: boolean,
    messageVisible: boolean,
    message: string
}

type Action = { type: string; payload?: {[dataName: string]: any} };

export const initialState: IApp = {
    drawerOpened: true,
    messageVisible: false,
    message: ''
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
        case "SET_MESSAGE_VISIBLE":
            return {
                ...state,
                messageVisible: true,
                message: action.payload ? action.payload.message : ''
            };
        case "SET_MESSAGE_HIDE":
            return {
                ...state,
                messageVisible: false
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
export const AppConsumer = AppContext.Consumer;

export default AppContext;