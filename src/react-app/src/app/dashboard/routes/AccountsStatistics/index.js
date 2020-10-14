import React, {Fragment, useEffect, useState} from 'react';
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
import {getAccountOverviewStatistics} from "../../../../services/statistics";
import {Bar} from "recharts";

const AccountsStatistics = () => {
    const [statusOverview, setStatusOverview] = useState([]);
    useEffect(() => {
        getAccountOverviewStatistics()
            .then(({data}) => {
                setStatusOverview(data.data.statusOverview.map(item => ({name: item._id, count: item.count, totalBalance: item.totalBalance})));
            })
            .catch(err => {

            })
    }, []);
    return (
        <div style={{display: 'flex', marginTop: '16px'}}>
            <AccountsBarChart data={statusOverview} bar={'count'} color={"#8884d8"}/>
            <AccountsBarChart data={statusOverview} bar={'totalBalance'} color={'#82ca9d'} />
        </div>
    );
}

export default AccountsStatistics;
