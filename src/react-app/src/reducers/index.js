/**
 * App Reducers
 */
import { combineReducers } from 'redux';
import generalReducer from './GeneralReducer';
import accountsReducer from './AccountsReducer';

const reducers = combineReducers({
    generalReducer,
    accountsReducer
});

export default reducers;
