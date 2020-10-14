/**
 * Accounts Reducer
 */
import {
    CHANGE_ACCOUNT_STATUS, LIST_ACCOUNT_FILTERS,
    LIST_ACCOUNTS,
} from '../actions/types'
import {ACCOUNT_PAGINATION_SIZE} from "../constants";
/**
 * initial accounts values
 */
const INIT_STATE = {
    accounts: {docs: [], page: 1, limit: ACCOUNT_PAGINATION_SIZE[0], filtersValues: null}
};

export default (state = INIT_STATE, {type, payload }) => {
    switch (type) {
        case LIST_ACCOUNTS:
            return {...state, accounts: payload};
        case CHANGE_ACCOUNT_STATUS:
            console.log(payload);
            return {...state, accounts: {...state.accounts, docs: state.accounts.docs.map(account => account.id === payload.account.id ? payload.account : account)}};
        case LIST_ACCOUNT_FILTERS:
            return {...state, filtersValues: payload}
        default:
            return { ...state };
    }
}
