import { createStore, applyMiddleware, compose } from 'redux';
import Thunk from 'redux-thunk';
import reducers from '../reducers';

export default function configureStore(initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        reducers,
        initialState,
        composeEnhancers(applyMiddleware(Thunk))
    );

    return store;
}
