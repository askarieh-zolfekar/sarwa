import React, {Fragment, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import StatisticOverviewCard from "../StatisticOverviewCard";
import {getAccountOverviewStatistics} from "../../services/statistics";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
}));

export default function StatisticsOverviewPaper() {
    const classes = useStyles();
    const [statusOverview, setStatusOverview] = useState([]);
    const [allStatus, setAllStatus] = useState({});
    useEffect(() => {
        getAccountOverviewStatistics()
            .then(({data}) => {
                setStatusOverview(data.data.statusOverview);
                setAllStatus(data.data.totalBalance[0])
            })
            .catch(err => {

            })
    }, [])
    return (
        <Fragment>
            <Typography variant="h5" component="h2" color='primary' gutterBottom style={{marginTop: '16px'}}>
                Overview Statistics
            </Typography>
            <Link to={'/statistics'}>Open charts</Link>
            <div className={classes.root}>
                {allStatus && <StatisticOverviewCard title={"All Statuses"} value={"Total Count: " + allStatus.count}  additionalValue={"Total Balance: " + allStatus.totalBalance} />}
                {statusOverview.map(item => <StatisticOverviewCard title={item._id} value={"Total Count: " + item.count} additionalValue={"Total Balance: " + item.totalBalance}/>)}
            </div>
        </Fragment>
    );
}
