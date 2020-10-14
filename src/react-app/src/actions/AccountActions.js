import {CHANGE_ACCOUNT_STATUS, LIST_ACCOUNT_FILTERS, LIST_ACCOUNTS, START_LOADING, STOP_LOADING} from "./types";
import {changeAccountStatus, getAccounts} from "../services/accounts";
import {NotificationManager} from "react-notifications";

export const listAccountsAction = (page, filters, limit) => (dispatch) => {
    dispatch({type: START_LOADING});
    return getAccounts({page, filters, limit})
        .then((response) => {
            dispatch({type: LIST_ACCOUNTS, payload: response.data.data})
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            dispatch({type: STOP_LOADING});
        })
};

export const changeAccountStatusAction = (id, status) => (dispatch) => {
    dispatch({type: START_LOADING});
    return changeAccountStatus(id, status)
        .then((response) => {
            console.log(response.data.data);
            dispatch({type: CHANGE_ACCOUNT_STATUS, payload: {account: response.data.data}});
        })
        .catch((error) => {
            if (error.response && error.response.data) {
                NotificationManager.error(error.response.data.message);
            }
        })
        .finally(() => {
            dispatch({type: STOP_LOADING});
        })
};
