/**
 * AsyncComponent
 * Code Splitting Component
 */
import React from 'react';
import Loadable from 'react-loadable';

import CircleLazyLoader from '../CircleLazyLoader';

const AsyncAccounts = Loadable({
    loader: () => import("../../app/dashboard/routes/Accounts"),
    loading: () => <CircleLazyLoader />,
});

const AsyncAccountsStatistics = Loadable({
    loader: () => import("../../app/dashboard/routes/AccountsStatistics"),
    loading: () => <CircleLazyLoader />,
});

export {
    AsyncAccounts,
    AsyncAccountsStatistics
};
