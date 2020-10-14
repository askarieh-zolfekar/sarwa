import React from 'react';
import './style.css'
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

const CircleLazyLoader = () => {
    return (
        <div className='circle-lazy-loader'>
            <CircularProgress />
        </div>
    );
};

export default CircleLazyLoader;
