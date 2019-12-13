import React, {Props, useState} from 'react';
import {RouteComponentProps} from 'react-router';

import {checkAccess} from '../actions/dbActions';
import Layout from './Layout';

class Main extends React.Component<RouteComponentProps> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount(): void {
        checkAccess().then(status => {
            if (!status) {
                this.props.history.push('/');
            }
        })
    }

    render() {
        return (
            <Layout>
                hej
            </Layout>
        )
    }
}


export default Main;
