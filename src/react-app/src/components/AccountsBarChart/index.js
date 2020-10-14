import React from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const AccountsBarChart = ({data, bar, color}) => {
    return (
        <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey={bar} fill={color}/>
            {/*<Bar dataKey="totalBalance" fill="#82ca9d"/>*/}
        </BarChart>
    );
};
export default AccountsBarChart;
