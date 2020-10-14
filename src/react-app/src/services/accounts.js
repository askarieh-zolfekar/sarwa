import api from '../api';
import qs from 'qs';

export function getAccounts(params = {page: undefined, limit: undefined, filters: undefined}) {
    return api.get(`accounts`, {
        params,
        paramsSerializer: params => {
            return qs.stringify(params)
        }
    });
}

export function getAccountsFilters() {
    return api.get(`accounts/filters`);
}

export function changeAccountStatus(id, status) {
    return api.put(`accounts/${id}/status`, {status});
}

