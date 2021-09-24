import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ConnectedDashboard } from './Dashboard.component';
import { Router, Route } from 'react-router-dom';
import { history } from '../store/history';
import { ConnectedNavigation } from './Navigation.component';
import { ConnectedTaskDetail } from './TaskDetail.component';
import { render } from 'react-dom';
import { Redirect } from 'react-router';
import { ConnectedLogin } from './Login.component';

const RouteGuard = (Component: any) => ({match}: any) => {
    console.info("Route guard", match);
    if (!store.getState().session.authenticated) {
        return <Redirect to="/"/>
    } 
    return <Component match={match}></Component>
}

export const Main = () => (
    <Router history={history}>
        <Provider store={store}>
            <div>
                <Route 
                    exact
                    path="/"
                    component={ConnectedLogin}
                />
                <Route 
                    exact
                    path="/dashboard"
                    render={RouteGuard(ConnectedDashboard)}
                />
                <Route 
                    exact
                    path="/task/:id"
                    render={RouteGuard(ConnectedTaskDetail)}
                />
            </div>
        </Provider>
    </Router>
)