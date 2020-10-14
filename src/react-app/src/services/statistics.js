import api from '../api';

export function getAccountOverviewStatistics() {
    return api.get('statistics');
}
