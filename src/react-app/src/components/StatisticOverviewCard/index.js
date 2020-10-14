import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    value: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function StatisticOverviewCard({title, value, additionalValue}) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography color='secondary' component="h2" gutterBottom>
                    {title}
                </Typography>
                <Typography className={classes.value} color="textSecondary" gutterBottom>
                    {value}
                </Typography>
                <Typography className={classes.value} color="textSecondary">
                    {additionalValue}
                </Typography>
            </CardContent>
        </Card>
    );
}
