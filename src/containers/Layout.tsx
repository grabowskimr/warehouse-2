import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";

import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import {TMenuItem} from '../types/types';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    main: {
        padding: '20px'
    }
}));

const Layout = (props: {children: React.ReactNode, menuItems: TMenuItem[]}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <TopBar />
            <SideBar menuItems={props.menuItems}/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <main className={classes.main}>
                    {props.children}
                </main>
            </main>
        </div>
    );
};

export default Layout;