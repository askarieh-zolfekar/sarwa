/**
 * Rct Page Loader
 */
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    full: {
        position: 'absolute',
        background: '#9a9595a3',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        'z-index': 99999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
  }));

const FullPageLoader = () => {
    const classNames = useStyles();
    return (
        <div className={classNames.full}>
            <CircularProgress />
        </div>
    );
    }

export default FullPageLoader;
