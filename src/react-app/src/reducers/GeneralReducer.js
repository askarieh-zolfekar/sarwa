/**
 * General Reducer
 */
import {
    START_LOADING,
    STOP_LOADING,
} from '../actions/types'
/**
 * initial general values
 */
const INIT_STATE = {
    loading: false,
    loadingRequests: 0,
};

export default (state = INIT_STATE, {type, payload }) => {
    switch (type) {
        case START_LOADING:
            return {...state, loading: true, loadingRequests: ++state.loadingRequests};
        case STOP_LOADING:
            return {...state, loading: (state.loadingRequests > 1), loadingRequests: --state.loadingRequests};
        default:
            return { ...state };
    }
}
