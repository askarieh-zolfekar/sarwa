const STATUS = {
    opened: {
        name: "Opened",
        code: "opened"
    },
    pending: {
        name: "Pending",
        code: "pending"
    },
    approved: {
        name: "Approved",
        code: "approved"
    },
    funded: {
        name: "Funded",
        code: "funded"
    },
    closed: {
        name: "Closed",
        code: "closed"
    },
    suspended: {
        name: "Suspended",
        code: "suspended"
    }
};
const CONDITIONS = {
    isBalanceZero: (account) => {
        return account.balance === 0
    },
    noCondition: () => true
};

const STATUS_WORKFLOW = {
    [STATUS.pending.code]: [
        {
            status: STATUS.approved,
            condition: CONDITIONS.noCondition
        },
        {
            status: STATUS.closed,
            condition: CONDITIONS.noCondition
        },
    ],
    [STATUS.approved.code]: [
        {
            status: STATUS.funded,
            condition: CONDITIONS.noCondition
        },
        {
            status: STATUS.closed,
            condition: CONDITIONS.noCondition
        },
    ],
    [STATUS.funded.code]: [
        {
            status: STATUS.closed,
            condition: CONDITIONS.isBalanceZero
        },
    ],
    [STATUS.closed.code]: [],
    [STATUS.suspended.code]: [],
};

const buildStatusFilters = (withALL=false) => {
    const statuses = Object.keys(STATUS).map(key => {
        return STATUS[key];
    });
    if (withALL) {
        statuses.push({name: 'ALL', code: undefined})
    }
    return statuses;
};

export {
    STATUS,
    STATUS_WORKFLOW,
    buildStatusFilters
}
