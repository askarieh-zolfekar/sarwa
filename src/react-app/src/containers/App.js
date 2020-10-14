import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import greenTheme from "./themes/greenTheme";
import FullPageLoader from "../components/FullPageLoader";
import Dashboard from "../app/dashboard";
import Container from "@material-ui/core/Container";

function MainContainer({loading}) {
    let applyTheme = createMuiTheme(greenTheme);
    return (
        <MuiThemeProvider theme={applyTheme}>
            <div className="app-main">
                {loading && <FullPageLoader />}
                <Switch>
                    <Route path='/' component={Dashboard}/>
                </Switch>
            </div>
        </MuiThemeProvider>
    );
}


// map state to props
const mapStateToProps = ({ generalReducer }) => {
    const { loading } = generalReducer;
    return { loading };
};

export default connect(mapStateToProps)(MainContainer);
