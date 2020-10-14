import React, {Fragment} from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccountsTable from "../../../../components/AccountsTable";
import StatisticsOverviewPaper from "../../../../components/StatisticsOverviewPaper";
import Container from "@material-ui/core/Container";
import AccountsBarChart from "../../../../components/AccountsBarChart";

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

const Accounts = () => {
    const classes = useStyles();
    return (
        <Fragment>
            <StatisticsOverviewPaper/>
            <Typography variant="h5" component="h2" color='primary' gutterBottom style={{marginTop: '16px'}}>
                Accounts
            </Typography>
            <AccountsTable/>
        </Fragment>
    );
}

export default Accounts;
