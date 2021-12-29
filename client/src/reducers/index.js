//**THIS IS THE ROOT REDUCER**//

import { combineReducers } from "redux";
import logReducer from "./logReducer";
import techReducer from "./techReducer";
import authReducer from './authReducer';


// *Set log to the logReducer
export default combineReducers({
    log:logReducer,
    tech: techReducer,
    auth: authReducer
});