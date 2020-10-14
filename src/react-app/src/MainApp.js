import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import configureStore from './store';
import App from './containers/App';
import ErrorBoundary from "./components/ErrorBoundary";
import {NotificationContainer} from "react-notifications";
import "react-notifications/lib/notifications.css";

export const store = configureStore();

const MainApp = () =>
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ErrorBoundary>
                    <NotificationContainer />
                    <Switch>
                        <Route path="/" component={App}/>
                    </Switch>
                </ErrorBoundary>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>;


export default MainApp;
