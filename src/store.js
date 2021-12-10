// * ONE CENTRALIZED STORE IN APP.JS WITH ACTIONS AND REDUCERS

//* Responsible for creating the store
import { createStore, applyMiddleware} from'redux';

//*Extension implemented
import { composeWithDevTools } from 'redux-devtools-extension';

// * middleware
import thunk from 'redux-thunk';

// * Looks at all reducers brought into root, folder called reducers> with file index.js
import rootReducer from './reducers';

// *App level state
const initialState = {};

// *Array of middleware
const middleware = [thunk];

// *Creating the store with reducers, app level state. middleware, 
const store =createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;