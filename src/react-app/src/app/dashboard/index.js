import React, {Fragment} from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {Switch, Route} from "react-router-dom";
import {AsyncAccounts, AsyncAccountsStatistics} from "../../components/AsyncComponent";
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Dashboard = ({match}) => {
    console.log(match)
    const classes = useStyles();
    return (
        <Fragment>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Sarwa Assignment
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
                <Switch>
                    <Route
                        exact
                        path={`/`}
                        component={AsyncAccounts}
                    />
                    <Route
                        exact
                        path={`/statistics`}
                        component={AsyncAccountsStatistics}
                    />
                </Switch>
            </Container>
        </Fragment>
    );
}

export default Dashboard;
