import React from 'react';
import {RouteComponentProps} from 'react-router';

import {checkAccess} from '../actions/dbActions';
import Layout from './Layout';
import ContextProvider from './ContextProvider';

class Main extends React.Component<RouteComponentProps> {
    componentDidMount(): void {
        checkAccess().then(status => {
            if (!status) {
                this.props.history.push('/');
            }
        })
    }

    render() {
        return (
            <ContextProvider>
                <Layout>
                    hej
                </Layout>
            </ContextProvider>
        )
    }
}


export default Main;
