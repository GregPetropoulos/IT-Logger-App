// * ONE CENTRALIZED STORE IN APP.JS WITH ACTIONS AND REDUCERS

// !TRACE
// import * as actionCreators from '../src/actions/authActions'; 
// !TRACE
// import invariant from 'redux-immutable-state-invariant';

//* Responsible for creating the store
import { createStore, applyMiddleware} from'redux';

//*Extension implemented
import { composeWithDevTools } from 'redux-devtools-extension';

// * middleware
import thunk from 'redux-thunk';

// * Looks at all reducers brought into root, folder called reducers> with file index.js
import rootReducer from './reducers';

//* Token check
import setAuthToken from './utils/setAuthToken';

// *App level state
const initialState = {};

// *Array of middleware
const middleware = [thunk];

// ! TRACE----Turn this on trace for debugging
// const composeEnhancers = composeWithDevTools({ actionCreators, trace: true, traceLimit: 25 });
// const store = createStore(rootReducer, initialState, composeEnhancers(
//   applyMiddleware(invariant(), thunk)
// ));

// *Creating the store with reducers, app level state. middleware, 
const store =createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

//* NOTE: set up a store subscription listener
//* to store the techs token in localStorage


//* initialize current state from redux store for subscription comparison
//* preventing undefined error

  let currentState = store.getState();

  store.subscribe(() => {
    // keep track of the previous and current state to compare changes
    let previousState = currentState;
    currentState = store.getState();
    // if the token changes set the value in localStorage and axios headers
    if (previousState.auth.token !== currentState.auth.token) {
      const token = currentState.auth.token;
      setAuthToken(token);
    }
  });
  
export default store;